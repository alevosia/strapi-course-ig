import './App.scss'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CreatePage, HomePage } from './pages'
import { Navigation } from './components/Navigation'

function App() {
    return (
        <div className="app">
            <h1 className="app-name">Instagram</h1>
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/create" component={CreatePage} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
