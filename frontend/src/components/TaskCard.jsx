import React, { useState } from 'react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Calendar, CheckCircle2, Circle, Edit, PenBox, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Input } from './ui/input';
import api from '@/lib/axios';

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || '');

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);

      toast.success('Task is successfully deleted!');
      handleTaskChanged();
    } catch (error) {
      console.error('Delete Task error:', error);
      toast.error('Error in deleting task!');
    }
  };

  const updateTask = async () => {
    if (updateTaskTitle.trim()) {
      try {
        setIsEditting(false);
        const updated = await api.put(`/tasks/${task._id}`, {
          title: updateTaskTitle.trim()
        });

        toast.success(`Task "${task.title}" is changed to "${updated.data.title}" successfully!`);
        handleTaskChanged();
      } catch (error) {
        console.error('Update Task error:', error);
        toast.error('Error in updating task!');
      }
    } else {
      toast.error('Title of task cannot be empty!');
    }
  };

  // support Enter/esc to update task
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      updateTask();
    } else if (e.key === 'Escape') {
      setIsEditting(false);
      setUpdateTaskTitle(task.title || '');
    }
  };

  const toggleTaskCompleteButton = async () => {
    try {
      if (task.status === 'active') {
        const completed = await api.put(`/tasks/${task._id}`, {
          status: 'complete',
          completedAt: new Date().toISOString()
        });

        toast.success(`Task "${completed.data.title}" is finished 🎉`);
      } else {
        const actived = await api.put(`/tasks/${task._id}`, {
          status: 'active',
          completedAt: null
        });

        toast.success(`Task "${actived.data.title}" is not finished yet!`);
      }
      handleTaskChanged();
    } catch (error) {
      console.error('Button finish task error:', error);
      toast.error('Error in updating button finish task!');
    }
  };

  return (
    <Card
      className={cn(
        'p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group',
        task.status === 'complete' && 'opacity-75'
      )}
      style={{ animationDelay: `${index * 50}ms` }}	// apear 50ms after render
    >
      {/* in each line */}
      <div className='flex items-center gap-4'>
        {/* a small round button to show if the task is finished or not */}
        <Button
          variant='ghost'
          size='icon'
          className={cn(
            'flex-shrink-0 size-8 rounded-full transition-all duration-200',
            task.status === 'complete'
              ? 'text-success hover:text-success/80'
              : 'text-muted-foreground hover:text-primary'
          )}
          onClick={toggleTaskCompleteButton}
        >
          {task.status === 'complete'
            ? (<CheckCircle2 className='size-5' />)
            : (<Circle className='size-5' />)
          }
        </Button>

        {/* show or edit title */}
        <div className='flex-1 min-w-0'>
          {isEditting ? (
            <div className='flex items-center gap-2 mt-1'>
              <Input
                type='text'
                placeholder="what is this task?"
                className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20'
                value={updateTaskTitle}
                onChange={(e) => setUpdateTaskTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                // onBlur is when user click out of the input
                onBlur={() => {
                  setIsEditting(false);
                  setUpdateTaskTitle(task.title || '');
                }}
              />
              <Button
                variant="gradient"
                size="sm"
                className="px-4"
                onMouseDown={(e) => {
                  e.preventDefault();
                  updateTask();
                }}
                disabled={!updateTaskTitle.trim()}
              >
                <Edit className='size-3'/>
                <p className='text-xs'>Update</p>
              </Button>
            </div>
          ) : (
            <p className={cn(
              'text-base transition-all duration-200',
              task.status === 'complete'
                ? 'line-through text-muted-foreground'
                : 'text-foreground'
            )}
            >
              {task.title}
            </p>
          )}

          {/* show createdAt (and completedAt) */}
          <div className='flex items-center gap-2 mt-1'>
            <Calendar className='size-3 text-muted-foreground' />
            <span className='text-xs text-muted-foreground'>
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className='text-xs text-muted-foreground'> - </span>
                <Calendar className='size-3 text-muted-foreground' />
                <span className='text-xs text-muted-foreground'>
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* edit button and delete button - not shown on editting */}
        {!isEditting && (
          <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
            {/* edit button */}
            <Button
              variant='ghost'
              size='icon'
              className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info'
              onClick={() => {
                setIsEditting(true);
                setUpdateTaskTitle(task.title || '');
              }}
            >
              <PenBox className='size-4' />
            </Button>

            {/* delete button */}
            <Button
              variant='ghost'
              size='icon'
              className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive'
              onClick={() => deleteTask(task._id)}
            >
              <Trash2 className='size-4' />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;