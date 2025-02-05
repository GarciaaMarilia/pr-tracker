export const timeToSeconds = (time: string) => {
 const parts = time.split(":").map(Number);
 if (parts.length === 3) {
  const [hours, minutes, seconds] = parts;
  return hours * 3600 + minutes * 60 + seconds;
 } else if (parts.length === 2) {
  const [minutes, seconds] = parts;
  return minutes * 60 + seconds;
 }
 return Number(time);
};
