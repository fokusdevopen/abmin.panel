import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, Calendar, Flag, Filter, List, Kanban } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignee: string
  creator: string
  createdAt: string
  updatedAt: string
  dueDate?: string
  project?: string
  tags: string[]
  comments: number
  attachments: number
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Создать макет главной страницы',
    description: 'Разработать новый макет главной страницы для корпоративного сайта',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Марина Петрова',
    creator: 'Александр Иванов',
    createdAt: '2025-11-28',
    updatedAt: '2025-12-01',
    dueDate: '2025-12-05',
    project: 'Разработка корпоративного сайта',
    tags: ['Дизайн', 'UI'],
    comments: 5,
    attachments: 2
  },
  {
    id: '2',
    title: 'Настроить CI/CD пайплайн',
    description: 'Настроить автоматическую сборку и деплой приложения',
    status: 'todo',
    priority: 'critical',
    assignee: 'Александр Иванов',
    creator: 'Дмитрий Сидоров',
    createdAt: '2025-11-30',
    updatedAt: '2025-12-01',
    dueDate: '2025-12-03',
    project: 'Мобильное приложение для доставки',
    tags: ['DevOps', 'Backend'],
    comments: 2,
    attachments: 0
  },
  {
    id: '3',
    title: 'Исправить баг с авторизацией',
    description: 'Пользователи не могут войти в систему после обновления',
    status: 'review',
    priority: 'critical',
    assignee: 'Игорь Волков',
    creator: 'Елена Козлова',
    createdAt: '2025-11-29',
    updatedAt: '2025-12-01',
    dueDate: '2025-12-02',
    project: 'Редизайн e-commerce платформы',
    tags: ['Bug', 'Auth'],
    comments: 8,
    attachments: 1
  },
  {
    id: '4',
    title: 'Написать документацию по API',
    description: 'Создать полную документацию по REST API для мобильного приложения',
    status: 'done',
    priority: 'medium',
    assignee: 'Дмитрий Сидоров',
    creator: 'Марина Петрова',
    createdAt: '2025-11-25',
    updatedAt: '2025-11-30',
    dueDate: '2025-11-30',
    project: 'Мобильное приложение для доставки',
    tags: ['Documentation', 'API'],
    comments: 3,
    attachments: 1
  },
  {
    id: '5',
    title: 'Провести тестирование нового функционала',
    description: 'Провести полное тестирование нового функционала e-commerce платформы',
    status: 'backlog',
    priority: 'medium',
    assignee: 'Елена Козлова',
    creator: 'Дмитрий Сидоров',
    createdAt: '2025-11-20',
    updatedAt: '2025-11-20',
    project: 'Редизайн e-commerce платформы',
    tags: ['Testing', 'QA'],
    comments: 0,
    attachments: 0
  }
]

