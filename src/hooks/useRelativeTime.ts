import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.locale("ko");
dayjs.updateLocale("ko", {
  relativeTime: {
    future: "%s 후",
    past: "%s 전",
    s: "방금",
    m: "1분",
    mm: "%d분",
    h: "1시간",
    hh: "%d시간",
    d: "1일",
    dd: "%d일",
    M: "1개월",
    MM: "%d개월",
    y: "1년",
    yy: "%d년",
  },
});

export const useRelativeTime = (targetDate: Dayjs) => {
  const [displayTime, setDisplayTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = dayjs();
      const target = dayjs(targetDate);
      const diffInHours = now.diff(target, "hour");

      if (diffInHours < 24) {
        setDisplayTime(target.fromNow());
      } else {
        setDisplayTime(target.format("YYYY년 MM월 DD일"));
      }
    };

    update();

    const interval = setInterval(update, 60000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return displayTime;
};
