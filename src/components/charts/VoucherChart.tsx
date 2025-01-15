import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  voucher: string;
  given: number;
}

const data: DataPoint[] = [
    { voucher: 'Voucher 1', given: 5 },
    { voucher: 'Voucher 2', given: 1 },
    { voucher: 'Voucher 3', given: 7 },
    { voucher: 'Voucher 4', given: 2 },
    { voucher: 'Voucher 5', given: 9 },
    { voucher: 'Voucher 6', given: 19 },
    { voucher: 'Voucher 7', given: 3},
];
// Calculate min and max values for the Y axis
const yValues = data.map(item => item.given);
const minY = Math.min(...yValues);
const maxY = Math.max(...yValues);

// Generate ticks based on min and max values
const ticks: number[] = [];
const tickInterval = (maxY - minY) / 4;
for (let i = 0; i <= 4; i++) {
  ticks.push(minY + i * tickInterval);
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DataPoint;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0 && payload[0].payload) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#1a2b4b] text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 animate-fade-in">
        <p className="font-medium text-sm">
          {data.voucher}: {data.given} given to users
        </p>
      </div>
    );
  }
  return null;
};

interface DotProps {
  cx?: number;
  cy?: number;
  payload?: DataPoint;
}

const CustomDot: React.FC<DotProps> = ({ cx, cy, payload }) => {
  if (!cx || !cy || !payload || payload.given <= 0) {
    return null;
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="white"
      stroke="#ff4d94"
      strokeWidth={2}
      className="transition-all duration-300 hover:r-6"
    />
  );
};

export default function VoucherChart() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white mt-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Given Voucher Chart</h2>
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff4d94" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ff4d94" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#eee"
            />
            <XAxis 
              dataKey="voucher" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 12 }}
            />
            <YAxis 
              domain={[minY, maxY]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 12 }}
              ticks={ticks}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={false}
            />
            <Area
              type="monotone"
              dataKey="given"
              stroke="#ff4d94"
              fillOpacity={1}
              fill="url(#colorRating)"
              dot={<CustomDot />}
              activeDot={{ r: 6, fill: "white", stroke: "#ff4d94", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

