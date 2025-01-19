const handleChangeApplyDate = useCallback(
  (selectedDate: string, index: number, outSideDate: string) => {
    const newFieldValues: VisitForm[] = [];

    const prevSelectedDate = new Date(visitFields[index].applyDate);
    const newSelectedDate = new Date(
      outSideDate !== "" ? outSideDate : selectedDate,
    );
    const resetPrevDate = resetTime(prevSelectedDate);
    const resetNewDate = resetTime(newSelectedDate);

    const diff = resetNewDate.getTime() - resetPrevDate.getTime();
    const diffDate = Math.floor(diff / (1000 * 60 * 60 * 24));

    const newVisitTableValues: VisitTableValues[] = visitTableValues.map(
      (values, i) => {
        if (i < index) {
          newFieldValues[i] = {
            ...visitFields[i],
            visitId: values.visitId,
            applyDate: visitFields[i].applyDate,
          };
          return values;
        }
        if (i === index) {
          newFieldValues[i] = {
            ...visitFields[i],
            visitId: values.visitId,
            applyDate: outSideDate !== "" ? outSideDate : selectedDate,
            isOutsideAllowance: !!outSideDate,
          };
          return values;
        }

        const prevDate = new Date(visitFields[i - 1].applyDate);
        prevDate.setDate(prevDate.getDate() + diffDate);
        prevDate.setHours(0);

        const previousApplyDate = i === 0 ? baseDate : prevDate.toISOString();
        const previousPeriod =
          i === 0 ? 0 : incompleteSettingsVisits[i - 1].period;
        const applicableBaseDate = addDays(previousApplyDate, previousPeriod);

        const applicableBaseDateString = applicableBaseDate.toISOString();

        newFieldValues[i] = {
          ...visitFields[i],
          visitId: values.visitId,
          applyDate: applicableBaseDateString,
        };
        console.log(applicableBaseDateString);

        return {
          ...values,
          applicableBaseDateString,
        };
      },
    );
    setVisitTableValues({
      visitTableValues: newVisitTableValues,
    });

    reset({
      baseDate: formatDateTime(baseDate, "YYYY-MM-DD"),
      visitFormValues: newFieldValues,
    });
  },