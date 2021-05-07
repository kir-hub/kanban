import React, {useState,useEffect} from 'react'
import Column from './Column'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import '../styles/styles.css'

const getColumns =()=>{
    const data = localStorage.getItem('columns') 
    if(!data){
        return []
    }
    return JSON.parse(data)
}

export default function Kanban(props) {
    const {name}=props

    const [columns, setColumns] = useState([])
    const [tasks, setTasks] = useState([])

    useEffect(()=>{
        const newCols = getColumns()
        setColumns(newCols)
    },[])
    useEffect(()=>{
        if(columns.length > 0){
            localStorage.setItem('columns', JSON.stringify(columns))
        }
        if(columns.length == 0){
            localStorage.clear()
        }
    },[columns])


    const addColumn =()=>{
        const date = new Date()
        const newCols = [...columns]
        const col = {title: 'new column', date: date.toString(), tasks: []}
        setColumns([...newCols, col])
    }
    const editColumn =(value, date)=>{
        const cols = [...columns]
        cols.map((i,index)=>{
            if(i.date == date){
                i.title = value
            }
        })
        setColumns([...cols])
    }

    const deleteColumn =(index)=>{
        const newCols = [...columns]
        newCols.splice(index, 1)
        setColumns(newCols)
    }
    console.log(columns);
    const handleOnDragEnd=(result)=>{
        if (!result.destination) return;
        const key = result.source.droppableId
        const item = columns.find(item => item.date == key)//колонка из которой заьираем
        const movebleItem = item.tasks.splice(result.source.index, 1)
        const destinationKey = result.destination.droppableId
        const colToSet = columns.find(item => item.date == destinationKey)//колонка куда положить
        colToSet.tasks.splice(result.destination.index, 0,movebleItem[0])
        console.log('coltoset', colToSet);
        const cols = [...columns]
        cols.map((i,index)=>{
            if(i.date == colToSet.date){
                cols.splice(index,1,colToSet)
            }
        })
        setColumns(cols)
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
                            <Droppable key={item.date} droppableId={item.date.toString()}>
                                {(provided) => (
                        <div  className='list-cont' {...provided.droppableProps} ref={provided.innerRef}>
                            <Column 
                            colTitle={item.title}
                            editColumn={editColumn}
                            date={item.date}
                            deleteHandler={deleteColumn}
                            index={index}
                            getTasks={getTasks}
                            setColumns={setColumns}
                            columns={columns}
                           /> 
                           {provided.placeholder}
                        </div>
                        )}
                        </Droppable>
                        ))}
                    </div>
                </div>
                </DragDropContext>  
    )
}
