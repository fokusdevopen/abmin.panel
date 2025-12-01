import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react'

interface Promotion {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  platforms: string[]
  clients: string[]
  products: string[]
  usageCount: number
  maxUsage: number | null
  discountType: 'percentage' | 'fixed'
  discountValue: number
  isActive: boolean
}

const mockPromotions: Promotion[] = [
  {
    id: '1',
    name: 'Летняя распродажа',
    description: 'Скидка на все услуги до конца лета',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    platforms: ['Сайт', 'Мобильное приложение'],
    clients: ['VIP', 'Корпоративные'],
    products: ['Разработка', 'Дизайн'],
    usageCount: 124,
    maxUsage: 500,
    discountType: 'percentage',
    discountValue: 25,
    isActive: true
  },
  {
    id: '2',
    name: 'Скидка для новых клиентов',
    description: 'Специальное предложение для новых клиентов',
    startDate: '2025-12-01',
    endDate: '2026-06-01',
    platforms: ['Сайт'],
    clients: ['Новые'],
    products: ['Все'],
    usageCount: 67,
    maxUsage: null,
    discountType: 'percentage',
    discountValue: 15,
    isActive: true
  },
  {
    id: '3',
    name: 'Новогодняя акция',
    description: 'Специальные цены на праздничные услуги',
    startDate: '2025-12-20',
    endDate: '2026-01-15',
    platforms: ['Сайт', 'Мобильное приложение', 'Офис'],
    clients: ['Все'],
    products: ['Все'],
    usageCount: 0,
    maxUsage: 200,
    discountType: 'fixed',
    discountValue: 5000,
    isActive: false
  }
]

export default function Promotions() {
  const [promotions] = useState<Promotion[]>(mockPromotions)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filteredPromotions = promotions.filter(promo => 
    promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promo.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewDetails = (promotion: Promotion) => {
    setSelectedPromotion(promotion)
  }

  const handleCloseDetails = () => {
    setSelectedPromotion(null)
  }

  const handleCreatePromotion = () => {
    setShowCreateForm(true)
  }

  const handleCloseCreateForm = () => {
    setShowCreateForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Акции</h1>
          <p className="text-gray-500 mt-1">Управление акциями и специальными предложениями</p>
        </div>
        <button 
          onClick={handleCreatePromotion}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Создать акцию
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="flex items-center gap-3">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Поиск по названию или описанию акции..."
            className="input flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Promotions Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Название</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Описание</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Срок действия</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Статус</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Использовано</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredPromotions.map((promo) => (
                <tr key={promo.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{promo.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">{promo.description}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={16} />
                      {promo.startDate} - {promo.endDate}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      promo.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {promo.isActive ? 'Активна' : 'Не активна'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm">
                      {promo.usageCount}{promo.maxUsage ? `/${promo.maxUsage}` : ''}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(promo)}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                        title="Просмотр"
                        aria-label={`Просмотр деталей акции ${promo.name}`}
                      >
                        <Eye size={18} aria-hidden="true" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                        title="Редактировать"
                        aria-label={`Редактировать акцию ${promo.name}`}
                      >
                        <Edit size={18} aria-hidden="true" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-lg"
                        title="Удалить"
                        aria-label={`Удалить акцию ${promo.name}`}
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

      {/* Promotion Details Modal */}
      {selectedPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Информация об акции</h2>
              <button
                onClick={handleCloseDetails}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedPromotion.name}</h3>
                <p className="text-gray-600 mt-1">{selectedPromotion.description}</p>
                <div className="mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedPromotion.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedPromotion.isActive ? 'Активна' : 'Не активна'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card">
                  <h4 className="font-medium text-gray-900 mb-2">Срок действия</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>{selectedPromotion.startDate} - {selectedPromotion.endDate}</span>
                  </div>
                </div>
                
                <div className="card">
                  <h4 className="font-medium text-gray-900 mb-2">Использование</h4>
                  <p className="text-sm text-gray-600">
                    {selectedPromotion.usageCount} раз использован{selectedPromotion.maxUsage ? ` из ${selectedPromotion.maxUsage}` : ''}
                  </p>
                </div>
              </div>
              
              <div className="card">
                <h4 className="font-medium text-gray-900 mb-2">Скидка</h4>
                <p className="text-sm text-gray-600">
                  {selectedPromotion.discountType === 'percentage' 
                    ? `${selectedPromotion.discountValue}%` 
                    : `₽${selectedPromotion.discountValue}`}
                </p>
              </div>
              
              <div className="card">
                <h4 className="font-medium text-gray-900 mb-2">Площадки</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPromotion.platforms.map((platform, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="card">
                <h4 className="font-medium text-gray-900 mb-2">Клиенты</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPromotion.clients.map((client, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {client}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="card">
                <h4 className="font-medium text-gray-900 mb-2">Продукты</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPromotion.products.map((product, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Promotion Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Создать акцию</h2>
              <button
                onClick={handleCloseCreateForm}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Название акции"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea
                  className="input w-full"
                  placeholder="Описание акции"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Дата начала</label>
                  <input
                    type="date"
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Дата окончания</label>
                  <input
                    type="date"
                    className="input w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Площадки</label>
                <select className="input w-full" multiple>
                  <option>Сайт</option>
                  <option>Мобильное приложение</option>
                  <option>Офис</option>
                  <option>Все</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Клиенты</label>
                <select className="input w-full" multiple>
                  <option>VIP</option>
                  <option>Корпоративные</option>
                  <option>Новые</option>
                  <option>Все</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Продукты</label>
                <select className="input w-full" multiple>
                  <option>Разработка</option>
                  <option>Дизайн</option>
                  <option>SEO</option>
                  <option>Все</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Тип скидки</label>
                  <select className="input w-full">
                    <option>Процент</option>
                    <option>Фиксированная сумма</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Значение скидки</label>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="Значение скидки"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Максимальное количество использований (опционально)</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Оставьте пустым для неограниченного количества"
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={handleCloseCreateForm}
                  className="btn-secondary"
                >
                  Отмена
                </button>
                <button className="btn-primary">
                  Создать акцию
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
