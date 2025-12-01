import { useState } from 'react'
import { Search, Plus, Edit, Trash2, Eye, Phone, Mail, MapPin, Calendar, User, Briefcase } from 'lucide-react'

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  hireDate: string
  status: 'active' | 'inactive' | 'on-leave'
  salary: number
  projectsCount: number
  skills: string[]
  avatar?: string
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Александр Иванов',
    email: 'alexander@company.com',
    phone: '+7 (999) 123-45-67',
    position: 'Разработчик',
    department: 'IT',
    hireDate: '2023-03-15',
    status: 'active',
    salary: 120000,
    projectsCount: 8,
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB']
  },
  {
    id: '2',
    name: 'Марина Петрова',
    email: 'marina@company.com',
    phone: '+7 (999) 987-65-43',
    position: 'Дизайнер',
    department: 'Дизайн',
    hireDate: '2023-07-22',
    status: 'active',
    salary: 100000,
    projectsCount: 12,
    skills: ['Figma', 'Photoshop', 'Illustrator', 'UI/UX']
  },
  {
    id: '3',
    name: 'Дмитрий Сидоров',
    email: 'dmitry@company.com',
    phone: '+7 (999) 456-78-90',
    position: 'Менеджер проектов',
    department: 'Управление',
    hireDate: '2024-01-10',
    status: 'on-leave',
    salary: 150000,
    projectsCount: 5,
    skills: ['Agile', 'Scrum', 'Jira', 'Управление командой']
  },
  {
    id: '4',
    name: 'Елена Козлова',
    email: 'elena@company.com',
    phone: '+7 (999) 321-65-49',
    position: 'Маркетолог',
    department: 'Маркетинг',
    hireDate: '2024-05-18',
    status: 'active',
    salary: 95000,
    projectsCount: 7,
    skills: ['SMM', 'Контент-маркетинг', 'Google Analytics', 'SEO']
  },
  {
    id: '5',
    name: 'Игорь Волков',
    email: 'igor@company.com',
    phone: '+7 (999) 654-32-10',
    position: 'Тестировщик',
    department: 'IT',
    hireDate: '2024-09-01',
    status: 'inactive',
    salary: 80000,
    projectsCount: 3,
    skills: ['Manual Testing', 'Automation', 'Selenium', 'Jira']
  }
]

export default function Employees() {
  const [employees] = useState<Employee[]>(mockEmployees)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterDepartment, setFilterDepartment] = useState<string>('all')

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus
    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment
    
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee)
  }

  const handleCloseDetails = () => {
    setSelectedEmployee(null)
  }

  const handleCreateEmployee = () => {
    setShowCreateForm(true)
  }

  const handleCloseCreateForm = () => {
    setShowCreateForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'on-leave': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный'
      case 'inactive': return 'Уволен'
      case 'on-leave': return 'В отпуске'
      default: return status
    }
  }

  // Получение уникальных отделов
  const departments = Array.from(new Set(employees.map(emp => emp.department)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Сотрудники</h1>
          <p className="text-gray-500 mt-1">Управление персоналом</p>
        </div>
        <button 
          onClick={handleCreateEmployee}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Добавить сотрудника
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
                placeholder="Поиск по имени, email или должности..."
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
              <option value="inactive">Уволенные</option>
              <option value="on-leave">В отпуске</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Отдел</label>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="input"
            >
              <option value="all">Все отделы</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <button className="btn-primary flex items-center gap-2 mt-6">
            <Search size={18} />
            Фильтровать
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Сотрудник</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Должность</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Отдел</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Контакты</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Статус</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Проекты</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Зарплата</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Дата найма</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                        <User size={20} className="text-gray-500" />
                      </div>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{employee.position}</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {employee.department}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail size={14} />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone size={14} />
                        {employee.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                      {getStatusText(employee.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">{employee.projectsCount}</td>
                  <td className="py-3 px-4">₽{employee.salary.toLocaleString()}</td>
                  <td className="py-3 px-4">{employee.hireDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(employee)}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                        title="Просмотр"
                        aria-label={`Просмотр деталей сотрудника ${employee.name}`}
                      >
                        <Eye size={18} aria-hidden="true" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg"
                        title="Редактировать"
                        aria-label={`Редактировать сотрудника ${employee.name}`}
                      >
                        <Edit size={18} aria-hidden="true" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-lg"
                        title="Удалить"
                        aria-label={`Удалить сотрудника ${employee.name}`}
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

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Информация о сотруднике</h2>
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
                  <h3 className="text-xl font-semibold text-gray-900">{selectedEmployee.name}</h3>
                  <p className="text-gray-600">{selectedEmployee.position}</p>
                  <p className="text-gray-600">{selectedEmployee.department}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card">
                  <h4 className="font-medium text-gray-900 mb-2">Контактная информация</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={16} className="text-gray-500" />
                      <span>{selectedEmployee.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={16} className="text-gray-500" />
                      <span>{selectedEmployee.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <h4 className="font-medium text-gray-900 mb-2">Информация о работе</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Отдел:</span>
                      <span className="font-medium">{selectedEmployee.department}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Статус:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedEmployee.status)}`}>
                        {getStatusText(selectedEmployee.status)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Дата найма:</span>
                      <span>{selectedEmployee.hireDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Проектов:</span>
                      <span className="font-medium">{selectedEmployee.projectsCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Зарплата:</span>
                      <span className="font-medium">₽{selectedEmployee.salary.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h4 className="font-medium text-gray-900 mb-2">Навыки</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEmployee.skills.map((skill, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Employee Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Добавить сотрудника</h2>
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
                    placeholder="Имя сотрудника"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Email сотрудника"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  <input
                    type="tel"
                    className="input w-full"
                    placeholder="Телефон сотрудника"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Должность</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Должность сотрудника"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Отдел</label>
                  <select className="input w-full">
                    <option>IT</option>
                    <option>Дизайн</option>
                    <option>Управление</option>
                    <option>Маркетинг</option>
                    <option>Финансы</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Зарплата</label>
                  <input
                    type="number"
                    className="input w-full"
                    placeholder="Зарплата сотрудника"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Дата найма</label>
                  <input
                    type="date"
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                  <select className="input w-full">
                    <option value="active">Активный</option>
                    <option value="inactive">Уволен</option>
                    <option value="on-leave">В отпуске</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Навыки</label>
                <select className="input w-full" multiple>
                  <option>JavaScript</option>
                  <option>React</option>
                  <option>Node.js</option>
                  <option>Figma</option>
                  <option>Photoshop</option>
                  <option>UI/UX</option>
                  <option>Agile</option>
                  <option>Scrum</option>
                  <option>SMM</option>
                  <option>SEO</option>
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
                  Добавить сотрудника
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
