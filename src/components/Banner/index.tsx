const BANNER_URL =
  "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100";

export const Banner = () => {
  return (
    <figure className="h-32 w-full dark:bg-white rounded-md">
      <img
        src={BANNER_URL}
        loading="lazy"
        alt="wanted logo"
        className="h-full mx-auto"
      />
    </figure>
  );
};
