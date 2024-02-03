import React from 'react'
import { useHistory } from 'react-router-dom'
import './TaskCard.css'

function TaskCard({curr_task, project}) {
	const history = useHistory();

	const task = curr_task;

	const handleEditTask = (taskId) => {
		history.push({
			pathname: `/projects/tasks/edit/${taskId}`,
			state: {task:task, project:project}
		})
	}

	return (
		<div className='task-card-div'>
			<div>
			<h4 className='task-card-task-name'>{curr_task?.name}</h4>
		
			<p className='task-card-task-description'>{curr_task?.description}</p>
			</div>
			<div>
				<span>
				<p className='task-card-task-finished'>{curr_task?.is_completed ? "Done" : "Not Done"}</p>
				</span>
				<button className='task-edit-button' onClick={() => handleEditTask(curr_task.id)}><i class="fa-regular fa-pen-to-square"></i></button>
				{/* <button className='task-delete-button'>Delete</button>	 */}
				{/* <button className='task-delete-button'><i class="fa fa-ellipsis"></i></button> */}
			</div>
		</div>

	)

}

export default TaskCard;