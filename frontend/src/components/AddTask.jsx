import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/axios';

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  //send new title to server
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        const added = await api.post('/tasks',
          { title: newTaskTitle.trim() }
        );

        toast.success(`New task "${added.data.title}" is successfully added!`);
        // inform back to HomePage that new task is added and need to be re-render
        handleNewTaskAdded();
      } catch (error) {
        console.error('Add new task error:', error);
        toast.error('Error in adding new task');
      }

      setNewTaskTitle('');
    } else {
      toast.error('You need to input the title of task!');
    }
  };

  // support Enter to add new task
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    } else if (e.key === 'Escape') {
      setNewTaskTitle('');
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Input
          type="text"
          placeholder="something needs to be done"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={(e) => {
            e.preventDefault();
            setNewTaskTitle('');
          }}
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onMouseDown={(e) => {
            e.preventDefault();
            addTask();
          }}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className='size-5'/>Add
        </Button>

      </div>

    </Card>
  );
};

export default AddTask;