Sub FilterByAColumn()
    Dim ws As Worksheet
    Dim lastRow As Long
    
    ' 対象シートを設定
    Set ws = Worksheets("指定したシート名") ' シート名を指定してください
    
    ' A列の最終行を取得
    lastRow = ws.Cells(ws.Rows.Count, "A").End(xlUp).Row
    
    ' フィルターを設定
    With ws
        .AutoFilterMode = False ' 既存のフィルターを解除
        .Range("A1:A" & lastRow).AutoFilter Field:=1, Criteria1:="A-3"
    End With
End Sub
