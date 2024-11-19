import { useQuery } from '@tanstack/react-query';

import { getAvailableProducts } from '@/api/get-available-products';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Store04Icon from '@/icons/store-04-stroke-rounded';

export function AvailableProductCard() {
  const { data } = useQuery({ queryKey: ['metrics', 'available'], queryFn: getAvailableProducts });

  return (
    <Card className="flex w-60 items-center border-0">
      <CardHeader className="m-3 rounded bg-blue-light">
        <Store04Icon className="h-8 w-8 text-blue-dark" />
      </CardHeader>
      <CardContent className="mr-7 flex flex-col justify-center p-0">
        <p className="font-dm-sans text-2xl font-bold text-gray-400">{data?.amount}</p>
        <p className="font-poppins text-xs font-normal text-gray-300">Produtos anunciados</p>
      </CardContent>
    </Card>
  );
}
