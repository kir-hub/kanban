import React,{useState, useRef} from 'react'
import Input from './Input'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import '../styles/styles.css'

export default function Task(props) {
    const {editTask,propDesc,editTaskDesc,propTitle,deleteHandler, index, titleOfCol, date,dateOfEditing}= props

    const [isEditingDesc, setEditingDesc] = useState(false)
    const [isEditingTitle, setEditingTitle] = useState(false)
    const [isWatchFull, setFull] = useState(false)

    const deleteTask =()=>{
        deleteHandler(index)
    }
    const showTask =()=>{
        setFull(prev => !prev)
    }
    const editDesc =()=>{
        setEditingDesc(prev => !prev)
    }

    const editTitle = ()=>{
        setEditingTitle(prev =>!prev)
    }
    const newTitleFunc = (value)=>{
        editTask(value, index)
    }
    const newDescFunc = (value) =>{
        editTaskDesc(value, index)
    }

    return (
        <Draggable draggableId={date.toString()} index={index}>
            {(provided) => (
        <div className='task-main-cont' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <h3>{propTitle}</h3>        
            <button onClick={deleteTask}>delete task</button>
            {isWatchFull && <div className='task-modal-cont'>
                <div>
                     {isEditingTitle && <div ><Input  onSubmit={newTitleFunc}/><button onClick={editTitle}>ok</button> </div> }{/*changeTitle */}
                    <h3 onClick={editTitle}>{propTitle}</h3>
                </div>
                <div className='p'>{propDesc}</div>
                {isEditingDesc && <Input onSubmit={newDescFunc}/>}
                <button onClick={editDesc}>{isEditingDesc ? 'ok' : 'edit'}</button>
                <p>created at: {date.toString()}</p>
                <p>edited at: {dateOfEditing}</p>
                <p>{titleOfCol}</p>
            </div>}
                <h6 onClick={showTask}>{isWatchFull ? 'hide more' : 'show more'}</h6>
        </div>)}
        </Draggable>
    )
}
