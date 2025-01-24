import React, { useState } from "react";
import {
  Button,
  Popover,
  Paper,
  Grid,
  IconButton,
  Typography,
  TextField,
  styled,
} from "@mui/material";
import { ArrowBack, ArrowForward, CalendarToday } from "@mui/icons-material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  width: 320,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 36,
  padding: theme.spacing(1),
}));

const CustomDatePicker: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    setInputValue(selectedDate.toLocaleDateString("ja-JP"));
    handleClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const open = Boolean(anchorEl);

  const renderCalendar = () => {
    const currentDate = date || new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return (
      <Grid container spacing={1}>
        {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
          <Grid item xs={1.7} key={day}>
            <Typography align="center" variant="caption">
              {day}
            </Typography>
          </Grid>
        ))}
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <Grid item xs={1.7} key={`empty-${index}`} />
        ))}
        {days.map((day) => (
          <Grid item xs={1.7} key={day.toISOString()}>
            <StyledButton
              onClick={() => handleDateSelect(day)}
              variant={
                date?.toDateString() === day.toDateString()
                  ? "contained"
                  : "text"
              }
              color="primary"
            >
              {day.getDate()}
            </StyledButton>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <div>
      <TextField
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleClick}
        placeholder="YYYY/MM/DD"
        InputProps={{
          endAdornment: (
            <IconButton>
              <CalendarToday />
            </IconButton>
          ),
        }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <StyledPaper>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <IconButton
              onClick={() =>
                setDate(
                  new Date(
                    date?.getFullYear() || new Date().getFullYear(),
                    (date?.getMonth() || new Date().getMonth()) - 1,
                    1
                  )
                )
              }
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h6">
              {date ? `${date.getFullYear()}年${date.getMonth() + 1}月` : ""}
            </Typography>
            <IconButton
              onClick={() =>
                setDate(
                  new Date(
                    date?.getFullYear() || new Date().getFullYear(),
                    (date?.getMonth() || new Date().getMonth()) + 1,
                    1
                  )
                )
              }
            >
              <ArrowForward />
            </IconButton>
          </Grid>
          {renderCalendar()}
        </StyledPaper>
      </Popover>
    </div>
  );
};

export default CustomDatePicker;
