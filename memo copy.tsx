import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Popover,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import Image from "next/image";
import { useController, useFormContext } from "react-hook-form";
import {
  DAY_OF_WEEK_EN,
  DAY_OF_WEEK_JP,
} from "@/features/common/date/constants";
import { formatDateTime } from "@/features/common/date/dateFunctions";
import useLocaleControl from "@/features/common/locale/hooks/useLocaleControl";
import { COMMON_COLORS } from "@/styles/colors";

type Props = {
  name: string;
  inputProps?: TextFieldProps;
};

export default function FormDatePicker({ name, inputProps }: Props) {
  const { locale, localeStrings } = useLocaleControl();
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });
  const errorMessage = fieldState.error?.message;

  const [date, setDate] = useState<Date>(new Date());
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleDateClick = useCallback(
    (selectedDate: Date) => {
      const formattedDate = formatDateTime(selectedDate, "YYYY-MM-DD");
      field.onChange(formattedDate);
      if (inputProps?.onChange) {
        const event = {
          target: { value: formattedDate },
        } as React.ChangeEvent<HTMLInputElement>;
        inputProps.onChange(event);
      }
      handleClose();
    },
    [field, inputProps, handleClose]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      field.onChange(newValue);
      if (inputProps?.onChange) {
        inputProps.onChange(event);
      }
    },
    [field, inputProps]
  );

  const handleDeleteClick = useCallback(() => {
    field.onChange("");
    if (inputProps?.onChange) {
      const event = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      inputProps.onChange(event);
    }
    handleClose();
  }, [field, inputProps, handleClose]);

  const generateCalendarDays = useMemo(() => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    const startDay = firstDay.getDay();

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }, [date]);

  const backButton = useMemo(() => {
    const src = `/images/common/icons/arrow-back.svg`;
    const prevMonth = () => {
      setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    };
    return (
      <Button sx={{}} onClick={prevMonth}>
        <Image src={src} width={8} height={14} alt="back" />
      </Button>
    );
  }, [date]);

  const forwardButton = useMemo(() => {
    const src = `/images/common/icons/arrow-forward.svg`;
    const nextMonth = () => {
      setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    };

    return (
      <Button sx={{}} onClick={nextMonth}>
        <Image src={src} width={8} height={14} alt="forward" />
      </Button>
    );
  }, [date]);

  return (
    <Box>
      <TextField
        {...field}
        type="date"
        name={name}
        value={field.value || ""}
        onChange={handleChange}
        onClick={handleClick}
        InputProps={{
          endAdornment: <CalendarMonth />,
        }}
        sx={{ maxWidth: "160px" }}
        error={!!errorMessage}
        helperText={errorMessage}
        {...inputProps}
      />
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPopover-paper": {
            borderRadius: "12px",
          },
        }}
      >
        <Box sx={{ width: 200 }}>
          <Box sx={{ background: COMMON_COLORS.bg, p: "8px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: "8px",
              }}
            >
              {backButton}
              <Typography sx={{ fontSize: "15px" }}>
                {date.getFullYear()} / {date.getMonth() + 1}
              </Typography>
              {forwardButton}
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 1,
              }}
            >
              {(locale.lang === "ja" ? DAY_OF_WEEK_JP : DAY_OF_WEEK_EN).map(
                (day) => (
                  <Typography
                    key={day}
                    sx={{
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    {day}
                  </Typography>
                )
              )}
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 1,
              p: "8px",
            }}
          >
            {generateCalendarDays.map((date, index) => (
              <Box
                key={index}
                onClick={() => date && handleDateClick(date)}
                sx={{
                  textAlign: "center",
                  cursor: date ? "pointer" : "default",
                  "&:hover": {
                    bgcolor: date ? "action.hover" : "transparent",
                  },
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>
                  {date ? date.getDate() : ""}
                </Typography>
              </Box>
            ))}
          </Box>
          <Button size="small" onClick={handleDeleteClick} sx={{ pb: "10px" }}>
            {localeStrings.commonButton.delete}
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}
