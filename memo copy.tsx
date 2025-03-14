package jp.co.awi.hdc.SaaS.auscultation;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;

public class ModeSwitchManager {

    private static final String TAG = "ModeSwitchManager";
    private static final int RETRY_DURATION = 300;
    private static final int MAX_RETRY_COUNT = 5;
    private static final int MAX_TIMEOUT_TIME = 2000;

    private static ModeSwitchManager instance;

    public enum ModeState {
        COMMAND_MODE,
        DATA_MODE
    }

    private ModeState currentState = ModeState.COMMAND_MODE;
    private int retryCount = 0;

    private Handler handler = new Handler(Looper.getMainLooper());

    private OnModeChangeListener onModeChangeListener;

    private final Runnable retryRunnable = new Runnable() {
        @Override
        public void run() {
            if (retryCount >= MAX_RETRY_COUNT) {
                Log.d(TAG, "Max retry reached. Set to Command Mode.");
                switchToCommandMode();
                return;
            }
            Log.d(TAG, "Retry send command SME S01. count: " + retryCount);
            if (onModeChangeListener != null) {
                onModeChangeListener.onModeChanged(true);
            } else {
                Log.d(TAG, "onModeChangeListener is null during retry.");
            }
            retryCount++;
            handler.postDelayed(this, RETRY_DURATION);
        }
    };

    private final Runnable timeoutRunnable = new Runnable() {
        @Override
        public void run() {
            Log.d(TAG, "Non received command. (" + MAX_TIMEOUT_TIME + "ms) Set to Command Mode.");
            switchToCommandMode();
        }
    };

    // シングルトンパターンの実装
    private ModeSwitchManager() {}

    public static synchronized ModeSwitchManager getInstance() {
        if (instance == null) {
            instance = new ModeSwitchManager();
        }
        return instance;
    }

    // モード変更リスナーの定義
    public interface OnModeChangeListener {
        void onModeChanged(boolean isCommandMode);
    }

    public void setOnModeChangeListener(OnModeChangeListener listener) {
        this.onModeChangeListener = listener;
    }

    // 現在のモードを取得するメソッド
    public boolean isCommandMode() {
        return currentState == ModeState.COMMAND_MODE;
    }

    // コマンドモードへの切り替え処理
    private void switchToCommandMode() {
        if (currentState != ModeState.COMMAND_MODE) {
            Log.d(TAG, "Switched to Command Mode.");
            currentState = ModeState.COMMAND_MODE;
            notifyModeChanged(true);
        }
        resetRetryTimer();
        resetTimeoutTimer();
    }

    // データモードへの切り替え処理
    private void switchToDataMode() {
        if (currentState != ModeState.DATA_MODE) {
            Log.d(TAG, "Switched to Data Mode.");
            currentState = ModeState.DATA_MODE;
            notifyModeChanged(false);
        }
        resetRetryTimer();
        resetTimeoutTimer();
    }

    // モード変更をリスナーに通知する
    private void notifyModeChanged(boolean isCommand) {
        if (onModeChangeListener != null) {
            onModeChangeListener.onModeChanged(isCommand);
        } else {
            Log.d(TAG, "onModeChangeListener is null during notify.");
        }
    }

    // 外部からのレスポンス受信時に呼ばれるメソッド群

    public void inputAnyResponse() {
        startTimeoutTimer();
    }

    public void disconnectedBlu() {
        Log.d(TAG, "Bluetooth disconnected. Remove timeout timer.");
        resetTimeoutTimer();
        resetRetryTimer();
    }

    public void inputCommandModeResponse() {
        Log.d(TAG, "Received command mode response.");
        switchToCommandMode();
        retryCount = 0;
    }

    public void inputStartAudioData() {
        Log.d(TAG, "Received audio data start signal.");
        switchToDataMode();
        retryCount = 0;
    }

    public void inputEndAudioData() {
        Log.d(TAG, "Received audio data end signal.");
        switchToCommandMode();
        changeToCommandModeRequest();
    }

    // コマンドモードへの変更要求を送信（再試行開始）
    private void changeToCommandModeRequest() {
        if (onModeChangeListener != null) {
            onModeChangeListener.onModeChanged(true);
            startRetryTimer();
        } else {
            Log.d(TAG, "onModeChangeListener is null during command mode request.");
        }
    }

    // リトライタイマーの開始と停止

    private void startRetryTimer() {
        resetRetryTimer();
        retryCount = 0;
        handler.postDelayed(retryRunnable, RETRY_DURATION);
    }

    private void resetRetryTimer() {
        handler.removeCallbacks(retryRunnable);
        retryCount = 0;
    }

    // タイムアウトタイマーの開始と停止

    private void startTimeoutTimer() {
        resetTimeoutTimer();
        handler.postDelayed(timeoutRunnable, MAX_TIMEOUT_TIME);
    }

    private void resetTimeoutTimer() {
        handler.removeCallbacks(timeoutRunnable);
    }
}
