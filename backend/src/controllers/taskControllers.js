import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find().sort({ createdAt: -1 }); //sort from new to old
		res.status(200).json(tasks);
	} catch (error) {
		console.log('getAllTask Error:', error);
		res.status(500).json({ message: "system error" });
	}
}

export const createTask = async (req, res) => {
	try {
		const { title } = req.body;
		const task = new Task({ title });

		const newTask = await task.save();
		res.status(201).json(newTask);
	} catch (error) {
		console.log('createTask Error:', error);
		res.status(500).json({ message: "system error" });
	}
}

export const updateTask = async (req, res) => {
	try {
		const { title, status, completeAt } = req.body;
		const updated = await Task.findByIdAndUpdate(
			req.params.id,
			{
				title,
				status,
				completeAt
			},
			{ new: true }	// to send back new updated item
		)

		if (!updated)
			return res.status(404).json({ message: "task is not existed" });

		res.status(200).json(updated);
	} catch (error) {
		console.log('updateTask Error:', error);
		res.status(500).json({ message: "system error" });
	}
}

export const deleteTask = async (req, res) => {

	try {
		const deleted = await Task.findByIdAndDelete(req.params.id);

		if (!deleted)
			return res.status(404).json({ message: "task is not existed" });

		res.status(200).json({ message: "task is successfully deleted" });
	} catch (error) {
		console.log('deleteTask Error:', error);
		res.status(500).json({ message: "system error" });
	}
}