import React, {useState, useEffect} from 'react'
import Input from './Input'
import Task from './Task'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const fetchTasks =()=>{
    const data = localStorage.getItem('tasks') 
    if(!data){
        return []
    }
    return JSON.parse(data)
}


export default function Column(props) {

    const {date,
        editColumn,
        columns,
        setColumns, 
        getTasks,
        colTitle, 
        deleteHandler, 
        index} = props

    const [title, setTitle] = useState(colTitle)
    const [isEditing, setEditing] = useState(false)
    const [dndTasks, setDndTasks] = useState([...columns[index].tasks])

    
    useEffect(()=>{
        setDndTasks(columns[index].tasks)
        getTasks(columns[index].tasks)

    },[columns[index].tasks])

    const createTask=()=>{
        const newDate = new Date().toString()
        const task = {title: 'taskTitle', date: newDate, desc: 'empty', dateOfEditing: null}
        const newCols = [...columns]
        newCols.map((i, index) => i.date == date && i.tasks.push(task))
        setColumns([...newCols ])
    }

    const editTask=(value,taskIndex) =>{
        const cols = [...columns]
        const dateOfEditing = new Date().toString()
        cols.map((i,index)=>{
            if(i.date == date ){
                i.tasks[taskIndex].title = value;
                i.tasks[taskIndex].dateOfEditing = dateOfEditing;
            }
        })
        setColumns([...cols])
    }
    const editDesc = (value, taskIndex)=>{
        const cols = [...columns]
        const dateOfEditing = new Date().toString()
        cols.map((i,index)=>{
            if(i.date == date){
                i.tasks[taskIndex].desc = value;
                i.tasks[taskIndex].dateOfEditing = dateOfEditing;

            }
        })
        setColumns([...cols])
    }

    const deleteCol=()=>{
        deleteHandler(index)
    }

    const editCol =(newTitle)=>{
        editColumn(newTitle,date)

    }
    const showModal=()=>{
        setEditing(prev => !prev)
    }
    
    const deleteTask =(ind)=>{
        const newTasks = [...columns[index].tasks]
        const newCols = [...columns]
        newTasks.splice(ind,1)
        console.log(newTasks);
        newCols.map((i, index) => i.date == date && i.tasks.splice(ind,1))
        setColumns([...newCols])
        console.log(columns);
    }   
    
    
    return (
        <div className='column-main-cont' >
            <button onClick={showModal}>{isEditing ? 'ok' : 'edit'}</button>        
            {isEditing && <div className='edit-modal'>
                <Input onSubmit={editCol}/>
            </div>}
            
            <button onClick={deleteCol}>delete</button>    
            <button onClick={()=>createTask(date)}>add task</button>
            <div className='title'><h3>{colTitle}</h3></div>    
            <div className='column-main'>
                 {dndTasks.map((item,index)=>( /*tasks.map */
                    <div key={item.date}><Task 
                    deleteHandler={deleteTask}
                    index={index} 
                    titleOfCol={title}
                    date={item.date}
                    propTitle={item.title}
                    editTask={editTask}
                    editTaskDesc={editDesc}
                    propDesc={item.desc}
                    dateOfEditing={item.dateOfEditing}/></div>
                ))}
            </div>
        </div>
    )
}
