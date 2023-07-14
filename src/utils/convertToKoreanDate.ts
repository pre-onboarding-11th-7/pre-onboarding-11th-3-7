const convertToKoreanDate = (utcDateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const utcDate = new Date(utcDateString);
  const koreanDate = utcDate.toLocaleDateString('ko-KR', options);
  return koreanDate;
};

export default convertToKoreanDate;
