import { useState } from 'react'
import { 
  TrendingUp, 
  Users, 
  FolderKanban, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MapPin,
  Briefcase,
  FileText
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { format } from 'date-fns'
import { exportToPDF, exportToExcel } from '../utils/export'

// Моковые данные
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

const taskStats = [
  { status: 'Активные', count: 28, color: '#0ea5e9', icon: AlertCircle },
  { status: 'Завершённые', count: 45, color: '#10b981', icon: CheckCircle2 },
  { status: 'Просроченные', count: 5, color: '#ef4444', icon: XCircle },
]

const clientChurnData = [
  { month: 'Янв', new: 45, churn: 8, retention: 92 },
  { month: 'Фев', new: 52, churn: 6, retention: 94 },
  { month: 'Мар', new: 38, churn: 10, retention: 90 },
  { month: 'Апр', new: 61, churn: 5, retention: 95 },
  { month: 'Май', new: 48, churn: 7, retention: 93 },
  { month: 'Июн', new: 55, churn: 4, retention: 96 },
]

const serviceTypesData = [
  { name: 'Разработка сайтов', value: 35, revenue: 850000, color: '#0ea5e9' },
  { name: 'Мобильные приложения', value: 25, revenue: 620000, color: '#10b981' },
  { name: 'Дизайн', value: 20, revenue: 480000, color: '#f59e0b' },
  { name: 'SEO', value: 15, revenue: 350000, color: '#8b5cf6' },
  { name: 'Консультации', value: 5, revenue: 150000, color: '#ec4899' },
]

const newLeadsData = [
  { date: '01.01', leads: 12, converted: 8 },
  { date: '08.01', leads: 15, converted: 10 },
  { date: '15.01', leads: 18, converted: 12 },
  { date: '22.01', leads: 14, converted: 9 },
  { date: '29.01', leads: 20, converted: 15 },
]

const citiesData = [
  { city: 'Москва', clients: 456, revenue: 1200000 },
  { city: 'Санкт-Петербург', clients: 234, revenue: 680000 },
  { city: 'Новосибирск', clients: 128, revenue: 420000 },
  { city: 'Екатеринбург', clients: 98, revenue: 310000 },
  { city: 'Казань', clients: 76, revenue: 240000 },
]

const clientTypesData = [
  { type: 'VIP', count: 45, revenue: 980000 },
  { type: 'Корпоративные', count: 234, revenue: 1200000 },
  { type: 'Малый бизнес', count: 567, revenue: 890000 },
  { type: 'Стартапы', count: 123, revenue: 320000 },
]

export default function Dashboard() {
  const [dateFrom, setDateFrom] = useState(format(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd'))
  const [dateTo, setDateTo] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [selectedService, setSelectedService] = useState<string>('all')
  const [selectedClientType, setSelectedClientType] = useState<string>('all')
  const [showDetails, setShowDetails] = useState(false)

  const handleExportPDF = () => {
    exportToPDF({
      title: 'Отчёт по дашборду',
      headers: ['Метрика', 'Значение', 'Изменение'],
      rows: [
        ['Всего клиентов', '1,234', '+12.5%'],
        ['Активных проектов', '48', '+8.2%'],
        ['Выручка', '₽2,450,000', '+15.3%'],
        ['Рост продаж', '24.8%', '+5.1%'],
      ]
    }, `dashboard-report-${format(new Date(), 'yyyy-MM-dd')}`)
  }

  const handleExportExcel = () => {
    exportToExcel({
      title: 'Отчёт по дашборду',
      headers: ['Метрика', 'Значение', 'Изменение'],
      rows: [
        ['Всего клиентов', '1,234', '+12.5%'],
        ['Активных проектов', '48', '+8.2%'],
        ['Выручка', '₽2,450,000', '+15.3%'],
        ['Рост продаж', '24.8%', '+5.1%'],
      ]
    }, `dashboard-report-${format(new Date(), 'yyyy-MM-dd')}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Дашборд</h1>
          <p className="text-gray-500 mt-1">Обзор метрик и статистики</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="btn-secondary flex items-center gap-2"
          >
            <Eye size={18} />
            Подробнее
          </button>
          <div className="relative group">
            <button className="btn-primary flex items-center gap-2">
              <Download size={18} />
              Экспорт
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button
                onClick={handleExportPDF}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 rounded-t-lg"
              >
                <FileText size={16} />
                Экспорт в PDF
              </button>
              <button
                onClick={handleExportExcel}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 rounded-b-lg"
              >
                <FileText size={16} />
                Экспорт в Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Период от</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                value={dateFrom}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateFrom(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Период до</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Город</label>
            <select
              value={selectedCity}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCity(e.target.value)}
              className="input"
            >
              <option value="all">Все города</option>
              {citiesData.map(city => (
                <option key={city.city} value={city.city}>{city.city}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Тип услуги</label>
            <select
              value={selectedService}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedService(e.target.value)}
              className="input"
            >
              <option value="all">Все услуги</option>
              {serviceTypesData.map(service => (
                <option key={service.name} value={service.name}>{service.name}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Тип клиента</label>
            <select
              value={selectedClientType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedClientType(e.target.value)}
              className="input"
            >
              <option value="all">Все типы</option>
              {clientTypesData.map(type => (
                <option key={type.type} value={type.type}>{type.type}</option>
              ))}
            </select>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Filter size={18} />
            Применить
          </button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => setShowDetails(true)}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight size={16} className="text-green-500" />
                    ) : (
                      <ArrowDownRight size={16} className="text-red-500" />
                    )}
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
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

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {taskStats.map((task) => {
          const Icon = task.icon
          return (
            <div key={task.status} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{task.status}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{task.count}</p>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: `${task.color}20` }}>
                  <Icon size={24} style={{ color: task.color }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Выручка и расходы</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => `₽${value.toLocaleString()}`} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} name="Выручка" />
              <Area type="monotone" dataKey="expenses" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Расходы" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Client Churn */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Отток клиентов</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={clientChurnData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="new" stroke="#10b981" name="Новые клиенты" />
              <Line type="monotone" dataKey="churn" stroke="#ef4444" name="Отток" />
              <Line type="monotone" dataKey="retention" stroke="#0ea5e9" name="Удержание %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Types */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Типы услуг</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceTypesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {serviceTypesData.map((service) => (
              <div key={service.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }} />
                  <span className="text-gray-600">{service.name}</span>
                </div>
                <span className="font-medium text-gray-900">₽{service.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* New Leads */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Новые заявки</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={newLeadsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="leads" fill="#0ea5e9" name="Заявки" />
              <Bar dataKey="converted" fill="#10b981" name="Конвертировано" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cities */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin size={20} />
            Клиенты по городам
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={citiesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="city" type="category" width={100} />
              <Tooltip formatter={(value: number) => value.toLocaleString()} />
              <Bar dataKey="clients" fill="#0ea5e9" name="Клиенты" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Client Types */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase size={20} />
            Типы клиентов
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clientTypesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip formatter={(value: number) => `₽${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="count" fill="#0ea5e9" name="Количество" />
              <Bar dataKey="revenue" fill="#10b981" name="Выручка" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Подробная статистика</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">Детальная информация по выбранным метрикам...</p>
              {/* Здесь можно добавить детальную статистику */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
