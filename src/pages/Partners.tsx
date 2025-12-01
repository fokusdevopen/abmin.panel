import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, Phone, Mail, User, Link, MapPin } from 'lucide-react'

interface Partner {
  id: string
  name: string
  company: string
  contactPerson: string
  email: string
  phone: string
  website: string
  address: string
  city: string
  partnershipType: string
  status: 'active' | 'inactive' | 'pending'
  startDate: string
  revenue: number
  projectsCount: number
  rating: number
  tags: string[]
}

const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'Анна Смирнова',
    company: 'ООО "ТехноЛид"',
    contactPerson: 'Анна Смирнова',
    email: 'anna@techlead.com',
    phone: '+7 (999) 111-22-33',
    website: 'https://techlead.com',
    address: 'ул. Технологическая, 10',
    city: 'Москва',
    partnershipType: 'Технологический',
    status: 'active',
    startDate: '2024-03-15',
    revenue: 2500000,
    projectsCount: 12,
    rating: 4.8,
    tags: ['VIP', 'Технологии']
  },
  {
    id: '2',
    name: 'Дмитрий Волков',
    company: 'ООО "ДизайнПрофи"',
    contactPerson: 'Дмитрий Волков',
    email: 'dmitry@designprofi.com',
    phone: '+7 (999) 444-55-66',
    website: 'https://designprofi.com',
    address: 'ул. Дизайнерская, 25',
    city: 'Санкт-Петербург',
    partnershipType: 'Дизайн',
    status: 'active',
    startDate: '2024-07-22',
    revenue: 1800000,
    projectsCount: 8,
    rating: 4.6,
    tags: ['Дизайн']
  },
  {
    id: '3',
    name: 'Елена Кузнецова',
    company: 'ИП Кузнецова',
    contactPerson: 'Елена Кузнецова',
    email: 'elena@marketingpro.ru',
    phone: '+7 (999) 777-88-99',
    website: 'https://marketingpro.ru',
    address: 'ул. Маркетинговая, 5',
    city: 'Новосибирск',
    partnershipType: 'Маркетинг',
    status: 'pending',
    startDate: '2025-11-01',
    revenue: 0,
    projectsCount: 0,
    rating: 0,
    tags: ['Новый']
  },
  {
    id: '4',
    name: 'Сергей Орлов',
    company: 'ООО "СтройСервис"',
    contactPerson: 'Сергей Орлов',
    email: 'sergey@stroiservice.com',
    phone: '+7 (999) 000-11-22',
    website: 'https://stroiservice.com',
    address: 'ул. Строительная, 15',
    city: 'Екатеринбург',
    partnershipType: 'Сервис',
    status: 'inactive',
    startDate: '2023-11-10',
    revenue: 950000,
    projectsCount: 5,
    rating: 4.2,
    tags: ['Сервис']
  }
]

export default function Partners() {
  const [partners] = useState<Partner[]>(mockPartners)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || partner.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const handleViewDetails = (partner: Partner) => {
    setSelectedPartner(partner)
  }

  const handleCloseDetails = () => {
    setSelectedPartner(null)
  }

  const handleCreatePartner = () => {
    setShowCreateForm(true)
  }

  const handleCloseCreateForm = () => {
    setShowCreateForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный'
      case 'inactive': return 'Неактивный'
      case 'pending': return 'На рассмотрении'
      default: return status
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Партнёры</h1>
          <p className="text-gray-500 mt-1">Управление партнёрской сетью</p>
        </div>
        <button 
          onClick={handleCreatePartner}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Добавить партнёра
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
                placeholder="Поиск по имени, компании или email..."
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
              <option value="pending">На рассмотрении</option>
            </select>
          </div>
          
          <button className="btn-primary flex items-center gap-2 mt-6">
            <Search size={18} />
            Фильтровать
          </button>
        </div>
      </div>

      {/* Partners Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Партнёр</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Компания</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Контакты</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Тип</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Статус</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Проекты</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Выручка</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Рейтинг</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredPartners.map((partner) => (
                <tr key={partner.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium">{partner.name}</div>
                    <div className="text-sm text-gray-500">{partner.contactPerson}</div>
                  </td>
                  <td className="py-3 px-4">{partner.company}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail size={14} />
                        {partner.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone size={14} />
                        {partner.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {partner.partnershipType}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(partner.status)}`}>
                      {getStatusText(partner.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">{partner.projectsCount}</td>
                  <td className="py-3 px-4">₽{partner.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    {partner.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        {renderStars(partner.rating)}
                        <span className="text-sm text-gray-600">({partner.rating})</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Нет оценок</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(partner)}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                        title="Просмотр"
                        aria-label={`Просмотр деталей партнёра ${partner.name}`}
                      >
                        <Eye size={18} aria-hidden="true" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                        title="Редактировать"
                        aria-label={`Редактировать партнёра ${partner.name}`}
                      >
                        <Edit size={18} aria-hidden="true" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-lg"
                        title="Удалить"
                        aria-label={`Удалить партнёра ${partner.name}`}
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

      {/* Partner Details Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Информация о партнёре</h2>
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
                  <h3 className="text-xl font-semibold text-gray-900">{selectedPartner.name}</h3>
                  <p className="text-gray-600">{selectedPartner.contactPerson}</p>
                  <p className="text-gray-600">{selectedPartner.company}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedPartner.tags.map((tag, index) => (
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
                      <span>{selectedPartner.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={16} className="text-gray-500" />
                      <span>{selectedPartner.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin size={16} className="text-gray-500 mt-0.5" />
                      <span>{selectedPartner.address}, {selectedPartner.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Link size={16} className="text-gray-500" />
                      <a href={selectedPartner.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {selectedPartner.website}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <h4 className="font-medium text-gray-900 mb-2">Информация о партнёрстве</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Тип партнёрства:</span>
                      <span className="font-medium">{selectedPartner.partnershipType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Статус:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPartner.status)}`}>
                        {getStatusText(selectedPartner.status)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Дата начала:</span>
                      <span>{selectedPartner.startDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Проектов:</span>
                      <span className="font-medium">{selectedPartner.projectsCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Выручка:</span>
                      <span className="font-medium">₽{selectedPartner.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Рейтинг:</span>
                      <div className="flex items-center gap-1">
                        {renderStars(selectedPartner.rating)}
                        <span className="text-gray-600">({selectedPartner.rating})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Partner Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Добавить партнёра</h2>
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
                    placeholder="Имя партнёра"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Компания</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Компания партнёра"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Контактное лицо</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Контактное лицо"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Email партнёра"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  <input
                    type="tel"
                    className="input w-full"
                    placeholder="Телефон партнёра"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Сайт</label>
                  <input
                    type="url"
                    className="input w-full"
                    placeholder="Сайт компании"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Город</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Город партнёра"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Тип партнёрства</label>
                  <select className="input w-full">
                    <option>Технологический</option>
                    <option>Дизайн</option>
                    <option>Маркетинг</option>
                    <option>Сервис</option>
                    <option>Другое</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Адрес</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Адрес партнёра"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                  <select className="input w-full">
                    <option value="active">Активный</option>
                    <option value="inactive">Неактивный</option>
                    <option value="pending">На рассмотрении</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Теги</label>
                  <select className="input w-full" multiple>
                    <option>VIP</option>
                    <option>Технологии</option>
                    <option>Дизайн</option>
                    <option>Маркетинг</option>
                    <option>Новый</option>
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
                  Добавить партнёра
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
