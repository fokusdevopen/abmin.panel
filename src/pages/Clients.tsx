import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, Phone, Mail, MapPin, Calendar, User } from 'lucide-react'

interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  position: string
  address: string
  city: string
  status: 'active' | 'inactive' | 'lead'
  registrationDate: string
  lastActivity: string
  projectsCount: number
  totalSpent: number
  tags: string[]
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Иван Петров',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    company: 'ООО "Рога и копыта"',
    position: 'Директор',
    address: 'ул. Ленина, 123',
    city: 'Москва',
    status: 'active',
    registrationDate: '2025-01-15',
    lastActivity: '2025-11-30',
    projectsCount: 5,
    totalSpent: 1250000,
    tags: ['VIP', 'Корпоративный']
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    email: 'maria@example.com',
    phone: '+7 (999) 987-65-43',
    company: 'ИП Сидорова',
    position: 'Индивидуальный предприниматель',
    address: 'пр. Мира, 45',
    city: 'Санкт-Петербург',
    status: 'active',
    registrationDate: '2025-03-22',
    lastActivity: '2025-11-28',
    projectsCount: 2,
    totalSpent: 480000,
    tags: ['Новый']
  },
  {
    id: '3',
    name: 'Алексей Иванов',
    email: 'alexey@example.com',
    phone: '+7 (999) 456-78-90',
    company: 'ООО "ТехноСфера"',
    position: 'CTO',
    address: 'ул. Технологическая, 78',
    city: 'Новосибирск',
    status: 'lead',
    registrationDate: '2025-11-10',
    lastActivity: '2025-11-25',
    projectsCount: 0,
    totalSpent: 0,
    tags: ['Потенциальный']
  },
  {
    id: '4',
    name: 'Елена Козлова',
    email: 'elena@example.com',
    phone: '+7 (999) 321-65-49',
    company: 'ООО "ДизайнПроект"',
    position: 'Дизайнер',
    address: 'ул. Дизайнерская, 21',
    city: 'Казань',
    status: 'inactive',
    registrationDate: '2024-08-14',
    lastActivity: '2025-06-15',
    projectsCount: 3,
    totalSpent: 720000,
    tags: ['Корпоративный']
  }
]

export default function Clients() {
  const [clients] = useState<Client[]>(mockClients)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const handleViewDetails = (client: Client) => {
    setSelectedClient(client)
  }

  const handleCloseDetails = () => {
    setSelectedClient(null)
  }

  const handleCreateClient = () => {
    setShowCreateForm(true)
  }

  const handleCloseCreateForm = () => {
    setShowCreateForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'lead': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный'
      case 'inactive': return 'Неактивный'
      case 'lead': return 'Потенциальный'
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Клиенты</h1>
          <p className="text-gray-500 mt-1">Управление клиентской базой</p>
        </div>
        <button 
          onClick={handleCreateClient}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Добавить клиента
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Поиск</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Поиск по имени, email или компании..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input"
            >
              <option value="all">Все статусы</option>
              <option value="active">Активные</option>
              <option value="inactive">Неактивные</option>
              <option value="lead">Потенциальные</option>
            </select>
          </div>
          
          <button className="btn-primary flex items-center gap-2 mt-6">
            <Search size={18} />
            Фильтровать
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Клиент</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Компания</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Контакты</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Статус</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Проекты</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Потрачено</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-gray-500">{client.position}</div>
                  </td>
                  <td className="py-3 px-4">{client.company}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail size={14} />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone size={14} />
                        {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {getStatusText(client.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">{client.projectsCount}</td>
                  <td className="py-3 px-4">₽{client.totalSpent.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(client)}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                        title="Просмотр"
                        aria-label={`Просмотр деталей клиента ${client.name}`}
                      >
                        <Eye size={18} aria-hidden="true" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                        title="Редактировать"
                        aria-label={`Редактировать клиента ${client.name}`}
                      >
                        <Edit size={18} aria-hidden="true" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-lg"
                        title="Удалить"
                        aria-label={`Удалить клиента ${client.name}`}
                      >
                        <Trash2 size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Details Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Информация о клиенте</h2>
              <button
                onClick={handleCloseDetails}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                  <User size={32} className="text-gray-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedClient.name}</h3>
                  <p className="text-gray-600">{selectedClient.position}</p>
                  <p className="text-gray-600">{selectedClient.company}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedClient.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card">
                  <h4 className="font-medium text-gray-900 mb-2">Контактная информация</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={16} className="text-gray-500" />
                      <span>{selectedClient.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={16} className="text-gray-500" />
                      <span>{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin size={16} className="text-gray-500 mt-0.5" />
                      <span>{selectedClient.address}, {selectedClient.city}</span>
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <h4 className="font-medium text-gray-900 mb-2">Статистика</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Статус:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedClient.status)}`}>
                        {getStatusText(selectedClient.status)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Проектов:</span>
                      <span className="font-medium">{selectedClient.projectsCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Потрачено:</span>
                      <span className="font-medium">₽{selectedClient.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Дата регистрации:</span>
                      <span>{selectedClient.registrationDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Последняя активность:</span>
                      <span>{selectedClient.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Client Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Добавить клиента</h2>
              <button
                onClick={handleCloseCreateForm}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Имя клиента"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Email клиента"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  <input
                    type="tel"
                    className="input w-full"
                    placeholder="Телефон клиента"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Компания</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Компания клиента"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Должность</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Должность клиента"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Город</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Город клиента"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Адрес</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Адрес клиента"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                  <select className="input w-full">
                    <option value="active">Активный</option>
                    <option value="inactive">Неактивный</option>
                    <option value="lead">Потенциальный</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Теги</label>
                  <select className="input w-full" multiple>
                    <option>VIP</option>
                    <option>Корпоративный</option>
                    <option>Новый</option>
                    <option>Потенциальный</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={handleCloseCreateForm}
                  className="btn-secondary"
                >
                  Отмена
                </button>
                <button className="btn-primary">
                  Добавить клиента
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
