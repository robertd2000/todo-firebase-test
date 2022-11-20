import './App.css'
import { AppRouter } from './components/AppRouter'
import Navigation from './components/Navigation'

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="todo__wrapper">
        <AppRouter />
      </div>
    </div>
  )
}

export default App
