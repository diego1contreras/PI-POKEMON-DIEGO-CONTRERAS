import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CardDetail from './components/CardDetail/CardDetail';
import Form from './components/Form/Form';

function App() {
  return (
    <BrowserRouter>
    <div className='app'>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/pokemon/:id' component={CardDetail} />
      <Route exact path='/create' component={Form} />
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
