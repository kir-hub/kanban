import logo from './logo.svg';
import React,{useState} from 'react'
import Kanban from './components/Kanban'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import './App.css';

function App() {

  const [boards,setBoards] = useState([{owner: 'name', date: new Date().toString()}])

  const createBoard =()=>{
    const date = new Date().toString();
    const newBoards = [...boards]
    const newBoard = {owner: 'new name', date: date}
    setBoards([...newBoards, newBoard])
  }


// console.log(match);

  return (
    <Router>
      <div className="App">
        {boards.map((i,index)=>{
          
          <div key={i.date}>
            
            <Link to={`/board/${index + 1}`}>{i.owner} board</Link>
            <Switch>
              <Route  path={`/board/:boardId`}>
                <Kanban owner={i.owner} date={i.date}/>
              </Route>
            </Switch>
          </div>
          
        })}
        <button onClick={createBoard}>add</button>
        <Link to={`/board/${1}`}>board</Link>  
       <Switch>
         <Route path={`/board/:boardId`}>
      <Kanban />
           
         </Route>
       </Switch>
         {/* <Link to='/kanban'>Kanban</Link>  
    //   <Switch>
    //     <Route path='/kanban'>
    //       <Kanban/>
    //     </Route>
    //   </Switch> */}
       </div>
     </Router>
    
  );
}

export default App;
