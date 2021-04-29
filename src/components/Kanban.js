import React, {useState} from 'react'
import Column from './Column'

export default function Kanban() {

    const [columns, setColumns] = useState([])


    const addColumn =()=>{
        const date = new Date()
        const newCols = [...columns]
        const col = {title: 'new column', date: date}
        setColumns([...newCols, col])
    }

    const deleteColumn =(index)=>{
        const newCols = [...columns]
        newCols.splice(index, 1)
        setColumns(newCols)
    }
    
    return (
        <div>
            <button onClick={addColumn}>add column</button>        
            {columns.map((item, index)=> {
            <div key={item.date}>
                <Column 
                title={item.title}
                dateOfCreation={item.date}
                deleteHandler={deleteColumn}
                index={index}/> 
            </div>})}
        </div>
    )
}
