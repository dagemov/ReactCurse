import React,{useState,useEffect}  from 'react';
import shortid from 'shortid'
import {filter, isEmpty,size, update} from 'lodash'
import { addDocument, getCollections, updateDocument } from './actions';



function App() {
  const [task,setTask]=useState("")// [name,metodo] = initialValue
  const [tasks,setTasks]=useState([])
  const [editMode,setEditMode]=useState(false)
  const [id,setId]=useState("")
  const [error,setError]=useState(null)
  //Metodo que espera que la pagina cargue y trae la data de firebase
  useEffect(
    ()=>{
      (async ()=>{
        const result = await getCollections("tasks")
        if(result.statusResponse){
          setTasks(result.data)
        }        
      })()
    },[]
  )
  const validForm = ()=>{
    let isvalid=true
    setError(null)
    if(isEmpty(task)){
      setError("u must input one task")
      isvalid=false
      return isvalid
    }
    return isvalid
  }
  const addTask=async (e)=>{
    //evitar recargacion de pagina
    e.preventDefault()
    if(!validForm()){      
      return
    }
    const result = await addDocument("tasks",{name:task})
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    /*const newTask ={
      id:shortid.generate(),
      name:task
    }*/
    setTasks([...tasks,{id:result.data.id, name:task}])
    setTask("")
  } 
  const deleteTask=(id)=>{
    const filtersTasks = tasks.filter(task => task.id!==id)
    setTasks(filtersTasks)
  }
  const editTask=(theTask)=>{
    setTask(theTask.name)
    setEditMode(true)    
    setId(theTask.id)
  }
  const saveTask=async (e)=>{
    //evitar recargacion de pagina
    e.preventDefault()
    if(!validForm()){      
      return
    }
    const result = await updateDocument("tasks",id,{name:task})
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    const editedTasks = tasks.map(item => item.id == id ? {id,name:task} : item)
    setTasks(editedTasks)
    setEditMode(false)
    setId("")
    setTask("")
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
              <li className='list-group-item'>There aren't Task yet</li>
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
                    onClick={()=>editTask(task)}
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
            <h4 className='text-center'>addTask</h4>
            <form onSubmit={editMode ? saveTask: addTask}>
              {
                error && <spa className="text-danger">{error}</spa>
              }
              <input 
                type="text" 
                className='form-control mb-2' 
                placeholder='input task'
                onChange={(text)=>setTask(text.target.value)}
                value={task}
              />   
              <button 
              className={editMode? 'btn btn-warning btn-block' :'btn btn-dark btn-block'}
              type='submit'
              >{editMode ? "Save" : "Add"}
              </button>
            </form>
          </div>
      </div>
    </div>
  );
}

export default App;
