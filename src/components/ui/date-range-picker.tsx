'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateRangePickerProps extends React.ComponentProps<'div'> {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

export function DatePickerWithRange({ className, date, onDateChange }: DateRangePickerProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant="ghost" className={cn('text-xxs justify-end font-poppins font-medium', !date && 'leading-3 text-gray-300')}>
            <CalendarIcon className="text-blue-dark" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd 'de' MMMM", { locale: ptBR })} - {format(date.to, "dd 'de' MMMM", { locale: ptBR })}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={onDateChange} numberOfMonths={2} locale={ptBR} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
