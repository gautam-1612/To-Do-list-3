import { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [list, setlist] = useState([])
  
  useEffect(() => {  
  const data = localStorage.getItem('todo')
  if(data) {
    const todo = JSON.parse(data)
    setlist(todo)
  }  
  }, [])
  
  const storelocally = (task) => {
    localStorage.setItem('todo', JSON.stringify(task))
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleAdd = () => {
    if (todo.trim().length > 0) {
      const updatedlist = [...list, { id: uuidv4(), text: todo, completed: false }]
      setlist(updatedlist)
      settodo("")
      storelocally(updatedlist)
    }
  }     //You don't need a return statement because you are not inside a map() function or any other iteration method that requires returning a value for each element of the array.

  const checkbox = (e) => {
    let idd = e.target.value
    const updatedlist = list.map((data) => {
      return data.id === idd ? { ...data, completed: !data.completed } : data
    })
    setlist(updatedlist)
    storelocally(updatedlist)
  }

  const remove = (e) => {
    let id = e.target.value
    const updatedlist =  list.filter((data) => {
      return data.id != id
    })
    setlist(updatedlist)
    storelocally(updatedlist)
  }

  const edit = (e, id) => {
    settodo(list.find((data) => data.id === id).text)
    const updatedlist = list.filter((data) => {
      return data.id != id
    })
    setlist(updatedlist)
    storelocally(updatedlist)
  }

  return (
    <>
      <Navbar />
      <main className="flex justify-center">
        <div className="container md:w-[60vw] bg-gray-200 md:mt-[20px] min-h-[80vh] rounded-[10px]">
          <h1 className="text-2xl font-bold mt-6 text-center">Task Manager</h1>
          <h2 className='text-sm md:text-lg md:font-bold ml-[55px] md:ml-[110px] mt-[30px]'>Add New Task</h2>
          <div className="adding flex justify-center mt-[20px] gap-[10px]">
            <input onClick={handleChange} value={todo} className="bg-white h-[35px] w:w-[70vw] md:w-[40vw] rounded-[10px] pl-[10px]" type="text" placeholder="" />
            <button onClick={handleAdd} className="text-[16px] border-white bg-gray-700 text-white ml-[10px] w-[60px] md:min-w-[80px] rounded-[10px] hover:text-[18px] transition-all">Add</button>
          </div>
          <h2 className='text-lg md:font-bold ml-[55px] md:ml-[110px] mt-[30px]'>Your Tasks</h2>
          {list.length === 0 && <div className="notodo ml-[110px] mt-[30px]">No To-Dos to display !</div>}
          {list.map((data) => {
            return (
              <div key={data.id} className="taskcontainer mx-[55px] md:mx-[110px] my-[15px] flex items-center justify-between">
                <div className="text-[16px] flex gap-[10px]">
                  <input value={data.id} onChange={checkbox} className='mt-[1px]' type="checkbox" />
                  <p className={data.completed ? "line-through" : ""}>{data.text}</p>
                </div>
                <div className="buttons flex gap-[10px]">
                  <button onClick={(e) => edit(e, data.id)} className="edit py-[5px] hover:text-[17px] min-w-[40px] ml-[40px] md:ml-[20px] px-[10px] text-[18px]  bg-gray-700 rounded-[10px] text-white"><CiEdit /></button>
                  <button onClick={remove} value={data.id} className="Delete py-[5px] hover:text-[17px] min-w-[40px] px-[11px] text-[18px] bg-gray-700 rounded-[10px] text-white"><MdDeleteOutline /></button>
                </div>
              </div>)
          })
          }
        </div>
      </main>

    </>
  )
}

export default App
