import { Search } from 'lucide-react';
import * as React from 'react';

import SaleTag02Icon from '@/icons/sale-tag-02-stroke-rounded';
import { cn } from '@/lib/utils';

import AccessIcon from '../../icons/access-stroke-rounded';
import CallIcon from '../../icons/call-stroke-rounded';
import Mail02Icon from '../../icons/mail-02-stroke-rounded';
import UserIcon from '../../icons/user-stroke-rounded';
import ViewOffIcon from '../../icons/view-off-stroke-rounded';
import ViewIcon from '../../icons/view-stroke-rounded';
import { Label } from './label';

type iconProps = 'email' | 'password' | 'user' | 'phone' | 'sale' | 'search';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: iconProps;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, icon, label, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div className="relative flex flex-col">
        <input
          type={showPassword && type === 'password' ? 'text' : type}
          id={label}
          className={cn(
            'peer h-9 w-full border-b border-gray-200 bg-transparent px-3 py-1 pl-10 font-poppins text-base text-gray-400 transition-colors placeholder:text-gray-200 focus:border-gray-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
          )}
          ref={ref}
          {...props}
        />
        {label && (
          <Label htmlFor={label} className="absolute -top-4 font-poppins text-xs text-gray-300 transition-colors peer-focus:text-red-500">
            {label.toUpperCase()}
          </Label>
        )}
        <Icon icon={icon} />
        {type === 'password' && (
          <div className="absolute right-1 top-1.5 h-6 w-6 cursor-pointer text-gray-300" onClick={togglePasswordVisibility}>
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </div>
        )}
      </div>
    </div>
  );
});
Input.displayName = 'Input';

export { Input };

function Icon({ icon }: { icon: iconProps }) {
  switch (icon) {
    case 'email':
      return <Mail02Icon className="absolute top-1.5 h-6 w-6 text-gray-200 peer-focus:text-red-500" />;
    case 'password':
      return <AccessIcon className="absolute top-1.5 h-6 w-6 text-gray-200 peer-focus:text-red-500" />;
    case 'user':
      return <UserIcon className="absolute top-1.5 h-6 w-6 text-gray-200 peer-focus:text-red-500" />;
    case 'phone':
      return <CallIcon className="absolute top-1.5 h-6 w-6 text-gray-200 peer-focus:text-red-500" />;
    case 'sale':
      return <SaleTag02Icon className="absolute top-1.5 h-6 w-6 text-gray-200 peer-focus:text-red-500" />;
    case 'search':
      return <Search className="absolute top-1.5 h-6 w-6 text-gray-200 peer-focus:text-red-500" />;
    default:
      return null;
  }
}
