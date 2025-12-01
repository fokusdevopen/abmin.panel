import { useState } from 'react'
import { Search, Plus, Eye, User, CheckSquare } from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'critical'
  startDate: string
  endDate: string
  progress: number
  manager: string
  team: string[]
  tasksCount: number
  completedTasks: number
  budget: number
  spent: number
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Разработка корпоративного сайта',
    description: 'Создание нового корпоративного сайта для компании "ТехноЛид"',
    status: 'in-progress',
    priority: 'high',
    startDate: '2025-11-01',
    endDate: '2026-01-31',
    progress: 65,
    manager: 'Александр Иванов',
    team: ['Марина Петрова', 'Дмитрий Сидоров', 'Елена Козлова'],
    tasksCount: 45,
    completedTasks: 29,
    budget: 1500000,
    spent: 980000
  },
  {
    id: '2',
    name: 'Мобильное приложение для доставки',
    description: 'Разработка мобильного приложения для сервиса доставки еды',
    status: 'planning',
    priority: 'critical',
    startDate: '2025-12-15',
    endDate: '2026-04-30',
    progress: 0,
    manager: 'Марина Петрова',
    team: ['Александр Иванов', 'Игорь Волков'],
    tasksCount: 120,
    completedTasks: 0,
    budget: 3200000,
    spent: 0
  },
  {
    id: '3',
    name: 'Редизайн e-commerce платформы',
    description: 'Полный редизайн существующей платформы электронной коммерции',
    status: 'completed',
    priority: 'medium',
    startDate: '2025-06-01',
    endDate: '2025-11-15',
    progress: 100,
    manager: 'Дмитрий Сидоров',
    team: ['Елена Козлова', 'Игорь Волков'],
    tasksCount: 78,
    completedTasks: 78,
    budget: 2100000,
    spent: 1950000
  },
  {
    id: '4',
    name: 'Интеграция CRM системы',
    description: 'Интеграция новой CRM системы с существующими бизнес-процессами',
    status: 'on-hold',
    priority: 'medium',
    startDate: '2025-09-10',
    endDate: '2026-02-28',
    progress: 30,
    manager: 'Елена Козлова',
    team: ['Александр Иванов', 'Марина Петрова'],
    tasksCount: 32,
    completedTasks: 10,
    budget: 850000,
    spent: 280000
  }
]

export default function Projects() {
  const [projects] = useState<Project[]>(mockProjects)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.manager.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus
    const matchesPriority = filterPriority === 'all' || project.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
  }

  const handleCloseDetails = () => {
    setSelectedProject(null)
  }

  const handleCreateProject = () => {
    setShowCreateForm(true)
  }

  const handleCloseCreateForm = () => {
    setShowCreateForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'on-hold': return 'bg-gray-100 text-gray-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planning': return 'Планирование'
      case 'in-progress': return 'В работе'
      case 'on-hold': return 'На паузе'
      case 'completed': return 'Завершён'
      case 'cancelled': return 'Отменён'
      default: return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-blue-100 text-blue-800'
      case 'high': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low': return 'Низкий'
      case 'medium': return 'Средний'
      case 'high': return 'Высокий'
      case 'critical': return 'Критический'
      default: return priority
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Проекты</h1>
          <p className="text-gray-500 mt-1">Управление проектами и задачами</p>
        </div>
        <button 
          onClick={handleCreateProject}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Создать проект
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
                placeholder="Поиск по названию, описанию или менеджеру..."
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
              <option value="planning">Планирование</option>
              <option value="in-progress">В работе</option>
              <option value="on-hold">На паузе</option>
              <option value="completed">Завершён</option>
              <option value="cancelled">Отменён</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Приоритет</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="input"
            >
              <option value="all">Все приоритеты</option>
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
              <option value="critical">Критический</option>
            </select>
          </div>
          
          <button className="btn-primary flex items-center gap-2 mt-6">
            <Search size={18} />
            Фильтровать
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
              </div>
              <button
                onClick={() => handleViewDetails(project)}
                className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg ml-2"
                title="Просмотр"
                aria-label={`Просмотр деталей проекта ${project.name}`}
              >
                <Eye size={18} aria-hidden="true" />
              </button>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Статус</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Приоритет</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                  {getPriorityText(project.priority)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Прогресс</span>
                <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-500">
                  <CheckSquare size={16} />
                  <span>{project.completedTasks}/{project.tasksCount}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <User size={16} />
                  <span>{project.team.length}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Бюджет</span>
                <span className="font-medium">₽{project.spent.toLocaleString()}/₽{project.budget.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Сроки</span>
                <span>{project.startDate} - {project.endDate}</span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 text-xs font-semibold">
                    {project.manager.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-sm text-gray-600">{project.manager}</span>
              </div>
              <div className="flex gap-1">
                {project.team.slice(0, 3).map((member, index) => (
                  <div key={index} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 text-xs">{member.split(' ')[0][0]}</span>
                  </div>
                ))}
                {project.team.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 text-xs">+{project.team.length - 3}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Информация о проекте</h2>
              <button
                onClick={handleCloseDetails}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedProject.name}</h3>
                <p className="text-gray-600 mt-2">{selectedProject.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h4 className="font-medium text-gray-900 mb-3">Основная информация</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Статус</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProject.status)}`}>
                        {getStatusText(selectedProject.status)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Приоритет</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedProject.priority)}`}>
                        {getPriorityText(selectedProject.priority)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Прогресс</span>
                      <span className="font-medium">{selectedProject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${selectedProject.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Задачи</span>
                      <span>{selectedProject.completedTasks}/{selectedProject.tasksCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Бюджет</span>
                      <span>₽{selectedProject.spent.toLocaleString()}/₽{selectedProject.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <h4 className="font-medium text-gray-900 mb-3">Сроки</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Дата начала</span>
                      <span>{selectedProject.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Дата окончания</span>
                      <span>{selectedProject.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Менеджер</span>
                      <span>{selectedProject.manager}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h4 className="font-medium text-gray-900 mb-3">Команда</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.team.map((member, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 text-sm font-semibold">
                          {member.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm">{member}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Создать проект</h2>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Название проекта</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Введите название проекта"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea
                  className="input w-full"
                  placeholder="Введите описание проекта"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                  <select className="input w-full">
                    <option value="planning">Планирование</option>
                    <option value="in-progress">В работе</option>
                    <option value="on-hold">На паузе</option>
                    <option value="completed">Завершён</option>
                    <option value="cancelled">Отменён</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Приоритет</label>
                  <select className="input w-full">
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                    <option value="critical">Критический</option>
                  </select>
                </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Бюджет (₽)</label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Введите бюджет проекта"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Менеджер проекта</label>
                <select className="input w-full">
                  <option>Александр Иванов</option>
                  <option>Марина Петрова</option>
                  <option>Дмитрий Сидоров</option>
                  <option>Елена Козлова</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Команда</label>
                <select className="input w-full" multiple>
                  <option>Александр Иванов</option>
                  <option>Марина Петрова</option>
                  <option>Дмитрий Сидоров</option>
                  <option>Елена Козлова</option>
                  <option>Игорь Волков</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={handleCloseCreateForm}
                  className="btn-secondary"
                >
                  Отмена
                </button>
                <button className="btn-primary">
                  Создать проект
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
