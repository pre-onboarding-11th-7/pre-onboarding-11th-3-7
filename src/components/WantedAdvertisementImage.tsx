import { AnchorHTMLAttributes } from 'react';

export function WantedAdvertisementImage(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href="https://www.wanted.co.kr/" {...props}>
      <img
        alt="원티드 광고"
        src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
      />
    </a>
  );
}
