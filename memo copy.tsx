// ... existing code ...
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { format } from "date-fns";

// ... existing code ...

const validationSchema = Yup.object().shape({
  visits: Yup.array().of(
    Yup.object().shape({
      applyDate: Yup.date().required("日付を選択してください"),
    })
  ),
});

const ExaminationSettingsForm = ({ visits, baseDate }: Visits) => {
  const { control, handleSubmit, watch, setValue } =
    useForm<ExaminationSettingsForm>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        visits: visits.map((visit) => ({
          visitId: visit.visit_id,
          applyDate: null,
        })),
      },
    });

  const { fields } = useFieldArray({
    control,
    name: "visits",
  });

  const calculateApplicableDates = (
    visit: ApiU2SubjectsSubjectIdVisitsGetVisit,
    index: number,
    previousApplyDate: Date | null
  ): Date[] => {
    const base = index === 0 ? baseDate : previousApplyDate;

    if (!base) {
      return [];
    }

    const period = visit.period;
    const allowanceBefore = visit.allowance_before;
    const allowanceAfter = visit.allowance_after;

    const startDate = new Date(base);
    startDate.setDate(startDate.getDate() + period - allowanceBefore);

    const endDate = new Date(base);
    endDate.setDate(endDate.getDate() + period + allowanceAfter);

    const days =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

    return Array.from({ length: days }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date;
    });
  };

  const handleApplyDateChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
    visits: ApiU2SubjectsSubjectIdVisitsGetVisit[],
    setValue: any,
    fields: any
  ) => {
    const selectedDate = new Date(e.target.value);
    // 次の visit の選択肢を再計算
    if (index < fields.length - 1) {
      const nextVisit = visits[index + 1];
      const nextApplicableDates = calculateApplicableDates(
        nextVisit,
        index + 1,
        selectedDate
      );
      // 次の visit の選択肢を更新
      setValue(`visits.${index + 1}.applyDate`, null);
    }
  };

  const onSubmit = (data: ExaminationSettingsForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => {
        const visit = visits[index];
        const previousApplyDate =
          index > 0 ? watch(`visits.${index - 1}.applyDate`) : null;
        const applicableDates = calculateApplicableDates(
          visit,
          index,
          previousApplyDate
        );

        return (
          <div key={field.id}>
            <FormControl fullWidth>
              <InputLabel id={`apply-date-label-${index}`}>
                {visit.visit_name}
              </InputLabel>
              <Controller
                control={control}
                name={`visits.${index}.applyDate`}
                render={({ field: { onChange, value } }) => (
                  <Select
                    labelId={`apply-date-label-${index}`}
                    id={`apply-date-${index}`}
                    value={value || ""}
                    onChange={(e) => {
                      onChange(e);
                      handleApplyDateChange(e, index, visits, setValue, fields);
                    }}
                  >
                    {applicableDates.map((date) => (
                      <MenuItem
                        key={date.toISOString()}
                        value={date.toISOString()}
                      >
                        {format(date, "yyyy-MM-dd")}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>
        );
      })}
      <button type="submit">送信</button>
    </form>
  );
};
// ... existing code ...
