import React,{useState, useRef} from 'react'
import Input from './Input'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import '../styles/styles.css'

export default function Task(props) {
    const {propTitle,deleteHandler, index, titleOfCol, date}= props

    const [isEditingDesc, setEditingDesc] = useState(false)
    const [isEditingTitle, setEditingTitle] = useState(false)
    const [isWatchFull, setFull] = useState(false)
    const [title, setTitle] = useState(propTitle)
    const [description, setDescription] = useState('s')

    const deleteTask =()=>{
        deleteHandler(index)
    }
    const showTask =()=>{
        setFull(prev => !prev)
    }
    const changeDescription = (value)=>{
        setDescription(value)
    }
    const editDesc =()=>{
        setEditingDesc(prev => !prev)
    }
    const changeTitle =(value)=>{
        setTitle(value)
    }

    const editTitle = ()=>{
        setEditingTitle(prev =>!prev)
    }
    return (
        <Draggable draggableId={date.toString()} index={index}>
            {(provided) => (
        <div className='task-main-cont' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            
            <h3>{title}</h3>        
            <button onClick={deleteTask}>delete task</button>
           
            {isWatchFull && <div className='task-modal-cont'>
                <div>
                    {isEditingTitle && <div ><Input  onSubmit={changeTitle}/><button onClick={editTitle}>ok</button> </div> }
                    <h3 onClick={editTitle}>{title}</h3>
                    
                </div>
                <div className='p'>{description}</div>
                {isEditingDesc && <Input onSubmit={changeDescription}/>}
                <button onClick={editDesc}>{isEditingDesc ? 'ok' : 'edit'}</button>
                <p>{date.toString()}</p>
                <p>{titleOfCol}</p>
                
            </div>}
                <h6 onClick={showTask}>{isWatchFull ? 'hide more' : 'show more'}</h6>
                
            
        </div>)}
        </Draggable>
    )
}
