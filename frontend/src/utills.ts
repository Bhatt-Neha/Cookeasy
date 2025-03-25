export const formatTimeLabel = (timeString:string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours; // Convert 24-hour to 12-hour format
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };
