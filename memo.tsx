Sub MoveValuesWithTilde()
    Dim ws As Worksheet
    Dim rng As Range
    Dim cell As Range
    
    ' シート名を指定して取得
    Set ws = Worksheets("指定したシート名") ' 対象のシート名を記入
    
    ' 対象範囲を設定（例: A列全体）
    Set rng = ws.Range("A1:A" & ws.Cells(ws.Rows.Count, "A").End(xlUp).Row)
    
    ' セルごとに処理
    For Each cell In rng
        If InStr(cell.Value, "〜") > 0 Then ' 「〜」を含むセルを判定
            cell.Offset(1).EntireRow.Insert ' 下に新しい行を挿入
            cell.Offset(1, 0).Value = cell.Value ' 値を新しい行にコピー
            cell.Value = "" ' 元のセルを空白にする
        End If
    Next cell
End Sub
