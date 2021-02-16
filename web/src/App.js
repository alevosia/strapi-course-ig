import './App.scss'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CreatePage, HomePage, AuthPage, PostPage } from './pages'
import { Navigation } from './components/Navigation'
import { AuthProvider } from './context/AuthContext'

function App() {
    return (
        <AuthProvider>
            <div className="app">
                <h1 className="app-name">Instagram</h1>
                <BrowserRouter>
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/create" component={CreatePage} />
                        <Route exact path="/auth" component={AuthPage} />
                        <Route exact path="/:id" component={PostPage} />
                    </Switch>
                </BrowserRouter>
            </div>
        </AuthProvider>
    )
}

export default App
