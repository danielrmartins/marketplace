import { useQuery } from '@tanstack/react-query';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { getViewsPerDay } from '@/api/get-views-per-day';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import UserMultipleIcon from '@/icons/user-multiple-stroke-rounded';

export function ViewsPerDayChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data } = useQuery({ queryKey: ['metrics', 'days'], queryFn: getViewsPerDay });

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    return date.getDate().toString();
  };

  const formatLabel = (value: string) => {
    const formattedDate = format(new Date(value), "dd 'de' MMMM", { locale: ptBR });
    const [day, , month] = formattedDate.split(' ');

    return (
      <span className="font-poppins text-xxs font-medium leading-3 text-gray-400">
        {day} DE {month.toUpperCase()}
      </span>
    );
  };

  return (
    <Card>
      <CardHeader className="w-full flex-row items-center justify-between">
        <p className="font-dm-sans text-lg font-bold text-gray-500">Visitantes</p>
        <div>
          <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {data ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data.viewsPerDay} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} tickFormatter={formatXAxis} />
              <YAxis stroke="#888" dataKey="amount" axisLine={false} tickLine={false} width={20} />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line stroke={'#5EC5FD'} type="basis" strokeWidth={2} dataKey="amount" dot={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, padding: 12, gap: 8, border: 0, boxShadow: '#F5EAEA' }}
                formatter={(_value, _name, props, index) => [
                  <div className="flex items-center gap-2" key={index}>
                    <UserMultipleIcon className="h-4 w-4 text-gray-300" />
                    <span className="font-poppins text-xs text-gray-300">{props.payload.amount} visitantes</span>
                  </div>,
                ]}
                labelFormatter={formatLabel}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
