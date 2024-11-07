import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-foreground/5 p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg text-foreground">
          {/* <Pizza className="h-5 w-5" /> */}
          <span className="font-semibold">pizza.shop</span>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center p-10">
        <Outlet />
      </div>
    </div>
  );
}
