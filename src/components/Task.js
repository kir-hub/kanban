import React,{useState} from 'react'
import Input from './Input'

export default function Task(props) {
    const {propTitle,deleteHandler, index, titleOfCol, date}= props

    const [isEditing, setEditing] = useState(false)
    const [isWatchFull, setFull] = useState(false)
    const [title, setTitle] = useState(propTitle)

    const deleteTask =()=>{
        deleteHandler(index)
    }
    const showTask =()=>{
        setFull(prev => !prev)
    }
    const changeDescription = ()=>{

    }
    const changeTitle =()=>{
        
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
                <button>{isEditing ? 'edit' : 'ok'}</button>
                {isEditing && <Input onSubmit={changeDescription}/>}
                <p>{titleOfCol}</p>
            </div>}
            
        </div>
    )
}
