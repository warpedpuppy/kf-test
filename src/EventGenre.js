import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventGenre = ({events}) => {
    const [data, setData] = useState([]);

    useEffect(() => { setData(() => getData()); }, [events]);

    const getData = () => {
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        const data = genres.map((genre) => {
            const value = events.filter(({summary}) => 
            summary.split(' ').includes(genre)
            ).length;
            return {name: genre, value};
        });
        return data;
    };

    const COLORS = ['#EB9021', '#EB2821', '#EA21A2', '#A721EB', '#1f7eea']; 

    return(
        <ResponsiveContainer height={400}>
            <PieChart height={400}>
                <Legend align='center' verticalAlign='top' height={36} iconSize='20' iconType='circle'/>
                <Pie
                    data={data}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    outerRadius={80}
                    dataKey='value'
                    label={({ percent }) =>
                        `${(percent * 100).toFixed(0)}%`
                    }
                >
                    {data.map((entry, index) => (
                        <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        name={entry.name}
                        />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default EventGenre;
