export default function FormDatePicker({ name }: Props) {
  // ... 既存のロジック部分は変更なし ...

  return (
    <Box>
      <TextField
        name={name}
        value={formatDateTime(date, "YYYY/MM/DD")}
        onClick={handleClick}
        placeholder="YYYY/MM/DD"
        InputProps={{
          endAdornment: <CalendarMonth sx={{ color: "#a8b3cf" }} />,
          sx: {
            backgroundColor: "#1a1a1a",
            color: "#a8b3cf",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2d2d2d",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#3b3b3b",
            },
          },
        }}
        sx={{ maxWidth: "155px" }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "#1a1a1a",
            border: "1px solid #2d2d2d",
            borderRadius: "8px",
          },
        }}
      >
        <Box
          sx={{
            width: 280,
            p: 2,
            color: "#a8b3cf",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Button
              onClick={prevMonth}
              sx={{
                minWidth: 32,
                p: 1,
                color: "#a8b3cf",
              }}
            >
              <Image
                src="/images/common/icons/arrow-back.svg"
                width={8}
                height={14}
                alt="back"
              />
            </Button>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "#a8b3cf",
              }}
            >
              {formatDateTime(date, "MMMM YYYY")}
            </Typography>
            <Button
              onClick={nextMonth}
              sx={{
                minWidth: 32,
                p: 1,
                color: "#a8b3cf",
              }}
            >
              <Image
                src="/images/common/icons/arrow-forward.svg"
                width={8}
                height={14}
                alt="forward"
              />
            </Button>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 0.5,
            }}
          >
            {(locale.lang === "ja" ? DAY_OF_WEEK_JP : DAY_OF_WEEK_EN).map(
              (day) => (
                <Typography
                  key={day}
                  sx={{
                    textAlign: "center",
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    py: 1,
                  }}
                >
                  {day}
                </Typography>
              )
            )}

            {generateCalendarDays.map((day, index) => (
              <Button
                key={index}
                disabled={!day}
                onClick={() => day && handleDateClick(day)}
                sx={{
                  minWidth: 32,
                  height: 32,
                  p: 0,
                  borderRadius: "50%",
                  color: "#a8b3cf",
                  "&.Mui-selected": {
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                  },
                  ...(day?.toDateString() === date.toDateString() && {
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                  }),
                }}
              >
                {day ? day.getDate() : ""}
              </Button>
            ))}
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}
