import Foundation

enum ModeState: String {
    case commandMode = "COMMAND_MODE"
    case dataMode = "DATA_MODE"
}

protocol ModeChangeListener: AnyObject {
    func onModeChanged(_ mode: ModeState)
}

class ModeSwitchManager {

    static let shared = ModeSwitchManager()

    private init() {}

    private let retryDuration: TimeInterval = 0.3
    private let maxRetryCount = 5
    private let timeoutTime: TimeInterval = 2.0
    private let audioTimeoutTime: TimeInterval = 0.2

    private(set) var currentMode: ModeState = .dataMode
    private var retryCount = 0

    weak var modeChangeListener: ModeChangeListener?

    private var retryTimer: Timer?
    private var timeoutTimer: Timer?
    private var audioTimeoutTimer: Timer?

    // MARK: - Public Methods

    func isCommandMode() -> Bool {
        return currentMode == .commandMode
    }

    func setModeChangeListener(listener: ModeChangeListener?) {
        self.modeChangeListener = listener
    }

    func inputAnyResponse() {
        startTimeoutTimer()
        if currentMode == .dataMode {
            startAudioTimeoutTimer()
        }
    }

    func disconnectedBlu() {
        print("Remove timeout timer.")
        resetTimeoutTimer()
    }

    func inputSMECommand() {
        resetRetryTimer()
        retryCount = 0
    }

    func inputStartAudioData() {
        if currentMode == .commandMode {
            print("Set to Data Mode.")
            retryCount = 0
            currentMode = .dataMode
            resetRetryTimer()
            startAudioTimeoutTimer()
        }
    }

    func inputEndAudioData() {
        print("Set to Command Mode.")
        currentMode = .commandMode
        resetRetryTimer()
        changeToCommandModeRequest()
        resetAudioTimeoutTimer()
    }

    // MARK: - Private Methods

    private func changeToCommandModeRequest() {
        guard let listener = modeChangeListener else {
            print("modeChangeListener is nil.")
            return
        }
        listener.onModeChanged(.commandMode)
        startRetryTimer()
    }

    // MARK: Retry Timer

    private func startRetryTimer() {
        resetRetryTimer()

        if retryCount > maxRetryCount {
            print("Max retry. Set to Command Mode.")
            currentMode = .commandMode
            return
        }

        retryTimer = Timer.scheduledTimer(withTimeInterval: retryDuration, repeats: false) { [weak self] _ in
            guard let self = self else { return }
            print("Retry send command SME S01. count: \(self.retryCount)")
            self.changeToCommandModeRequest()
            self.retryCount += 1
        }
    }

    private func resetRetryTimer() {
        retryTimer?.invalidate()
        retryTimer = nil
    }

    // MARK: Timeout Timer

    private func startTimeoutTimer() {
        resetTimeoutTimer()

        timeoutTimer = Timer.scheduledTimer(withTimeInterval: timeoutTime, repeats: false) { [weak self] _ in
            guard let self = self else { return }
            print("Non received command. (\(self.timeoutTime)s) Set to Command Mode.")
            self.currentMode = .commandMode
            self.changeToCommandModeRequest()
        }
    }

    private func resetTimeoutTimer() {
        timeoutTimer?.invalidate()
        timeoutTimer = nil
    }

    // MARK: Audio Timeout Timer

    private func startAudioTimeoutTimer() {
        resetAudioTimeoutTimer()

        audioTimeoutTimer = Timer.scheduledTimer(withTimeInterval: audioTimeoutTime, repeats: false) { [weak self] _ in
            guard let self = self else { return }
            if self.currentMode == .dataMode {
                print("Audio data timeout. (\(self.audioTimeoutTime)s) Set to Command Mode.")
                self.currentMode = .commandMode
                self.resetRetryTimer()
                self.changeToCommandModeRequest()
                self.resetAudioTimeoutTimer()
            }
        }
    }

    private func resetAudioTimeoutTimer() {
        audioTimeoutTimer?.invalidate()
        audioTimeoutTimer = nil
    }
}
