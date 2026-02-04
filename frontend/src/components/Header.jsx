import React from 'react';

const Header = () => {
  return (
    <div className='space-y-2 text-center'>
      <h1 className='text-4xl font-bold text-transparent bg-primary bg-clip-text'>
        My To-Do List
      </h1>

      <p className='text-muted-foreground italic'>
        “oh baby you can do it you can do it 💪”
      </p>
    </div>
  );
};

export default Header;