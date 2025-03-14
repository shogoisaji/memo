public static int findMaxConsecutiveZeros(int[] array) {
    int currentCount = 0; // 現在の連続ゼロ数
    int maxCount = 0;     // 最大連続ゼロ数

    // 配列を走査
    for (int num : array) {
        if (num == 0) {
            currentCount++; // ゼロが見つかったらカウントを増やす
            maxCount = Math.max(maxCount, currentCount); // 最大値を更新
        } else {
            currentCount = 0; // ゼロ以外が見つかったらカウントをリセット
        }
    }

    return maxCount;
}