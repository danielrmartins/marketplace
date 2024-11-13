import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getProfile } from '@/api/get-profile';
import { signOut } from '@/api/sign-out';
import Logout01Icon from '@/icons/logout-01-stroke-rounded';
import UserAccountIcon from '@/icons/user-account-stroke-rounded';

import { Button } from './ui/button';
import { Dialog } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

export function AccountMenu() {
  const navigate = useNavigate();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({ queryKey: ['profile'], queryFn: getProfile });

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => navigate('/sign-in', { replace: true }),
  });

  const renderProfileAvatar = () => {
    if (isLoadingProfile) {
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>;
    }

    if (!profile?.seller.avatar) {
      return <UserAccountIcon className="h-8 w-8 rounded-full text-orange-500" />;
    }

    return <img src={profile?.seller.avatar.url} alt={profile?.seller.name} className="h-8 w-8 rounded-full" />;
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>{renderProfileAvatar()}</DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuLabel className="flex flex-col">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-3">
                {renderProfileAvatar()}
                <span className="text-sm font-normal text-gray-500">{profile?.seller.name}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button variant={'link'} className="flex w-full justify-between p-0 text-sm" onClick={() => signOutFn()} disabled={isSigningOut}>
              Sair
              <Logout01Icon className="h-8 w-8 text-orange-500" />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
