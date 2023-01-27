import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  TooltipProps
} from 'recharts'
import { format, parseISO, subDays } from 'date-fns'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface GraphipcProps {
  date: string;
  value: number,
  value2: number
}

export const CustomTooltip = ({ 
  active, 
  payload, 
  label 
}: TooltipProps<ValueType, NameType>) => {

  if (active) {
    return (
      <div className='tooltip'>
        <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
        <p>{payload?.[0].value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <p>{payload?.[1].value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      </div>
    )
  }
  return null

}




export const App = () => {
  const [dataGraphic, setdataGraphic] = useState<GraphipcProps[]>()

  const setData = () => {
    const data: GraphipcProps[] = []

    for (let num = 30; num >= 0; num--) {
      data.push({
        date: subDays(new Date(), num).toISOString().substr(0, 10),
        value: 1 * Math.random(),
        value2: 1 - Math.random()
      })
    }
    setdataGraphic(data)
  }

  useEffect(() => {
    setData();
    console.log(dataGraphic)
  }, [])



  return (
    <ResponsiveContainer width='100%' height={400}>
      <AreaChart data={dataGraphic}>
        <defs>
          <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#2451b7' stopOpacity={0.4} />
            <stop offset='75%' stopColor='#2451b7' stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <Area dataKey='value' stroke='#2451b7' fill='url(#color)' />
        <Area dataKey='value2' stroke='#D431b7' fill='url(#color)' />
        <XAxis
          dataKey='date'
          tickLine={false}
          axisLine={false}
          tickFormatter={str => {
            const date = parseISO(str)
            if (date.getDate() % 7 === 0) {
              return format(date, "MMM,  d ")
            }
            return ""
          }}
        />
        <YAxis
          dataKey='value'
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number) => `$${number.toFixed(2)}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}


