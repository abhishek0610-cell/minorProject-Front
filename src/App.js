 import React from 'react';
import { BrowserRouter as Router,Routes,Route  } from 'react-router-dom';
import './App.css';
import StudyTerminal from './Components/StudyTerminal/StudyTerminal';
import StudentDashboardd from './Components/Dashboard/Dashboard';
import StudentProfilePage from './Components/Profilepage/Profilepage';
import LoginForm from './Components/Auth/Login';
import RegisterForm from './Components/Auth/Register';
import Quizzes from './Components/Quizzes/Quizzes';
// import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<LoginForm/>}/>
      <Route path="/register" element={<RegisterForm/>}/>
      <Route path="/dashboard" element={<StudentDashboardd/>}/>
      <Route path="/studyterminal" element={<StudyTerminal/>}/>
      <Route path="/profile" element={<StudentProfilePage/>}/>
      <Route path="/quizes" element={<Quizzes/>}/>
    </Routes>
   </Router>
   
  );
} 

export default App;