export default function Tasks() {
  const [tasks] = useState<Task[]>(mockTasks)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [filterAssignee, setFilterAssignee] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list')
  
  // Получение уникальных исполнителей
  const assignees = Array.from(new Set(tasks.map(task => task.assignee)))

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    const matchesAssignee = filterAssignee === 'all' || task.assignee === filterAssignee
    
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
  })

  // Группировка задач по статусам для канбан-доски
  const tasksByStatus = {
    backlog: filteredTasks.filter(task => task.status === 'backlog'),
    todo: filteredTasks.filter(task => task.status === 'todo'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    review: filteredTasks.filter(task => task.status === 'review'),
    done: filteredTasks.filter(task => task.status === 'done')
  }

  const handleViewDetails = (task: Task) => {
    setSelectedTask(task)
  }

  const handleCloseDetails = () => {
    setSelectedTask(null)
  }

  const handleCreateTask = () => {
    setShowCreateForm(true)
  }

  const handleCloseCreateForm = () => {
    setShowCreateForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'backlog': return 'bg-gray-100 text-gray-800'
      case 'todo': return 'bg-blue-100 text-blue-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'review': return 'bg-purple-100 text-purple-800'
      case 'done': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'backlog': return 'Бэклог'
      case 'todo': return 'К выполнению'
      case 'in-progress': return 'В работе'
      case 'review': return 'На проверке'
      case 'done': return 'Готово'
      default: return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-500'
      case 'medium': return 'text-blue-500'
      case 'high': return 'text-yellow-500'
      case 'critical': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getPriorityIcon = (priority: string) => {
    const color = getPriorityColor(priority)
    return <Flag size={16} className={color} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Задачи</h1>
          <p className="text-gray-500 mt-1">Управление задачами и проектами</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Список"
          >
            <List size={20} />
          </button>
          <button 
            onClick={() => setViewMode('board')}
            className={`p-2 rounded-lg ${viewMode === 'board' ? 'bg-primary-100 text-primary-600' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Канбан"
          >
            <Kanban size={20} />
          </button>
          <button 
            onClick={handleCreateTask}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            Создать задачу
          </button>
        </div>
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
                placeholder="Поиск по названию, описанию или проекту..."
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
              <option value="backlog">Бэклог</option>
              <option value="todo">К выполнению</option>
              <option value="in-progress">В работе</option>
              <option value="review">На проверке</option>
              <option value="done">Готово</option>
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
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Исполнитель</label>
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="input"
            >
              <option value="all">Все исполнители</option>
              {assignees.map((assignee, index) => (
                <option key={index} value={assignee}>{assignee}</option>
              ))}
            </select>
          </div>
          
          <button className="btn-primary flex items-center gap-2 mt-6">
            <Filter size={18} />
            Фильтровать
          </button>
        </div>
      </div>

      {/* Tasks List View */}
      {viewMode === 'list' && (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Задача</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Проект</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Статус</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Приоритет</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Исполнитель</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Срок</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-1">{task.description}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {task.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{task.project}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusText(task.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {getPriorityIcon(task.priority)}
                        <span className="text-sm capitalize">{task.priority}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 text-xs font-semibold">
                            {task.assignee.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm">{task.assignee}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar size={16} className="text-gray-500" />
                        <span>{task.dueDate || 'Не указан'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(task)}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                          title="Просмотр"
                          aria-label={`Просмотр деталей задачи ${task.title}`}
                        >
                          <Eye size={18} aria-hidden="true" />
                        </button>
                        <button
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                          title="Редактировать"
                          aria-label={`Редактировать задачу ${task.title}`}
                        >
                          <Edit size={18} aria-hidden="true" />
                        </button>
                        <button
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-lg"
                          title="Удалить"
                          aria-label={`Удалить задачу ${task.title}`}
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
      )}

      {/* Tasks Board View */}
      {viewMode === 'board' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
            <div key={status} className="card">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${getStatusColor(status).split(' ')[0]}`}></span>
                {getStatusText(status)} ({statusTasks.length})
              </h3>
              <div className="space-y-3">
                {statusTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleViewDetails(task)}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <div className="flex items-center gap-1">
                        {getPriorityIcon(task.priority)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {task.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {task.tags.length > 2 && (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                          +{task.tags.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-600 text-xs font-semibold">
                            {task.assignee.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{task.assignee.split(' ')[0]}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{task.comments}</span>
                        <span>{task.attachments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Информация о задаче</h2>
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
                <h3 className="text-xl font-semibold text-gray-900">{selectedTask.title}</h3>
                <p className="text-gray-600 mt-2">{selectedTask.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedTask.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card">
                  <h4 className="font-medium text-gray-900 mb-2">Информация о задаче</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Статус:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTask.status)}`}>
                        {getStatusText(selectedTask.status)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Приоритет:</span>
                      <div className="flex items-center gap-1">
                        {getPriorityIcon(selectedTask.priority)}
                        <span className="capitalize">{selectedTask.priority}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Проект:</span>
                      <span>{selectedTask.project}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Срок:</span>
                      <span>{selectedTask.dueDate || 'Не указан'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <h4 className="font-medium text-gray-900 mb-2">Участники</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">
                          {selectedTask.assignee.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Исполнитель</p>
                        <p className="text-sm text-gray-600">{selectedTask.assignee}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-semibold">
                          {selectedTask.creator.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Автор</p>
                        <p className="text-sm text-gray-600">{selectedTask.creator}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h4 className="font-medium text-gray-900 mb-2">Даты</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Создана</p>
                    <p className="text-sm font-medium">{selectedTask.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Обновлена</p>
                    <p className="text-sm font-medium">{selectedTask.updatedAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Создать задачу</h2>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Название задачи</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Введите название задачи"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea
                  className="input w-full"
                  placeholder="Введите описание задачи"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Проект</label>
                  <select className="input w-full">
                    <option>Разработка корпоративного сайта</option>
                    <option>Мобильное приложение для доставки</option>
                    <option>Редизайн e-commerce платформы</option>
                    <option>Интеграция CRM системы</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                  <select className="input w-full">
                    <option value="backlog">Бэклог</option>
                    <option value="todo">К выполнению</option>
                    <option value="in-progress">В работе</option>
                    <option value="review">На проверке</option>
                    <option value="done">Готово</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Приоритет</label>
                  <select className="input w-full">
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                    <option value="critical">Критический</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Срок выполнения</label>
                  <input
                    type="date"
                    className="input w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Исполнитель</label>
                <select className="input w-full">
                  <option>Александр Иванов</option>
                  <option>Марина Петрова</option>
                  <option>Дмитрий Сидоров</option>
                  <option>Елена Козлова</option>
                  <option>Игорь Волков</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Теги</label>
                <select className="input w-full" multiple>
                  <option>Дизайн</option>
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>DevOps</option>
                  <option>Тестирование</option>
                  <option>Документация</option>
                  <option>Bug</option>
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
                  Создать задачу
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
