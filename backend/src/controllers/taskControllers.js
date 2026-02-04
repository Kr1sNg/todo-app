import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
  const { timeFilter = 'all' } = req.query;
  const now = new Date();
  let startDate;
  let mondayDate;

  switch (timeFilter) {
    case 'today':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 04-02-2026 00:00
      break;
    case 'week':
      mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);	// 02-02-2025 00:00
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'year':
      startDate = new Date(now.getFullYear(), 1, 1);
      break;
    case 'all':
    default: {
      startDate = null;
    }
  }

  // gte: greate than or equal to >=
  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    // use mongoDB aggregate to filter object
    const result = await Task.aggregate([
      {
        // this first pipeline will run before other
        $match: query
      },
      // the behind pipelines will take result of the precedents
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }],
          completeCount: [{ $match: { status: 'complete' } }, { $count: 'count' }]
        }
      }
    ]);

    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completeCount = result[0].completeCount[0]?.count || 0;

    res.status(200).json({ tasks, activeCount, completeCount });
  } catch (error) {
    console.log('getAllTask Error:', error);
    res.status(500).json({ message: 'system error' });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log('createTask Error:', error);
    res.status(500).json({ message: 'system error' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt
      },
      { new: true }	// to send back new updated item
    );

    if (!updated)
      return res.status(404).json({ message: 'task is not existed' });

    res.status(200).json(updated);
  } catch (error) {
    console.log('updateTask Error:', error);
    res.status(500).json({ message: 'system error' });
  }
};

export const deleteTask = async (req, res) => {

  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: 'task is not existed' });

    res.status(200).json({ message: 'task is successfully deleted' });
  } catch (error) {
    console.log('deleteTask Error:', error);
    res.status(500).json({ message: 'system error' });
  }
};