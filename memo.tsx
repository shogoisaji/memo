import React, { useEffect, useRef } from "react";
import { Box, List, ListItem, Popover, Typography } from "@mui/material";

type Props = {
  onSelect: (value: string) => void;
  onClose: () => void;
  textColor?: string;
  initialHour: string;
  initialMinute: string;
  popOverProps: {
    open: boolean;
    anchorEl: HTMLElement | null;
    anchorOrigin: { vertical: "bottom"; horizontal: "left" };
    transformOrigin: { vertical: "top"; horizontal: "left" };
    sx?: object;
  };
};

export default function FormTimePicker({
  onSelect,
  onClose,
  textColor = "black",
  initialHour,
  initialMinute,
  popOverProps,
}: Props) {
  const hourRef = useRef<HTMLDivElement | null>(null);
  const minuteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 初期値の時間や分にスクロール
    if (hourRef.current) {
      const hourElement = hourRef.current.querySelector(
        `[data-hour="${initialHour}"]`
      );
      hourElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (minuteRef.current) {
      const minuteElement = minuteRef.current.querySelector(
        `[data-minute="${initialMinute}"]`
      );
      minuteElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [initialHour, initialMinute]);

  const handleSelect = (hour: string, minute: string) => {
    onSelect(`${hour}:${minute}`);
    onClose();
  };

  return (
    <Popover {...popOverProps}>
      <Box display="flex" p={2}>
        {/* 時間リスト */}
        <List
          ref={hourRef}
          sx={{ maxHeight: 200, overflowY: "auto", width: "50%" }}
        >
          {Array.from({ length: 24 }, (_, i) => {
            const hour = String(i).padStart(2, "0");
            return (
              <ListItem
                key={hour}
                data-hour={hour}
                button
                onClick={() => handleSelect(hour, initialMinute)}
                sx={{
                  color: textColor,
                  justifyContent: "center",
                }}
              >
                <Typography>{hour}</Typography>
              </ListItem>
            );
          })}
        </List>

        {/* 分リスト */}
        <List
          ref={minuteRef}
          sx={{ maxHeight: 200, overflowY: "auto", width: "50%" }}
        >
          {Array.from({ length: 60 }, (_, i) => {
            const minute = String(i).padStart(2, "0");
            return (
              <ListItem
                key={minute}
                data-minute={minute}
                button
                onClick={() => handleSelect(initialHour, minute)}
                sx={{
                  color: textColor,
                  justifyContent: "center",
                }}
              >
                <Typography>{minute}</Typography>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Popover>
  );
}
