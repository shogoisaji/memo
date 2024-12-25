Sub RemoveDuplicateRows()
    Dim ws As Worksheet
    Dim lastRow As Long
    
    ' 対象シートを設定
    Set ws = Worksheets("指定したシート名") ' シート名を指定してください
    
    ' A列からC列のデータが入力されている最終行を取得
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    
    ' 重複を削除
    With ws
        .Range("A1:C" & lastRow).RemoveDuplicates Columns:=Array(1, 2, 3), Header:=xlYes
    End With
End Sub
