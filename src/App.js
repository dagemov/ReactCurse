import React,{useState}  from 'react';
import shortid from 'shortid'
import {filter, isEmpty,size} from 'lodash'



function App() {
  const [task,setTask]=useState("")// [name,metodo] = initialValue
  const [tasks,setTasks]=useState([])
  const addTask=(e)=>{
    //evitar recargacion de pagina
    e.preventDefault()
    if(isEmpty(task)){
      console.log("Task empty")
      return
    }
    const newTask ={
      id:shortid.generate(),
      name:task
    }
    setTasks([...tasks,newTask])
    setTask("")
  } 
  const deleteTask=(id)=>{
    const filtersTasks = tasks.filter(task => task.id!==id)
    setTasks(filtersTasks)
  }
  return (
    <div className='container mt-5'>
      <h1>Task</h1>
      <hr/>
      <div className='row'>
          <div className='col-8'>
            <h4 className='text-center'>Task list</h4>            
          {  
            size(tasks)==0 ? (
              <h5>There aren't Task yet</h5>
            ):(
              <ul className='list-group'>
              {
                tasks.map((task)=>(
                  <li className='list-group-item' key={task.id}>
                    <span className='lead'>{task.name}</span>
                    <button 
                    className='btn btn-danger btn-sm float-right mx-2'
                    onClick={()=>deleteTask(task.id)}
                    >
                      Delete
                    </button>
                    <button 
                    className='btn btn-warning btn-sm float-right'
                    >
                      Edit
                    </button>
                  </li>
                ))
              
              }
            </ul>
            )           
          }
          </div>
          <div className='col-4'>
            <h4 className='text-center'>formulario</h4>
            <form onSubmit={addTask}>
              <input 
                type="text" 
                className='form-control mb-2' 
                placeholder='input task'
                onChange={(text)=>setTask(text.target.value)}
                value={task}
              />   
              <button 
              className='btn btn-dark btn-block'
              type='submit'
              >Add
              </button>
            </form>
          </div>
      </div>
    </div>
  );
}

export default App;
