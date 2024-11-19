import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import { getProducts } from '@/api/get-products';

import { ProductCard } from './product-card';
import { ProductFilter } from './product-filter';

export function Products() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search');
  const status = searchParams.get('status');

  const { data } = useQuery({ queryKey: ['products', search, status], queryFn: () => getProducts({ search, status }) });

  return (
    <>
      <Helmet title="Produtos" />
      <div>
        <h1 className="font-dm-sans text-2xl font-bold text-gray-500">Seus produtos</h1>
        <span className="font-poppins text-sm text-gray-300">Acesse gerencie a sua lista de produtos à venda</span>
        <div className="flex gap-4 pt-10">
          <ProductFilter />
          <div className="grid grid-cols-2 flex-col gap-4">{data && data.products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </div>
    </>
  );
}
