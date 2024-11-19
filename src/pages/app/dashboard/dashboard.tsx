import { Helmet } from 'react-helmet-async';

import { AvailableProductCard } from './available-product-card';
import { SoldMonthCard } from './sold-month-card';
import { ViewsCard } from './views-card';
import { ViewsPerDayChart } from './views-per-day-chart';

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div>
        <h1 className="font-dm-sans text-2xl font-bold text-gray-500">Últimos 30 dias</h1>
        <span className="font-poppins text-sm text-gray-300">Confira as estatísticas da sua loja no último mês</span>
        <div className="flex gap-4 pt-10">
          <div className="grid gap-4">
            <SoldMonthCard />
            <AvailableProductCard />
            <ViewsCard />
          </div>
          <div className="w-full">
            <ViewsPerDayChart />
          </div>
        </div>
      </div>
    </>
  );
}
