import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Ticket, 
  Tag, 
  Users, 
  Network, 
  UserCog, 
  FolderKanban, 
  CheckSquare, 
  Settings,
  Menu,
  X
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Дашборд' },
  { path: '/promocodes', icon: Ticket, label: 'Промокоды' },
  { path: '/promotions', icon: Tag, label: 'Акции' },
  { path: '/clients', icon: Users, label: 'Клиенты' },
  { path: '/partners', icon: Network, label: 'Партнёры' },
  { path: '/employees', icon: UserCog, label: 'Сотрудники' },
  { path: '/projects', icon: FolderKanban, label: 'Проекты' },
  { path: '/tasks', icon: CheckSquare, label: 'Задачи' },
  { path: '/settings', icon: Settings, label: 'Настройки' },
]

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary-600">Админка FOKUS</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } transition-transform duration-300 ease-in-out lg:transition-none flex flex-col`}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200 hidden lg:block">
              <h1 className="text-2xl font-bold text-primary-600">Админка FOKUS</h1>
              <p className="text-sm text-gray-500 mt-1">Цифровое Агентство</p>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon size={20} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">А</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Администратор</p>
                  <p className="text-xs text-gray-500">admin@fokus.ru</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 lg:ml-0 min-h-screen flex flex-col">
          <div className="flex-1 p-4 lg:p-8">
            {children}
          </div>
          
          {/* Footer */}
          <footer className="border-t border-gray-200 bg-white px-4 lg:px-8 py-4 mt-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-500">
              <div>
                <p>Версия 1.0.1</p>
              </div>
              <div>
                <p>Деятельность компании "Цифровое агентство FOKUS" с 2026 года</p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
