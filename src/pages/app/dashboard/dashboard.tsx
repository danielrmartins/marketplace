import { Helmet } from 'react-helmet-async';

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div>
        <h1 className="text-2xl font-bold">Últimos 30 dias</h1>
        <span className="text-sm text-gray-500">Confira as estatísticas da sua loja no último mês</span>
      </div>
    </>
  );
}
