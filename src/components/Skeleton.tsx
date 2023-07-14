import { HTMLAttributes } from 'react';
import { keyframes } from '@emotion/react';
import colors from 'constants/colors';

export function Skeleton({ ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      css={{
        borderRadius: '5px',
        background: colors.grey200,
        animation: `${skeletonLoading} 1s ease-in-out infinite`,
      }}
      {...props}
    />
  );
}

const skeletonLoading = keyframes`
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
`;
