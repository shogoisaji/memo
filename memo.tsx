import React, { useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";

const TimePickerModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);

  // 時間（0-23）の配列
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // 分（0-59）の配列
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formatTime = (hour, minute) => {
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return `${formattedHour}:${formattedMinute}`;
  };

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
        {formatTime(selectedHour, selectedMinute)}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 300,
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
                  onClick={() => setSelectedHour(hour)}
                  sx={{
                    textAlign: "center",
                    py: 1,
                    cursor: "pointer",
                    bgcolor:
                      selectedHour === hour ? "action.selected" : "transparent",
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
                  onClick={() => setSelectedMinute(minute)}
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
      </Modal>
    </Box>
  );
};

export default TimePickerModal;
