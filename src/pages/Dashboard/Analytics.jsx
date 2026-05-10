import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { Calendar, Filter, Download } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Mock Data
const customTooltipData = [
  { name: 'Jan', spent: 400, budget: 1000 },
  { name: 'Feb', spent: 300, budget: 1000 },
  { name: 'Mar', spent: 900, budget: 1500 },
  { name: 'Apr', spent: 1200, budget: 1200 },
  { name: 'May', spent: 500, budget: 1000 },
  { name: 'Jun', spent: 800, budget: 1500 },
];

const categoryData = [
  { name: 'Flights', value: 4500, color: '#3b82f6' },
  { name: 'Hotels', value: 3200, color: '#8b5cf6' },
  { name: 'Food', value: 1800, color: '#10b981' },
  { name: 'Activities', value: 1500, color: '#f59e0b' },
];

const activityData = [
  { day: 'Mon', activities: 2 },
  { day: 'Tue', activities: 4 },
  { day: 'Wed', activities: 3 },
  { day: 'Thu', activities: 6 },
  { day: 'Fri', activities: 5 },
  { day: 'Sat', activities: 8 },
  { day: 'Sun', activities: 7 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 text-sm">
        <p className="font-bold text-slate-800 dark:text-white mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="font-medium">
            {entry.name}: ₹{entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6M');

  return (
    <AppLayout>
      <div className="w-full pb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Analytics Overview</h1>
            <p className="text-slate-500 dark:text-slate-400">Deep dive into your travel spending and habits.</p>
          </div>
          <div className="flex space-x-3 w-full sm:w-auto">
             <div className="bg-white dark:bg-slate-800 p-1 flex rounded-xl border border-slate-200 dark:border-slate-700">
               {['1M', '6M', '1Y', 'ALL'].map(range => (
                 <button 
                   key={range}
                   onClick={() => setTimeRange(range)}
                   className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${timeRange === range ? 'bg-primary text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
                 >
                   {range}
                 </button>
               ))}
             </div>
             <Button variant="secondary" className="hidden sm:flex shadow-sm">
               <Download size={18} className="mr-2" /> Export
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main Spending Chart */}
          <Card className="p-6 border-slate-100 dark:border-slate-800 dark:bg-slate-800 lg:col-span-2 shadow-sm">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-slate-800 dark:text-white text-lg">Spending vs Budget</h3>
             </div>
             <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={customTooltipData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                   <RechartsTooltip content={<CustomTooltip />} cursor={{fill: 'rgba(59, 130, 246, 0.05)'}} />
                   <Bar dataKey="spent" name="Spent" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                   <Bar dataKey="budget" name="Budget" fill="#cbd5e1" radius={[4, 4, 0, 0]} maxBarSize={40} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </Card>

           {/* Category Pie Chart */}
          <Card className="p-6 border-slate-100 dark:border-slate-800 dark:bg-slate-800 shadow-sm">
             <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-6">Expense Categories</h3>
             <div className="h-48 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={categoryData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                     stroke="none"
                   >
                     {categoryData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <RechartsTooltip content={<CustomTooltip />} />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div className="mt-4 space-y-2">
               {categoryData.map(cat => (
                 <div key={cat.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                       <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: cat.color }}></span>
                       <span className="text-slate-600 dark:text-slate-400">{cat.name}</span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-white">₹{cat.value.toLocaleString()}</span>
                 </div>
               ))}
             </div>
          </Card>
        </div>

        {/* Activity Density Line Chart */}
        <Card className="p-6 border-slate-100 dark:border-slate-800 dark:bg-slate-800 shadow-sm">
           <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-6">Activities Distribution (Weekly)</h3>
           <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                 <RechartsTooltip content={<CustomTooltip />} />
                 <Line type="monotone" dataKey="activities" name="Activities" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </Card>

      </div>
    </AppLayout>
  );
};

export default Analytics;
