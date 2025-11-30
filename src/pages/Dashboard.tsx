import { TrendingUp, Users, FolderKanban, DollarSign, ArrowUpRight } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const stats = [
  { title: 'Всего клиентов', value: '1,234', change: '+12.5%', trend: 'up', icon: Users, color: 'text-blue-600' },
  { title: 'Активных проектов', value: '48', change: '+8.2%', trend: 'up', icon: FolderKanban, color: 'text-green-600' },
  { title: 'Выручка (мес)', value: '₽2,450,000', change: '+15.3%', trend: 'up', icon: DollarSign, color: 'text-purple-600' },
  { title: 'Рост продаж', value: '24.8%', change: '+5.1%', trend: 'up', icon: TrendingUp, color: 'text-orange-600' },
]

const revenueData = [
  { month: 'Янв', revenue: 1800000, expenses: 1200000 },
  { month: 'Фев', revenue: 2100000, expenses: 1350000 },
  { month: 'Мар', revenue: 1950000, expenses: 1400000 },
  { month: 'Апр', revenue: 2200000, expenses: 1300000 },
  { month: 'Май', revenue: 2350000, expenses: 1450000 },
  { month: 'Июн', revenue: 2450000, expenses: 1500000 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Дашборд</h1>
        <p className="text-gray-500 mt-1">Обзор метрик и статистики</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight size={16} className="text-green-500" />
                    <span className="text-sm text-green-500">{stat.change}</span>
                    <span className="text-sm text-gray-500">vs прошлый месяц</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Выручка и расходы</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₽${(value as number).toLocaleString()}`} />
            <Legend />
            <Area type="monotone" dataKey="revenue" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} name="Выручка" />
            <Area type="monotone" dataKey="expenses" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Расходы" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

