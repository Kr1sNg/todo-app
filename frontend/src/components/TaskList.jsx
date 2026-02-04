import React from 'react';
import TaskEmpty from './TaskEmpty';
import TaskCard from './TaskCard';

const TaskList = ({ filteredTasks, filter, handleTaskChanged }) => {
  if (!filteredTasks || filteredTasks.length === 0)
    return <TaskEmpty filter={filter}/>;

  return (
    <div className='space-y-3'>
      {filteredTasks.map((task, index) => { // index: 0, 1, 2...
        return (
          <TaskCard
            key={task._id ?? index} // if _id is null use index
            task={task}
            index={index}
            handleTaskChanged={handleTaskChanged}
          />
        );
      })}
    </div>
  );
};

export default TaskList;