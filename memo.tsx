Sub MoveValuesIfLengthIsEightOrMore()
    Dim ws As Worksheet
    Dim rng As Range
    Dim cell As Range
    
    ' シート名を指定して取得
    Set ws = Worksheets("指定したシート名") ' 対象のシート名を記入
    
    ' A列のデータ範囲を取得
    Set rng = ws.Range("A1:A" & ws.Cells(ws.Rows.Count, "A").End(xlUp).Row)
    
    ' 上から順にセルを確認
    For Each cell In rng
        If Len(cell.Value) >= 8 Then ' セルの文字数が8文字以上か確認
            cell.Offset(1).EntireRow.Insert ' 下に新しい行を挿入
            cell.Offset(1, 0).Value = cell.Value ' 値を新しい行にコピー
            cell.Offset(1, 1).Value = cell.Offset(0, 1).Value ' B列の値をコピー
            cell.Offset(1, 2).Value = cell.Offset(0, 2).Value ' C列の値をコピー
            cell.Value = "" ' 元のセルを空白にする
        End If
    Next cell
End Sub
