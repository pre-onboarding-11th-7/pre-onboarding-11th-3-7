export function setDateFormat(date: Date) {
  return date
    .toLocaleDateString("fr-CA")
    .replace(/(\d{4})-(\d{2})-(\d{2})/g, "$1년 $2월 $3일");
}
