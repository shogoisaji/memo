package jp.co.awi.hdc.SaaS.auscultation;

import android.os.Handler;
import android.os.Looper;

import java.util.Timer;
import java.util.TimerTask;

public class ContactTimerManager {
    private static final int CONNECT_CHECK_TIME = 1000; // タイマーの待機時間（ミリ秒）
    private Timer timer;
    private Handler handler = new Handler(Looper.getMainLooper());
    private ContactTimerCallback contactTimerCallback;

    // コンストラクタでコールバックを受け取る
    public ContactTimerManager(ContactTimerCallback contactTimerCallback) {
        this.contactTimerCallback = contactTimerCallback;
    }

    // タイマーを開始する
    public void start() {
        if (timer != null) {
            timer.cancel(); // 既存のタイマーをキャンセル
        }
        timer = new Timer();
        scheduleTimer(); // 新しいタイマーをスケジュール
    }

    // タイマーをリセット（削除）する
    public void reset() {
        if (timer != null) {
            timer.cancel(); // タイマーを停止
            timer = null;   // タイマー参照を削除
        }
    }

    // CONNECT_CHECK_TIME ミリ秒後に onDisconnected() を実行するタスクをスケジュール
    private void scheduleTimer() {
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                // メインスレッドでコールバックを呼び出す
                handler.post(() -> contactTimerCallback.onDisconnected());
            }
        }, CONNECT_CHECK_TIME);
    }

    // コールバック用のインターフェース
    public interface ContactTimerCallback {
        void onDisconnected();
    }
}
