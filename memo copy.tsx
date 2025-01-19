useEffect(() => {
  if (!initialBaseDate) return;

  const newFieldValues: VisitForm[] = visits.map((visit) => {
    return {
      visitId: visit.visit_id,
      applyDate: formatDateTime(visit.applicable_date, "YYYY-MM-DD"),
      visitTime: formatDateTime(visit.applicable_date, "HH:mm"),
      isOutsideAllowance:
        visit.is_allowance === ALLOWANCE_STATE.OUTSIDE_ALLOWANCE,
    };
  });
  reset({
    baseDate: initialBaseDate.toISOString(),
    visitFormValues: newFieldValues,
  });

  const visitTableValues = visits.map((visit) => {
    return {
      visitId: visit.visit_id,
      visitName: visit.visit_name,
      icon: visit.icon,
      visitType: visit.visit_type,
      period: visit.period,
      allowanceBefore: visit.allowance_before,
      allowanceAfter: visit.allowance_before,
      scheduleIcon: !!visit.schedule_icons
        ? visit.schedule_icons!.map(({ icon }) => icon)
        : [],
      applicableBaseDate: formatDateTime(
        visit.applicable_date,
        "YYYY-MM-DD HH:mm"
      ),
    };
  });
  setVisitTableValues({ visitTableValues });
}, [visits, formMethods, initialBaseDate, setVisitTableValues, reset]);
