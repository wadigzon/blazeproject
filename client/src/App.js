import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import Insert10K from './pages/Insert10K'
import Insert1K from './pages/Insert1K'
import Insert100K from './pages/Insert100K'

import DisplayData from './pages/DisplayData'
import DisplayCount from './pages/DisplayCount'
import DeleteAll from './pages/DeleteAll'

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/insert1K'  component={Insert1K} />
        <Route path='/insert10K'  component={Insert10K} />
        <Route path='/insert100K'  component={Insert100K} />
        <Route path='/displaydata'  component={DisplayData} />
        <Route path='/displaycount'  component={DisplayCount} />
        <Route path='/deleteall'  component={DeleteAll} />

      </Switch>
    </Router>
    </>
  );
}

export default App;
