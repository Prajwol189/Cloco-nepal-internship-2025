import React, { useState } from 'react';
import AddTask from './AddTask';
import TaskItem from './TaskItem';

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = (task: string) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index: number) => {
    const res=window.confirm("Do you want to delete this list item??");
    if(res){
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks); 
    }
    
  };

  const editTask = (index: number, newText: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newText;
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTask onAdd={addTask} />
      <ul>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            onDelete={() => deleteTask(index)}
            onEdit={(newText) => editTask(index, newText)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;