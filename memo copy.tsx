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
