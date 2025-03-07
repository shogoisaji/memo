private void handleTimeoutForFixedOrFree() {
  Log.d(TAG, "java.聴診時間が不足しています----------------" + isListeningFinished);
  if (isListeningFinished) {
      isListeningFinished = false;
      setDisconnected(true);
      timerManager.resetTimeoutTimer();
      audioDataProcessor.reset();
      return;
  }

  long elapsedTimeMillis = timerManager.getElapsedTime(); // ミリ秒単位で取得している場合
  long delayMillis = elapsedTimeMillis < 1000 ? (1000 - elapsedTimeMillis) : 0;

  if (delayMillis > 0) {
      new Handler(Looper.getMainLooper()).postDelayed(() -> {
          reset();
          eventSender.sendError("聴診時間が不足しています");
      }, delayMillis);
  } else {
      reset();
      eventSender.sendError("聴診時間が不足しています");
  }
}
