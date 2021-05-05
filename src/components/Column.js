import React, {useState, useEffect} from 'react'
import Input from './Input'
import Task from './Task'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


export default function Column(props) {

    const {date,columns,setColumns, getTasks,colTitle, deleteHandler, index} = props

    const [title, setTitle] = useState(colTitle)
    // const [tasks, setTasks] = useState([])
    const [isEditing, setEditing] = useState(false)
    // const [defaultTasks, setDefaultTasks] = useState(tasks)
    const [colInd, setColIndex] = useState(null)

    useEffect(()=>{
        const colIndex = columns.findIndex((item)=> date == item.date)
        setColIndex(index)
    },[])

    const createTask=()=>{
        const newDate = new Date()
        const task = {title: 'new task', date: newDate}
        const newCols = [...columns]
        // const colIndex = columns.findIndex((item)=> item.date == date)
        // setColIndex(colIndex)
        newCols.map((i, index) => i.date == date && i.tasks.push(task))
        setColumns([...newCols ])
        
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
    
    const deleteTask =(ind)=>{
        const newTasks = [...columns[index].tasks]
        newTasks.splice(ind,1)
        console.log(newTasks);
        setColumns([...columns, columns[index].tasks = newTasks])
    }   
    
console.log(columns[index].tasks);
    
    return (
        // <DragDropContext onDragEnd={handleOnDragEnd}>

        <Droppable droppableId="column-main-cont">
            {(provided) => (
        <div className='column-main-cont' {...provided.droppableProps} ref={provided.innerRef}>
            <button onClick={showModal}>{isEditing ? 'ok' : 'edit'}</button>        
            {isEditing && <div className='edit-modal'>
                <Input onSubmit={editCol}/>
            </div>}
            
            <button onClick={deleteCol}>delete</button>    
            <button onClick={()=>createTask(date)}>add task</button>
            <div className='title'><h3>{title}</h3></div>    
            <div className='column-main'>
                 {columns[index].tasks.map((item,index)=>( /*tasks.map */
                    <div key={item.date}><Task 
                    deleteHandler={deleteTask}
                    index={index} 
                    titleOfCol={title}
                    date={item.date}
                    propTitle={item.title}/></div>
                ))}
            </div>
            {provided.placeholder}
        </div>
        )}
        </Droppable>
        //  </DragDropContext>
    )
}
