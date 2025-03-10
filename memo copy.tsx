import java.util.Timer;
import java.util.TimerTask;

public class ConnectionManager {
    private Timer timer;

    // タイマーをスタートする
    public void start() {
        if (timer != null) {
            timer.cancel(); // 古いタイマーをキャンセル
        }
        timer = new Timer();
        scheduleTimer();
    }

    // タイマーをリスタートする
    public void restart() {
        if (timer != null) {
            timer.cancel(); // 現在のタイマーをキャンセル
        }
        timer = new Timer(); // 新しいタイマーを作成
        scheduleTimer();
    }

    // タイマーを削除する
    public void reset() {
        if (timer != null) {
            timer.cancel(); // タイマーを停止
            timer = null;   // タイマー参照を削除
        }
    }

    // 1秒後に onDisconnected() を実行するタスクをスケジュール
    private void scheduleTimer() {
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                onDisconnected();
            }
        }, 1000); // 1秒後に実行
    }

    // 接続が切れたときの処理
    private void onDisconnected() {
        System.out.println("Disconnected!");
        // 必要な処理をここに記述
    }

    public static void main(String[] args) throws InterruptedException {
        ConnectionManager manager = new ConnectionManager();

        System.out.println("Start timer");
        manager.start();

        Thread.sleep(500); // 0.5秒後にリスタート
        System.out.println("Restart timer");
        manager.restart();

        Thread.sleep(1500); // 1.5秒待機して onDisconnected() を確認

        System.out.println("Reset timer");
        manager.reset(); // タイマーを削除

        Thread.sleep(2000); // 2秒待機しても何も起こらないことを確認
    }
}
