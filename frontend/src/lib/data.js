export const FilterType = {
  all: 'all',
  active: 'in progress',
  complete: 'finished'
};

export const options = [
  {
    value: 'today',
    label: 'Today',
  },
  {
    value: 'week',
    label: 'This week',
  },
  {
    value: 'month',
    label: 'This month',
  },
  {
    value: 'year',
    label: 'This year',
  },
  {
    value: 'all',
    label: 'All the time',
  },
];

export const visibleTaskLimit = 4;