export const formatDate = (date: string) => {
 return new Date(date).toLocaleDateString("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "2-digit",
 });
};
