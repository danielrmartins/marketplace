import { Outlet } from 'react-router-dom';

import Background from '@/assets/Background.png';
import LogoIcon from '@/assets/Logo';

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="relative flex flex-col justify-center p-10 text-muted-foreground">
        <LogoIcon className="absolute left-0 top-0 m-10 h-16" />
        <img src={Background} alt="Auth" />
      </div>

      <div className="relative flex flex-col items-center justify-center p-10">
        <Outlet />
      </div>
    </div>
  );
}
