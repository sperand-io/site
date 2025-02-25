'use client';

import { ThemeSwitch } from 'nextra-theme-blog';

export function NavbarRight() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ThemeSwitch />
    </div>
  );
}