import React from 'react';
import { Badge } from './ui/badge';
import { FilterType } from '@/lib/data';
import { Filter } from 'lucide-react';
import { Button } from './ui/button';

const StatsAndFilter = ({
  completedTasksCount = 0,
  activeTasksCount = 0,
  filter = 'all',
  setFilter
}) => {
  return (
    <div className='flex flex-col items-start justify-between grap-4 sm:flex-row sm:items-center'>
      {/* statistic part */}
      <div className='flex gap-3'>
        <Badge
          variant='secondary'
          className="bg-white/50 text-accent-foreground text-sm border-info/20"
        >
          {activeTasksCount} {FilterType.active}
        </Badge>

        <Badge
          variant='secondary'
          className="bg-white/50 text-success text-sm border-success/20"
        >
          {completedTasksCount} {FilterType.complete}
        </Badge>
      </div>

      {/* filter part */}
      <div className='flex flex-col gap-2 sm:flex-row'>
        {
          Object.keys(FilterType).map((type) => {
            return (
              <Button
                key={type}
                variant={filter === type ? 'gradient' : 'ghost'}
                size='sm'
                className="capitalize"
                onClick={() => setFilter(type)}
              >
                <Filter className="size-4" />
                {FilterType[type]}
              </Button>
            );
          })
        }
      </div>
    </div>
  );
};

export default StatsAndFilter;