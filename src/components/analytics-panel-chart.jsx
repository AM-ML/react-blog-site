import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', value: 500, value2:  50, value3: 0  },
  { name: 'Tue', value: 50,  value2: 500, value3: 250  },
  { name: 'Thu', value: 500, value2: 50,  value3: 500  },
  { name: 'Fri', value: 50,  value2: 500, value3: 0    },
  { name: 'Sat', value: 500, value2: 50,  value3: 500  },
  { name: 'Sun', value: 50,  value2: 500, value3: 0    },
];

const AnalyticsPanelChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="1 1" stroke="#0009" />
        <YAxis fontSize={"1rem"} stroke="#000"/>
        <XAxis dataKey="name" stroke="#000" fontSize={"1rem"} fontFamily='lato'/>
        <Line strokeWidth={1} type="linear" dataKey="value" stroke="black" />
        <Line strokeWidth={1} type="linear" dataKey="value2" stroke="#00f" />
        <Legend fontSize={"1rem"} />
        <Tooltip fontSize={"1rem"} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsPanelChart;
