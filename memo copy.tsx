private void handleTimeoutForFixedOrFree() {
    if (isListeningFinished) {
        isListeningFinished = false;
        setDisconnected(true);
        timerManager.resetTimeoutTimer();
        audioDataProcessor.reset();
        return;
    }
    reset();

    // 1秒後にsendErrorを実行するように遅延処理を追加
    new Handler(Looper.getMainLooper()).postDelayed(() -> {
        eventSender.sendError("聴診時間が不足しています");
    }, 1000); // 1秒 (1000ミリ秒) 後に実行
}
