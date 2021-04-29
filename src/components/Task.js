import React,{useState} from 'react'
import Input from './Input'

export default function Task(props) {
    const {propTitle,deleteHandler, index, titleOfCol, date}= props

    const [isEditingDesc, setEditingDesc] = useState(false)
    const [isWatchFull, setFull] = useState(false)
    const [title, setTitle] = useState(propTitle)
    const [description, setDescription] = useState('')

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
    
    return (
        <div onClick={showTask}>
            <h3>{title}</h3>        
            <button onClick={deleteTask}>delete task</button>
            {isWatchFull && <div className='task-modal-cont'>
                <button onClick={showTask}>close</button>
                <div>
                    <h3 onClick={changeTitle}>{title}</h3>
                    <p>{date}</p>
                </div>
                <p>{description}</p>
                <button onClisk={editDesc}>{isEditingDesc ? 'edit' : 'ok'}</button>
                {isEditingDesc && <Input onSubmit={changeDescription}/>}
                <p>{titleOfCol}</p>
            </div>}
            
        </div>
    )
}
