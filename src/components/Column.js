import React, {useState} from 'react'
import Input from './Input'
import Task from './Task'

export default function Column(props) {

    const {  deleteHandler, index} = props

    const [title, setTitle] = useState('new title')
    const [tasks, setTasks] = useState([])
    const [isEditing, setEditing] = useState(false)

    const createTask=(value)=>{
        const date = new Date()
        const newTasks = [...tasks]
        const newTask = {title: value, date: date}
        setTasks([newTask, ...newTasks])
    }
    const deleteCol=()=>{
        deleteHandler(index)
    }
    const editCol =(newTitle)=>{
        setTitle(newTitle)

    }
    const showModal=()=>{
        setEditing(prev => !prev)
    }
    
    const deleteTask =(index)=>{
        const newTasks = [...tasks]
        newTasks.splice(index,1)
        setTasks(newTasks)
    }   
    return (
        <div>
            <button onClick={showModal}>{isEditing ? 'ok' : 'edit'}</button>        
            {isEditing && <div className='edit-modal'>
                <Input onSubmit={editCol}/>
            </div>}
            
            <button onClick={deleteCol}>delete</button>    
            <button onClick={createTask}>add task</button>
            <div className='title'><h3>{title}</h3></div>    
            <div className='column-main'>
                {tasks.map((item,index)=>{
                    <div key={item.date}><Task 
                    deleteHandler={deleteTask}
                    index={index} 
                    titleOfCol={title}
                    date={itemm.date}
                    propTitle={item.title}/></div>
                })}
            </div>
        </div>
    )
}
