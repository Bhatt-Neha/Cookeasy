export const formatTimeLabel = (timeString:number) => {
    const period =  timeString >= 12 ? "PM" : "AM";
    const formattedHours = timeString > 12 ? timeString - 12 : timeString === 0 ? 12 : timeString; // Convert 24-hour to 12-hour format
    return `${formattedHours}:00 ${period}`;
  };