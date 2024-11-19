import { useQuery } from '@tanstack/react-query';

import { getViews } from '@/api/get-views';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import UserMultipleIcon from '@/icons/user-multiple-stroke-rounded';

export function ViewsCard() {
  const { data } = useQuery({ queryKey: ['metrics', 'views'], queryFn: getViews });

  return (
    <Card className="flex w-60 items-center border-0">
      <CardHeader className="bg-blue-light m-3 rounded">
        <UserMultipleIcon className="h-8 w-8 text-gray-300" />
      </CardHeader>
      <CardContent className="mr-7 flex flex-col justify-center p-0">
        <p className="font-dm-sans text-2xl font-bold text-gray-400">{data?.amount}</p>
        <p className="font-poppins text-xs font-normal text-gray-300">Pessoas visitantes</p>
      </CardContent>
    </Card>
  );
}
