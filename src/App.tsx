
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import {  useAppSelector } from './redux/store'


function App() {
const {isHide} =useAppSelector(state=>state.Hide)

  return (
    <>
    {isHide&&<Header/>}
    
      <Outlet></Outlet>
    </>
  )
}

export default App
