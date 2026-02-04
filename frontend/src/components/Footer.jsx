import { Copyright } from 'lucide-react';
import React from 'react';

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className='text-center'>
          <p className='text-sm text-muted-foreground'>
            {
              completedTasksCount > 0 && (
                <>
                  🎉 Fanstatic! You've completed {completedTasksCount} tasks
                  {
                    activeTasksCount > 0 && `, only ${activeTasksCount} more to go! Keep going 💪`
                  }
                </>
              )
            }

            {
              completedTasksCount === 0 && activeTasksCount > 0 && (
                <>
                  Let's start with {activeTasksCount} tasks! 💪
                </>
              )
            }
          </p>
        </div>
      )}
      <p className='flex justify-center items-center gap-1 text-xs text-muted-foreground'>
        <Copyright className='size-3' />
        <a href='https://github.com/Kr1sNg/todo-app' target="_blank">tat-nguy</a>
      </p>

    </>
  );
};

export default Footer;