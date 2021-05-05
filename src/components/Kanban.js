import React, {useState} from 'react'
import Column from './Column'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import '../styles/styles.css'

export default function Kanban() {

    const [columns, setColumns] = useState([])
    const [tasks, setTasks] = useState([])


    const addColumn =()=>{
        const date = new Date()
        const newCols = [...columns]
        const col = {title: 'new column', date: date, tasks: []}
        setColumns([...newCols, col])
    }

    const deleteColumn =(index)=>{
        const newCols = [...columns]
        newCols.splice(index, 1)
        setColumns(newCols)
    }
    
 
    console.log(tasks);
    
    
    const handleOnDragEnd=(result)=>{
        const items = [...tasks]
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        
    }
    
    const getTasks=(value)=>{
        setTasks(value)
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className='kanban-main-cont'>
                    <div>
                        <button onClick={addColumn}>add column</button>
                    </div>
                    <div className='columns-list-cont'>
                        {columns.map((item, index)=> (
                        <div key={item.date} className='list-cont' >
                            <Column 
                            colTitle={item.title}
                            date={item.date}
                            deleteHandler={deleteColumn}
                            index={index}
                            getTasks={getTasks}
                            setColumns={setColumns}
                            columns={columns}
                           /> 
                        </div>
                        ))}
                    </div>
                </div>
                </DragDropContext>  
    )
}
