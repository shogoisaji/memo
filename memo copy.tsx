import android.os.Handler;
import android.os.Looper;

public class TimeWatcher {

    private long startTime = 0;
    private boolean running = false;
    private Handler handler;
    private Runnable runnable;
    private TimeUpdateListener listener;

    // コールバック用のインターフェース
    public interface TimeUpdateListener {
        void onTimeUpdated(long elapsedMillis);
    }

    // コンストラクタ（UIスレッド用Handlerとリスナーを受け取る）
    public TimeWatcher(Handler handler, TimeUpdateListener listener) {
        this.handler = handler;
        this.listener = listener;
    }

    // タイマー開始
    public void start() {
        if (running) return;

        running = true;
        startTime = System.currentTimeMillis();

        runnable = new Runnable() {
            @Override
            public void run() {
                if (!running) return;

                long elapsedMillis = System.currentTimeMillis() - startTime;

                // 経過時間をリスナーに通知
                if (listener != null) {
                    listener.onTimeUpdated(elapsedMillis);
                }

                // 次回の通知を1秒後に設定
                handler.postDelayed(this, 1000);
            }
        };

        // 最初の通知を即時開始
        handler.post(runnable);
    }

    // タイマー停止とリセット
    public void resetAndStop() {
        running = false;
        handler.removeCallbacks(runnable);
        startTime = 0;
    }

    // タイマーリセット（再スタート）
    public void reset() {
        startTime = System.currentTimeMillis();
    }

    // 現時点での経過時間取得（ミリ秒）
    public long getElapsedTimeMillis() {
        return running ? System.currentTimeMillis() - startTime : 0;
    }
}
