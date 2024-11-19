import { Link, LinkProps, useLocation } from 'react-router-dom';

export type NavLinkProps = LinkProps;

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation();

  return (
    <Link
      data-current={pathname === props.to}
      className="flex items-center gap-1.5 px-4 py-2 font-poppins text-sm text-gray-300 data-[current=true]:rounded-lg data-[current=true]:bg-shape data-[current=true]:font-medium data-[current=true]:text-orange-base"
      {...props}
    />
  );
}
