private byte[] prevData = new byte[0]; // 初期化

public void parseResponse(byte[] data) {
    // 新しい配列を作成して、prevData と data を結合
    byte[] checkData = new byte[prevData.length + data.length];
    
    // prevData を新しい配列にコピー
    System.arraycopy(prevData, 0, checkData, 0, prevData.length);
    
    // data を新しい配列にコピー
    System.arraycopy(data, 0, checkData, prevData.length, data.length);
    
    // 結合したデータを prevData に保存
    prevData = checkData;
}
