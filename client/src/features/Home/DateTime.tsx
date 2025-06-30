import { useEffect, useState } from "react";

export default function DateTime() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) =>
        date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

    const formatDate = (date: Date) =>
        date.toLocaleDateString([], {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    return (
        <p style={{ fontSize: "1.15rem", color: "var(--text-color)" }}>
            {formatDate(currentTime)} |{" "}
            <span style={{ fontWeight: 600 }}>{formatTime(currentTime)}</span>
        </p>
    );
}