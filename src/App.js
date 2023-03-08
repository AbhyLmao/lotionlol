import { useState } from 'react'
import {BsJustify} from "react-icons/bs";
import Sidebar from './Components/Sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Edit from './Components/Edit';
import Show from './Components/Show';


function App() {
  const [count, setCount] = useState(0)
  const [sidebar, isSidebar] = useState(false)
  const [notes, changeNotes] = useState([]);
  return (
    <BrowserRouter>
    <div className="App">
     <div className='flex justify-center items-center text-slate-900'>
      <div className='absolute top-0 left-0 mt-6 ml-4 cursor-pointer text-4xl' onClick={() => isSidebar(!sidebar)}><BsJustify /></div>
      <div className='grid place-items-center'>
      <h1 className='text-2xl mt-5 font-bold'>Lotion
     
      </h1>
      <p className='text-sm text-slate-400 '>this sucks</p> 
      </div>

     

     </div>

     <div className='mt-5 flex h-screen'>
      <Routes>
        <Route path='/' element={<div>{sidebar && <Sidebar tasks={notes} changeTask={changeNotes}/> }</div>} />
        <Route path={`/:id/edit`} element = {<Edit tasks={notes} changeTask = {changeNotes} />}></Route>
        <Route path={`/:id`} element = {<Show tasks={notes} changeTask = {changeNotes} />}></Route>
      </Routes>
     </div>
    </div>
    </BrowserRouter>
  )
}

export default App
