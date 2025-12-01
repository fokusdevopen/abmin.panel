import { useState } from 'react'
import {
  User,
  Bell,
  Shield,
  Palette,
  Mail,
  Save,
  RotateCcw
} from 'lucide-react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  })
  const [profile, setProfile] = useState({
    name: 'Администратор',
    email: 'admin@fokus.ru',
    language: 'ru',
    timezone: 'Europe/Moscow'
  })
  const [security, setSecurity] = useState({
    twoFactor: false,
    passwordAge: 90
  })

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
    // Здесь можно добавить логику для применения темы
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
  }

  const handleSave = () => {
    // Логика сохранения настроек
    alert('Настройки сохранены')
  }

  const handleReset = () => {
    // Логика сброса настроек
    setTheme('light')
    setNotifications({
      email: true,
      push: true,
      sms: false
    })
    setProfile({
      name: 'Администратор',
      email: 'admin@fokus.ru',
      language: 'ru',
      timezone: 'Europe/Moscow'
    })
    setSecurity({
      twoFactor: false,
      passwordAge: 90
    })
    alert('Настройки сброшены к значениям по умолчанию')
  }

  const tabs = [
    { id: 'general', label: 'Общие', icon: User },
    { id: 'notifications', label: 'Уведомления', icon: Bell },
    { id: 'security', label: 'Безопасность', icon: Shield },
    { id: 'appearance', label: 'Внешний вид', icon: Palette }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Настройки</h1>
        <p className="text-gray-500 mt-1">Управление настройками системы</p>
      </div>

      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="py-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Общие настройки</h3>
                <p className="text-gray-500 mt-1">Управление основной информацией профиля</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Язык</label>
                  <select
                    className="input w-full"
                    value={profile.language}
                    onChange={(e) => setProfile({...profile, language: e.target.value})}
                  >
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Часовой пояс</label>
                  <select
                    className="input w-full"
                    value={profile.timezone}
                    onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                  >
                    <option value="Europe/Moscow">Москва (GMT+3)</option>
                    <option value="Asia/Yekaterinburg">Екатеринбург (GMT+5)</option>
                    <option value="Asia/Novosibirsk">Новосибирск (GMT+7)</option>
                    <option value="Asia/Vladivostok">Владивосток (GMT+10)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Настройки уведомлений</h3>
                <p className="text-gray-500 mt-1">Управление способами получения уведомлений</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="text-gray-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Email уведомления</p>
                      <p className="text-sm text-gray-500">Получать уведомления на email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications.email}
                      onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="text-gray-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Push уведомления</p>
                      <p className="text-sm text-gray-500">Получать push-уведомления</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications.push}
                      onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="text-gray-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">SMS уведомления</p>
                      <p className="text-sm text-gray-500">Получать уведомления по SMS</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications.sms}
                      onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Настройки безопасности</h3>
                <p className="text-gray-500 mt-1">Управление параметрами безопасности аккаунта</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="text-gray-500" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Двухфакторная аутентификация</p>
                      <p className="text-sm text-gray-500">Добавить дополнительный уровень безопасности</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={security.twoFactor}
                      onChange={(e) => setSecurity({...security, twoFactor: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Срок действия пароля (дней)</label>
                  <input
                    type="number"
                    className="input w-full"
                    value={security.passwordAge}
                    onChange={(e) => setSecurity({...security, passwordAge: parseInt(e.target.value)})}
                  />
                  <p className="text-sm text-gray-500 mt-1">Через сколько дней потребуется сменить пароль</p>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Настройки внешнего вида</h3>
                <p className="text-gray-500 mt-1">Управление темой и оформлением интерфейса</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary-300 transition-colors"
                     onClick={() => handleThemeChange('light')}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border ${theme === 'light' ? 'border-primary-600 bg-primary-600' : 'border-gray-300'}`}>
                      {theme === 'light' && <div className="w-3 h-3 rounded-full bg-white mx-auto mt-1"></div>}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Светлая тема</p>
                      <p className="text-sm text-gray-500">Классическая светлая тема</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white rounded"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-white rounded mb-2 w-3/4"></div>
                        <div className="h-2 bg-white rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary-300 transition-colors"
                     onClick={() => handleThemeChange('dark')}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border ${theme === 'dark' ? 'border-primary-600 bg-primary-600' : 'border-gray-300'}`}>
                      {theme === 'dark' && <div className="w-3 h-3 rounded-full bg-white mx-auto mt-1"></div>}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Тёмная тема</p>
                      <p className="text-sm text-gray-500">Комфортная тёмная тема</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-600 rounded"></div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-600 rounded mb-2 w-3/4"></div>
                        <div className="h-2 bg-gray-600 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleReset}
          className="btn-secondary flex items-center gap-2"
        >
          <RotateCcw size={18} />
          Сбросить
        </button>
        <button
          onClick={handleSave}
          className="btn-primary flex items-center gap-2"
        >
          <Save size={18} />
          Сохранить
        </button>
      </div>
    </div>
  )
}
