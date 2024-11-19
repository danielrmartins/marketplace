import { useLocation, useNavigate } from 'react-router-dom';

import Logo from '@/assets/Logo.png';
import ChartHistogramIcon from '@/icons/chart-histogram-stroke-rounded';
import PackageIcon from '@/icons/package-stroke-rounded';
import PlusSignIcon from '@/icons/plus-sign-stroke-rounded';

import { AccountMenu } from './account-menu';
import { NavLink } from './nav-link';
import { Button } from './ui/button';

export function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleNewProduct() {
    navigate('/products/new');
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-6">
        <img src={Logo} alt="logo" className="h-10 w-14" />

        <nav className="flex flex-grow items-center justify-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <ChartHistogramIcon data-current={pathname === '/'} className="h-4 w-4 text-gray-300 hover:text-foreground data-[current=true]:text-orange-base" />
            Dashboard
          </NavLink>
          <NavLink to="/products">
            <PackageIcon data-current={pathname === '/products'} className="h-4 w-4 text-gray-300 data-[current=true]:text-orange-base" />
            Produtos
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button onClick={handleNewProduct}>
            <PlusSignIcon className="h-8 w-8 text-base-background" />
            Novo produto
          </Button>
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
