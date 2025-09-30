import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTaskAsync, toggleTaskAsync, deleteTaskAsync, fetchTasks } from './store/tasksSlice'
import { makeSelectVisibleTasks, selectActiveCount, selectTasks } from './store/selectors'
import { useTranslation } from 'react-i18next'
import './App.css'

function createTask(text) {
  return {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now()
  }
}

function App() {
  const { t, i18n } = useTranslation()

  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')

  const dispatch = useDispatch()
  const selectVisible = makeSelectVisibleTasks(filter)
  const tasks = useSelector(selectTasks)
  const visibleTasks = useSelector(state => selectVisible(state))
  const activeCount = useSelector(selectActiveCount)

  useEffect(() => { dispatch(fetchTasks()) }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    dispatch(addTaskAsync(t))
    setText('')
  }

  const toggleTask = (id) => {
    dispatch(taskToggled(id))
  }

  const deleteTask = (id) => {
    dispatch(taskDeleted(id))
  }

  return (
    <main className="app" style={{maxWidth: 720, margin: '40px auto', padding: 16}}>
      <h1>{t('title')}</h1>

      <div style={{display:'flex', gap:8}}>
        <button type="button" onClick={() => i18n.changeLanguage('ru')}>RU</button>
        <button type="button" onClick={() => i18n.changeLanguage('en')}>EN</button>
      </div>
      
      <form className='todo-form' onSubmit={handleSubmit} aria-label='Создание задачи'>

        <input 
          className="todo-input"
          type="text"
          placeholder={t('placeholder')}
          aria-label="Текст задачи"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="todo-add" type="submit">
          {t('add')}
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
              {f  === 'all' ? t('all') : f === 'active' ? t('active') : t('completed')}
            </button>
          ))}
        </div>
        <div className='counter'>{t('total')}: {tasks.length} • {t('active_count')}: {activeCount}</div>
      </section>

      <ul className='todo-list' aria-live='polite' aria-label='Список задач'>
        {visibleTasks.length === 0 ? 
        (<li className='empty'>Ничего не найдено</li>) : visibleTasks.map(t => (
          <li key={t.id} className={`todo-item ${t.completed ? 'completed' : ''}`}>
            <label>
              <input type="checkbox" checked={t.completed} onChange={() => dispatch(toggleTaskAsync(t.id))} />
              <span>{t.text}</span>
            </label>
            <button type='button' aria-label='Удалить' onClick={() => dispatch(deleteTaskAsync(t.id))}>×</button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
