Sub SplitAndInsertRowsWithAdditionalData()
    Dim ws As Worksheet
    Dim rng As Range
    Dim cell As Range
    Dim values() As String
    Dim i As Long
    
    ' シート名を指定して取得
    Set ws = Worksheets("指定したシート名") ' 対象のシート名を記入
    
    ' 分割対象のセル範囲を設定（例: A1:A列全体）
    Set rng = ws.Range("A1:A" & ws.Cells(ws.Rows.Count, "A").End(xlUp).Row)
    
    ' セルごとに処理
    For Each cell In rng
        If InStr(cell.Value, ",") > 0 Then
            ' カンマで分割
            values = Split(cell.Value, ",")
            
            ' 分割した値を新しい行へ挿入
            For i = LBound(values) To UBound(values)
                cell.Offset(1).EntireRow.Insert
                
                ' 挿入先のセルに分割した値を設定
                cell.Offset(1, 0).Value = Trim(values(i))
                
                ' 同じ列のA2, A3の値を挿入先の同じ行に追加（例: B列、C列）
                cell.Offset(1, 1).Value = ws.Cells(2, 1).Value ' A2 の値を挿入
                cell.Offset(1, 2).Value = ws.Cells(3, 1).Value ' A3 の値を挿入
            Next i
            
            ' 元のセルをクリアして最初の値を設定
            cell.Value = values(0)
        End If
    Next cell
End Sub
