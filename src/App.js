import React,{useState}  from 'react';
import {isEmpty} from 'lodash'



function App() {
  const [task,setTask]=useState("")// [name,metodo] = initialValue
  const addTask=(e)=>{
    //evitar recargacion de pagina
    e.preventDefault()
    if(isEmpty(task)){
      console.log("Task empty")
      return
    }
    console.log("Ok")
    setTask("")
  } 
  return (
    <div className='container mt-5'>
      <h1>Task</h1>
      <hr/>
      <div className='row'>
          <div className='col-8'>
            <h4 className='text-center'>Task list</h4>
            <ul className='list-group'>
              <li className='list-group-item'>
                  <span className='lead'>Task name</span>
                  <button className='btn btn-danger btn-sm float-right mx-2'>Delte</button>
                  <button className='btn btn-warning btn-sm float-right'>Edit</button>
              </li>
            </ul>
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
