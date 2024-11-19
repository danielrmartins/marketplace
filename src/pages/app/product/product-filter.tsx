import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SaleTag02Icon from '@/icons/sale-tag-02-stroke-rounded';

const productFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
});

type ProductFiltersSchema = z.infer<typeof productFiltersSchema>;

export function ProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search');
  const status = searchParams.get('status');

  const { control, handleSubmit, register } = useForm<ProductFiltersSchema>({
    resolver: zodResolver(productFiltersSchema),
    defaultValues: { search: search ?? '', status: status ?? '' },
  });

  function handleFilter({ search, status }: ProductFiltersSchema) {
    setSearchParams((state) => {
      if (search) {
        state.set('search', search);
      } else {
        state.delete('search');
      }

      if (status) {
        state.set('status', status);
      } else {
        state.delete('status');
      }

      return state;
    });
  }

  return (
    <Card className="h-[306px] w-[327px] border-0 p-6">
      <CardHeader className="font-dm-sans text-lg font-bold text-gray-300">Filtrar</CardHeader>
      <CardContent className="flex flex-col justify-center">
        <form className="flex flex-col gap-5 pb-10" onSubmit={handleSubmit(handleFilter)}>
          <Input placeholder="Pesquisar" className="font-poppins text-gray-200 placeholder:text-base" icon="search" {...register('search')} />
          <Controller
            control={control}
            name="status"
            render={({ field: { name, onChange, value, disabled } }) => (
              <Select name={name} onValueChange={onChange} value={value} disabled={disabled}>
                <SelectTrigger className="b-0 flex gap-3 p-0 font-poppins text-base text-gray-200">
                  <SaleTag02Icon className="h-6 w-6 text-gray-200" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Anunciado</SelectItem>
                  <SelectItem value="sold">Vendido</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <Button size="xl">Aplicar filtro</Button>
        </form>
      </CardContent>
    </Card>
  );
}
