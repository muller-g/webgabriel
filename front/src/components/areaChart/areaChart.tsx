import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function AreaChartComponent({data}: any) {
    const [transformedData, setTransformedData] = useState<any[]>([]);
    const [render, setRender] = useState<any>();

    useEffect(() => {
        setTransformedData(data?.map((item: any) => ({
            name: item.day.slice(0,11).split('-').reverse().join('/'),
            uv: item.count
          })))
    }, [data])

  return (
      <>
        {
            transformedData ?
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={transformedData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
            :
            "loading"
        }
        </>
    );
}
