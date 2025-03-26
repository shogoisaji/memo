import 'dart:async';

void repeatUntilFlag(Function callback, {
  required Function() checkFlag, 
  int maxAttempts = 5
}) {
  int attempts = 0;
  
  Timer.periodic(Duration(seconds: 1), (timer) {
    attempts++;
    
    if (checkFlag() || attempts >= maxAttempts) {
      timer.cancel();
      print('処理を終了しました。理由: ${checkFlag() ? "フラグが立ちました" : "最大試行回数に達しました"}');
    } else {
      callback();
      print('実行回数: $attempts / $maxAttempts');
    }
  });
}
