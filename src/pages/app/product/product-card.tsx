import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';

export interface ProductCardProps {
  product: {
    id: string;
    title: string;
    description: number;
    status: 'available' | 'sold' | 'cancelled';
    priceInCents: number;
    category: {
      id: string;
      title: string;
      slug: string;
    };
    owner: {
      id: string;
      avatar: string | null;
      email: string;
      name: string;
      phone: string;
    };
    attachments: {
      id: string;
      url: string;
    }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  console.log(product);

  function handleStatusColor(status: string) {
    switch (status) {
      case 'available':
        return 'bg-blue-dark';
      case 'sold':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  }

  function handleStatusText(status: string) {
    switch (status) {
      case 'available':
        return 'ANUNCIADO';
      case 'sold':
        return 'VENDIDO';
      case 'cancelled':
        return 'DESATIVADO';
      default:
        return 'DESATIVADO';
    }
  }
  return (
    <Card className="w-[331px] rounded-2xl">
      <CardHeader className="relative p-1">
        <img className="h-[144px] w-[323px] rounded-2xl" src={product.attachments[0].url} alt={product.attachments[0].id} />
        <div className="absolute right-2 top-2 flex space-x-2">
          <div className={`rounded-full px-2 py-1 font-poppins text-xxs font-medium text-white ${handleStatusColor(product.status)}`}>
            {handleStatusText(product.status)}
          </div>
          <div className="rounded-full bg-gray-400 px-2 py-1 font-poppins text-xxs font-medium text-white">{product.category.title.toUpperCase()}</div>
        </div>
      </CardHeader>
      <CardContent className="px-3">
        <div className="flex justify-between">
          <span className="font-poppins text-base font-semibold text-gray-400">{product.title}</span>
          <div>
            <span className="font-poppins text-xs font-medium text-gray-500">R$</span>
            <span className="font-dm-sans text-lg font-bold text-gray-500">{product.priceInCents / 100}</span>
          </div>
        </div>
        <CardDescription className="font-poppins text-sm font-normal text-gray-300">{product.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
