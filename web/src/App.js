import './App.scss'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CreatePage, HomePage } from './pages'
import { Navigation } from './components/Navigation'
import { PostPage } from './pages/Post'
import { UserProvider } from './context/UserContext'

function App() {
    return (
        <UserProvider>
            <div className="app">
                <h1 className="app-name">Instagram</h1>
                <BrowserRouter>
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/create" component={CreatePage} />
                        <Route exact path="/:id" component={PostPage} />
                    </Switch>
                </BrowserRouter>
            </div>
        </UserProvider>
    )
}

export default App
