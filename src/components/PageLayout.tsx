import { ReactNode } from 'react';
import colors from 'constants/colors';

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div css={{ maxWidth: '650px', width: '100%', padding: '0 20px', margin: '0 auto', height: 'auto' }}>
      <div css={{ background: colors.background }}>{children}</div>
    </div>
  );
}
