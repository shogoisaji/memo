public class DataModeManager {
    private static DataModeManager instance;

    private DataModeManager() {}

    public static synchronized DataModeManager getInstance() {
        if (instance == null) {
            instance = new DataModeManager();
        }
        return instance;
    }

    // 他のコードはそのまま...
}




// MainActivity内でシングルトンから取得
dataModeManager = DataModeManager.getInstance();
dataModeManager.setOnModeChangeListener(isDataMode -> {
    System.out.println("setOnModeChangeListener------" + isDataMode);
    if (isDataMode) {
        bluetoothThread.bluetoothHandler.sendCommand("SME", "S01");
        Log.d("MainActivity", "Change Mode -> Data Mode (send S01)");
    }
});

// 他クラス内でも同様にシングルトンから取得するので同じインスタンスになる
