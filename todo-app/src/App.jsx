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

  const handleSubmit = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    setTasks(prev => [createTask(t), ...prev])
    setText('')
  }

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
          <button type='button' disabled>Все</button>
          <button type='button' disabled>Активные</button>
          <button type='button' disabled>Выполненные</button>
        </div>
        <div className='counter'>Всего: {tasks.length} • Активных: {activeCount}</div>
      </section>

      <ul className='todo-list' aria-live='polite' aria-label='Список задач'>
        {tasks.length === 0 ? 
        (<li className='empty'>Пока задач нет</li>) : tasks.map(t => (
          <li key={t.id} className="todo-item">
            <label>
              <input type="checkbox" checked={t.completed} readOnly />
              <span>{t.text}</span>
            </label>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
