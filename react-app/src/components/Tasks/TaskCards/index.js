import React from 'react'
import './TaskCard.css'

function TaskCard({curr_task}) {

	return (
		<div className='task-card-div'>
			<h4 className='task-card-task-name'>{curr_task?.name}</h4>
			<p className='task-card-task-description'>{curr_task?.description}</p>
			<p className='task-card-task-finished'>{curr_task?.is_completed ? "Done" : "Not Done"}</p>
		</div>

	)

}

export default TaskCard;