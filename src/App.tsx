import React,{FC,ChangeEvent,useState} from 'react';
import {ITask} from './Interfaces'
import './App.css';
import Todotask from './Components/Todotask';

const App: FC  =() => {
  const[task,setTask]= useState<string>("");
  const[deadLine,setDeadLine]= useState<number>(0);
  const[todoList,setTodoList]= useState<ITask[]>([]);

  const handleChange = (event:ChangeEvent<HTMLInputElement>):void =>{
    if(event.target.name === "task"){
      setTask(event.target.value)
    }
    else{
      setDeadLine(Number(event.target.value))
    }

  }
  const addTask = ():void =>{
    const newTask = {taskName:task, deadline:deadLine}
      setTodoList([...todoList,newTask])
      console.log(todoList)
      setTask("")
      setDeadLine(0)
  }
  const completeTask = (taskNameToDelete:string): void =>{
    setTodoList(todoList.filter((task)=>{
    return task.taskName !== taskNameToDelete
    }))
    }
  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input type="text" 
            placeholder="Task ..." 
            name="task"
            value={task}
            onChange={handleChange}/>
          <input type="number" 
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadLine}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
{todoList.map((task:ITask, key:number)=>{
  return <Todotask key={key} task={task} completeTask={completeTask}/>
})}
      </div>
    </div>
  );
}

export default App;
