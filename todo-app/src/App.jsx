import { useState } from 'react'
import './App.css'

function createTask(text) {
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createAt: Date.now()
  }
}

function App() {
  const [text, setText] = useState('')
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  const handleSubmit = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    setTasks(prev => [createTask(t), ...prev])
    setText('')
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? {...t, completed: !t.completed} : t))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const visibleTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = tasks.filter(t => !t.completed).length

  return (
    <main className="app" style={{maxWidth: 720, margin: '40px auto', padding: 16}}>
      <h1>ToDo</h1>
      
      <form className='todo-form' onSubmit={handleSubmit} aria-label='Создание задачи'>
        <input 
          className="todo-input"
          type="text"
          placeholder="Новая задача..."
          aria-label="Текст задачи"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="todo-add" type="submit">
          Добавить
        </button>
      </form>

      <section className='todo-controls' aria-label='Фильтры и счетчик'>
        <div className='filters'>
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              type='button'
              className={filter === f ? 'is-active' : ''}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f  === 'all' ? 'Все' : f === 'active' ? 'Активные' : 'Выполненные'}
            </button>
          ))
          }
        </div>
        <div className='counter'>Всего: {tasks.length} • Активных: {activeCount}</div>
      </section>

      <ul className='todo-list' aria-live='polite' aria-label='Список задач'>
        {visibleTasks.length === 0 ? 
        (<li className='empty'>Ничего не найдено</li>) : visibleTasks.map(t => (
          <li key={t.id} className="todo-item">
            <label>
              <input type="checkbox" checked={t.completed} onChange={() => toggleTask(t.id)} />
              <span>{t.text}</span>
            </label>
            <button type='button' aria-label='Удалить' onClick={() => deleteTask(t.id)}>x</button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
