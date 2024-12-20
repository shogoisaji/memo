import { useEffect, useRef } from "react";

type Props = {
  initialHour: string;
  initialMinute: string;
  // 他のProps...
};

export default function FormTimePicker({
  initialHour,
  initialMinute,
  ...props
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

  return (
    <div>
      <div ref={hourRef}>
        {/* 時間リスト */}
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} data-hour={String(i).padStart(2, "0")}>
            {String(i).padStart(2, "0")}
          </div>
        ))}
      </div>
      <div ref={minuteRef}>
        {/* 分リスト */}
        {Array.from({ length: 60 }, (_, i) => (
          <div key={i} data-minute={String(i).padStart(2, "0")}>
            {String(i).padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
}
