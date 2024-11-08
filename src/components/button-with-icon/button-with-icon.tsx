import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import ArrowRight02Icon from '../arrow-right-02-stroke-rounded';
import { Button, buttonVariants } from '../ui/button';

interface ButtonWithIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  text: string;
  iconColor?: string;
}

const ButtonWithIcon = ({ text, iconColor, ...props }: ButtonWithIconProps) => {
  return (
    <Button {...props}>
      <>
        {text}
        <ArrowRight02Icon className={cn(`h-6 w-6 ${iconColor}`)} />
      </>
    </Button>
  );
};

export { ButtonWithIcon };
