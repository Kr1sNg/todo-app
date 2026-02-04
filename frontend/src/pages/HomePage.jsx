import AddTask from '@/components/AddTask';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TaskPagination from '@/components/TaskPagination';
import StatsAndFilter from '@/components/StatsAndFilter';
import TaskList from '@/components/TaskList';
import TimeFilter from '@/components/TimeFilter';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { visibleTaskLimit } from '@/lib/data';

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTasksCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [timeQuery, setTimeQuery] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    fetchTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, timeQuery]);

  // fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?timeFilter=${timeQuery}`);

      setTaskBuffer(res.data.tasks);
      setActiveTasksCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);

      console.log('tasks', res.data);
    } catch (error) {
      console.error('fetch all tasks error:', error);
      toast.error('Error in retrieving tasks');
    }
  };

  // when there's change in task list => refetch tasks
  const handleTaskChanged = () => {
    fetchTasks();
  };

  // filted tasks
  const filteredTasks = taskBuffer.filter((t) => {
    switch (filter) {
      case 'active':
        return t.status === 'active';
      case 'complete':
        return t.status === 'complete';
      default:	// case 'all' => alls
        return true;
    }
  });

  // calculate the tasks in current page
  const visibleTasks = filteredTasks.slice(
    (currentPage - 1) * visibleTaskLimit,
    currentPage * visibleTaskLimit
  );

  // total pages
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

  // handle go next - back
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((curr) => curr + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((curr) => curr - 1);
    }
  };
  const handlePageChanged = (newPage) => {
    setCurrentPage(newPage);
  };

  // if there's no task left on current page, go back to prev
  if (visibleTasks.length === 0)
    handlePrevPage();

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Teal Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
				radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #14b8a6 100%)
			`,
          backgroundSize: '100% 100%',
        }}
      />
      {/* Your Content/Components */}
      <div className='container pt-8 mx-auto relative z-10'>
        <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>

          {/* header */}
          <Header />

          {/* add new task */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          {/* Stats and Filters */}
          <StatsAndFilter
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
            filter={filter}
            setFilter={setFilter}
          />

          {/* Task List */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          {/* Pagination and Time filter */}
          <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
            <TaskPagination
              handleNext={handleNextPage}
              handlePrev={handlePrevPage}
              handleChange={handlePageChanged}
              page={currentPage}
              totalPages={totalPages}
            />
            <TimeFilter
              timeQuery={timeQuery}
              setTimeQuery={setTimeQuery}
            />
          </div>

          {/* footer */}
          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />

        </div>
      </div>
    </div>
  );
};

export default HomePage;