export default function getTimeElapsedString(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const elapsedMs = now.getTime() - date.getTime();
  
    // calculate the elapsed time in seconds, minutes, hours, and days
    const seconds = Math.floor(elapsedMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    // choose the appropriate time unit to display
    if (days > 0) {
      return `تم الاضافة منذ ${days} ${days === 1 ? "يوم" : "ايام"} `;
    } else if (hours > 0) {
      return `تم الاضافة منذ ${hours} ${hours === 1 ? "ساعة" : "ساعات"} `;
    } else if (minutes > 0) {
      return `تم الاضافة منذ ${minutes} ${minutes === 1 ? "دقيقة" : "دقائق"} `;
    } else {
      return `تم الاضافة منذ ${seconds} ${seconds === 1 ? "ثانية" : "ثواني"} `;
    }
  }