import logo from './logo.svg';
import './App.css';
import app from './firebase';
import { useEffect,useState } from 'react';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Home from './component/home';
function App(){

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(  () => {
    
    
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      setUser(user);
    }
    else{
      navigate('/login');
    }
    
  },[]);

  return (
    <div className="App">
  
      <Home user={user} />
    </div>
  );
}

export default App;
