import React,{useState, useEffect} from 'react'
import Input from './Input'
import Kanban from './Kanban'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import '../styles/modal.css'

export default function Modal(props) {
    const {
        
        isEditingTitle,
        newTitleFunc,
        editTitle,
        propTitle,
        propDesc,
        newDescFunc,
        isEditingDesc,
        editDesc,
        dateOfEditing,
        titleOfCol,
        showTask,
        isWatchFull,
        setFull,
        date
    }= props

    return (

        
        <div className={isWatchFull ? 'modal-active' : 'modal-cont'} onClick={() => setFull(false)}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>

            
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
                <h6 onClick={showTask}>{isWatchFull ? 'hide more' : 'show more'}</h6>
            </div>
        </div>
    )
}
