import React from 'react'
import TaskEmpty from './TaskEmpty';
import TaskCard from './TaskCard';

const TaskList = () => {
  let filter = "all";
  const filteredTasks = [
    {
      _id: "1",
      title: "hoc react",
      status: "active",
      completeAt: null,
      createdAt: new Date(),
    },
    {
      _id: "2",
      title: "hoc js",
      status: "complete",
      completeAt: new Date(),
      createdAt: new Date(),
    }
  ]

  if (!filteredTasks || filteredTasks.length === 0)
    return <TaskEmpty filter={filter}/>

  return (
	  <div className='space-y-3'>
      {filteredTasks.map((task, index) => {
        <TaskCard
          key={task._id ?? index}
          task={task}
          index={index}
        />
      })}
    </div>
  )
}

export default TaskList