import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, Calendar, MapPin, User, Package } from 'lucide-react'

interface PromoCode {
  id: string
  name: string
  code: string
  startDate: string
  endDate: string
  platforms: string[]
  clients: string[]
  products: string[]
  usageCount: number
  maxUsage: number | null
  discountType: 'percentage' | 'fixed'
  discountValue: number
}

const mockPromoCodes: PromoCode[] = [
  {
    id: '1',
    name: 'Новый Год 2026',
    code: 'NY2026',
    startDate: '2025-12-01',
    endDate: '2026-01-15',
    platforms: ['Сайт', 'Мобильное приложение'],
    clients: ['VIP', 'Корпоративные'],
    products: ['Разработка', 'Дизайн'],
    usageCount: 45,
    maxUsage: 100,
    discountType: 'percentage',
    discountValue: 20
  },
  {
    id: '2',
    name: 'Скидка для новых клиентов',
    code: 'NEWCLIENT15',
    startDate: '2025-12-01',
    endDate: '2026-06-01',
    platforms: ['Сайт'],
    clients: ['Новые'],
    products: ['Все'],
    usageCount: 12,
    maxUsage: null,
    discountType: 'percentage',
    discountValue: 15
  }
]

export default function PromoCodes() {
  const [promoCodes] = useState<PromoCode[]>(mockPromoCodes)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPromoCode, setSelectedPromoCode] = useState<PromoCode | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filteredPromoCodes = promoCodes.filter(promo => 
    promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promo.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewDetails = (promoCode: PromoCode) => {
    setSelectedPromoCode(promoCode)
  }

  const handleCloseDetails = () => {
    setSelectedPromoCode(null)
  }

  const handleCreatePromoCode = () => {
    setShowCreateForm(true)
  }

  const handleCloseCreateForm = () => {
    setShowCreateForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Промокоды</h1>
          <p className="text-gray-500 mt-1">Управление промокодами и скидками</p>
        </div>
        <button 
          onClick={handleCreatePromoCode}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Создать промокод
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="flex items-center gap-3">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Поиск по названию или коду промокода..."
            className="input flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Promo Codes Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Название</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Код</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Срок действия</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Использовано</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredPromoCodes.map((promo) => (
                <tr key={promo.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{promo.name}</td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{promo.code}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={16} />
                      {promo.startDate} - {promo.endDate}
                    </div>
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
                        aria-label={`Просмотр деталей промокода ${promo.name}`}
                      >
                        <Eye size={18} aria-hidden="true" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                        title="Редактировать"
                        aria-label={`Редактировать промокод ${promo.name}`}
                      >
                        <Edit size={18} aria-hidden="true" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-lg"
                        title="Удалить"
                        aria-label={`Удалить промокод ${promo.name}`}
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

      {/* Promo Code Details Modal */}
      {selectedPromoCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Информация о промокоде</h2>
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
                <h3 className="text-lg font-semibold text-gray-900">{selectedPromoCode.name}</h3>
                <p className="text-gray-500">Код: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{selectedPromoCode.code}</span></p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card">
                  <h4 className="font-medium text-gray-900 mb-2">Срок действия</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>{selectedPromoCode.startDate} - {selectedPromoCode.endDate}</span>
                  </div>
                </div>
                
                <div className="card">
                  <h4 className="font-medium text-gray-900 mb-2">Использование</h4>
                  <p className="text-sm text-gray-600">
                    {selectedPromoCode.usageCount} раз использован{selectedPromoCode.maxUsage ? ` из ${selectedPromoCode.maxUsage}` : ''}
                  </p>
                </div>
              </div>
              
              <div className="card">
                <h4 className="font-medium text-gray-900 mb-2">Площадки</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPromoCode.platforms.map((platform, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="card">
                <h4 className="font-medium text-gray-900 mb-2">Клиенты</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPromoCode.clients.map((client, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {client}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="card">
                <h4 className="font-medium text-gray-900 mb-2">Продукты</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPromoCode.products.map((product, index) => (
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

      {/* Create Promo Code Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Создать промокод</h2>
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
                  placeholder="Название промокода"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Код</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Код промокода"
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
                <select className="input w-full">
                  <option>Выберите площадки</option>
                  <option>Сайт</option>
                  <option>Мобильное приложение</option>
                  <option>Все</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Клиенты</label>
                <select className="input w-full">
                  <option>Выберите типы клиентов</option>
                  <option>VIP</option>
                  <option>Корпоративные</option>
                  <option>Новые</option>
                  <option>Все</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Продукты</label>
                <select className="input w-full">
                  <option>Выберите продукты</option>
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
                  Создать промокод
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
