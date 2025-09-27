import './App.css'

function App() {

  return (
    <main className="app" style={{maxWidth: 720, margin: '40px auto', padding: 16}}>
      <h1>ToDo</h1>
      
      <form className='todo-form' aria-label='Создание задачи'>
        <input 
          className="todo-input"
          type="text"
          placeholder="Новая задача..."
          aria-label="Текст задачи"
        />
        <button className='todo-add' type='submit' disabled>
          Добавить
        </button>
      </form>

      <section className='todo-controls' aria-label='Фильтры и счетчик'>
        <div className='filters'>
          <button type='button' disabled>Все</button>
          <button type='button' disabled>Активные</button>
          <button type='button' disabled>Выполненные</button>
        </div>
        <div className='counter'>Всего: 0 • Активных: 0</div>
      </section>

      <ul className='todo-list' aria-live='polite' aria-label='Список задач'>
        <li className='empty'>Пока задач нет</li>
      </ul>
    </main>
  )
}

export default App
