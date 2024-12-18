import React, { useState } from "react";
import { Box, Typography, Popover, Button } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const TimePickerModal = ({ name }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { control } = useFormContext();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  // 時間（0-23）の配列
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // 分（0-59）の配列
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const formatTime = (hour, minute) => {
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return `${formattedHour}:${formattedMinute}`;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        const selectedHour = value ? parseInt(value.split(":")[0]) : 0;
        const selectedMinute = value ? parseInt(value.split(":")[1]) : 0;

        return (
          <Box>
            <Button
              onClick={handleOpen}
              variant="outlined"
              sx={{
                width: "100%",
                justifyContent: "flex-start",
                textTransform: "none",
              }}
            >
              {value || formatTime(selectedHour, selectedMinute)}
            </Button>

            <Popover
              open={open}
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
              sx={{
                "& .MuiPopover-paper": {
                  width: 300,
                  mt: 1,
                  borderRadius: 2,
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                  outline: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Button onClick={handleClose}>キャンセル</Button>
                  <Button onClick={handleClose} color="primary">
                    完了
                  </Button>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    height: 300,
                  }}
                >
                  {/* 時間スクロール */}
                  <Box
                    sx={{
                      flex: 1,
                      overflowY: "auto",
                      borderRight: 1,
                      borderColor: "divider",
                      pr: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: "center", mb: 1 }}
                    >
                      時間
                    </Typography>
                    {hours.map((hour) => (
                      <Box
                        key={hour}
                        onClick={() => {
                          const newTime = formatTime(hour, selectedMinute);
                          onChange(newTime);
                        }}
                        sx={{
                          textAlign: "center",
                          py: 1,
                          cursor: "pointer",
                          bgcolor:
                            selectedHour === hour
                              ? "action.selected"
                              : "transparent",
                          "&:hover": {
                            bgcolor: "action.hover",
                          },
                        }}
                      >
                        {hour.toString().padStart(2, "0")}
                      </Box>
                    ))}
                  </Box>

                  {/* 分スクロール */}
                  <Box
                    sx={{
                      flex: 1,
                      overflowY: "auto",
                      pl: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: "center", mb: 1 }}
                    >
                      分
                    </Typography>
                    {minutes.map((minute) => (
                      <Box
                        key={minute}
                        onClick={() => {
                          const newTime = formatTime(selectedHour, minute);
                          onChange(newTime);
                        }}
                        sx={{
                          textAlign: "center",
                          py: 1,
                          cursor: "pointer",
                          bgcolor:
                            selectedMinute === minute
                              ? "action.selected"
                              : "transparent",
                          "&:hover": {
                            bgcolor: "action.hover",
                          },
                        }}
                      >
                        {minute.toString().padStart(2, "0")}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Popover>
          </Box>
        );
      }}
    />
  );
};

export default TimePickerModal;
