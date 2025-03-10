/**
 * シンプルな経過時間監視クラス
 */
public class TimeWatcher {
    private long startTime = 0;
    private boolean running = false;

    /**
     * 時間計測を開始します
     */
    public void start() {
        if (!running) {
            startTime = System.currentTimeMillis();
            running = true;
        }
    }

    /**
     * 経過時間をミリ秒単位で取得します
     * @return 経過時間（ミリ秒）
     */
    public long getElapsedTimeMillis() {
        if (running) {
            return System.currentTimeMillis() - startTime;
        }
        return 0;
    }

    /**
     * 経過時間を秒単位で取得します
     * @return 経過時間（秒）
     */
    public long getElapsedTimeSeconds() {
        return getElapsedTimeMillis() / 1000;
    }

    /**
     * 時間計測をリセットします
     */
    public void reset() {
        startTime = System.currentTimeMillis();
    }

    /**
     * 時間計測を停止してリセットします
     */
    public void resetAndStop() {
        running = false;
        startTime = 0;
    }
}
