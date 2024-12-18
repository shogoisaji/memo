import { useState } from "react";
import {
  Select,
  MenuItem,
  Popover,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

const DateSelect = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "date") {
      setAnchorEl(event.target);
    } else {
      setAnchorEl(null);
      setSelectedDate("");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    handleClose();
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    const startDay = firstDay.getDay();

    // 前月の日付を追加
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // 当月の日付を追加
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  return (
    <Box>
      <Select
        value={selectedOption}
        onChange={handleSelectChange}
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="">選択してください</MenuItem>
        <MenuItem value="date">日付を選択</MenuItem>
        <MenuItem value="other">その他</MenuItem>
      </Select>

      {selectedDate && (
        <Typography sx={{ mt: 2 }}>
          選択された日付: {selectedDate.toLocaleDateString()}
        </Typography>
      )}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <IconButton onClick={prevMonth} size="small">
              <ChevronLeftIcon />
            </IconButton>
            <Typography>
              {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
            </Typography>
            <IconButton onClick={nextMonth} size="small">
              <ChevronRightIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 1,
            }}
          >
            {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
              <Typography
                key={day}
                sx={{
                  textAlign: "center",
                  fontSize: "0.875rem",
                  fontWeight: "medium",
                }}
              >
                {day}
              </Typography>
            ))}

            {generateCalendarDays().map((date, index) => (
              <Box
                key={index}
                onClick={() => date && handleDateClick(date)}
                sx={{
                  textAlign: "center",
                  p: 1,
                  cursor: date ? "pointer" : "default",
                  "&:hover": {
                    bgcolor: date ? "action.hover" : "transparent",
                  },
                  borderRadius: 1,
                }}
              >
                <Typography>{date ? date.getDate() : ""}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default DateSelect;
