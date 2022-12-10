import logo from './logo.svg';
import './App.css';
import AddCustomer from './Components/AddCustomer';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import ListCustomer from './Components/ListCustomer';
import Home from './Components/Home';
import EditForm from './Components/EditForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/addcustomer' element={<AddCustomer/>}/>
           <Route path='/listcustomer' element={<ListCustomer/>}/>
           <Route path='/edit/:id' exact element={<EditForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
