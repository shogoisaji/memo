Sub SplitAndInsertRows()
    Dim ws As Worksheet
    Dim rng As Range
    Dim cell As Range
    Dim values() As String
    Dim i As Long
    
    ' アクティブなシートを取得
    Set ws = ActiveSheet
    
    ' 分割対象のセル範囲を設定（例: A列全体）
    Set rng = ws.Range("A1:A" & ws.Cells(ws.Rows.Count, "A").End(xlUp).Row)
    
    ' セルごとに処理
    For Each cell In rng
        If InStr(cell.Value, ",") > 0 Then
            ' カンマで分割
            values = Split(cell.Value, ",")
            
            ' 分割した値を新しい行へ挿入
            For i = LBound(values) To UBound(values)
                cell.Offset(1).EntireRow.Insert
                cell.Offset(1, 0).Value = Trim(values(i))
            Next i
            
            ' 元のセルをクリア
            cell.Value = values(0)
        End If
    Next cell
End Sub
