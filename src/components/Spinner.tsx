import { HTMLAttributes } from 'react';
import spinnerSrc from 'assets/spinner.svg';

export function Spinner({ ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      css={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
      {...props}
    >
      <img src={spinnerSrc} alt="로딩 이미지" css={{ width: '6rem' }} />
    </div>
  );
}
