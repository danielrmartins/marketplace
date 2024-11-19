import { useQuery } from '@tanstack/react-query';

import { getSoldProductsMonth } from '@/api/get-sold-products-month';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import SaleTag02Icon from '@/icons/sale-tag-02-stroke-rounded';

export function SoldMonthCard() {
  const { data } = useQuery({ queryKey: ['metrics', 'sold'], queryFn: getSoldProductsMonth });

  return (
    <Card className="flex w-60 items-center border-0">
      <CardHeader className="bg-blue-light m-3 rounded">
        <SaleTag02Icon className="text-blue-dark h-8 w-8" />
      </CardHeader>
      <CardContent className="mr-7 flex flex-grow flex-col justify-center p-0">
        <p className="font-dm-sans text-2xl font-bold text-gray-400">{data?.amount}</p>
        <p className="font-poppins text-xs font-normal text-gray-300">Produtos vendidos</p>
      </CardContent>
    </Card>
  );
}
