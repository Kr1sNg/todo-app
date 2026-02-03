import AddTask from '@/components/AddTask'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Pagination from '@/components/Pagination'
import StatsAndFilter from '@/components/StatsAndFilter'
import TaskList from '@/components/TaskList'
import TimeFilter from '@/components/TimeFilter'
import React from 'react'

const HomePage = () => {
  return (
	<div className="min-h-screen w-full bg-white relative">
		{/* Teal Glow Background */}
		<div
			className="absolute inset-0 z-0"
			style={{
			backgroundImage: `
				radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #14b8a6 100%)
			`,
			backgroundSize: "100% 100%",
			}}
		/>
		{/* Your Content/Components */}
		<div className='container pt-8 mx-auto relative z-10'>
			<div className='w-full max-w-2xl p-6 mx-auto space-y-6'>

				{/* header */}
				<Header />

				{/* add new task */}
				<AddTask />

				{/* Stats and Filters */}
				<StatsAndFilter />

				{/* Task List */}
				<TaskList />

				{/* Pagination and Time filter */}
				<div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
					<Pagination />
					<TimeFilter />
				</div>

				{/* footer */}
				<Footer />

			</div>
		</div>
	</div>
  )
}

export default HomePage