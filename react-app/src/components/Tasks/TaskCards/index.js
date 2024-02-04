import React from 'react'
import { useHistory } from 'react-router-dom'
import './TaskCard.css'
import DeleteTask from '../DeleteTask/index';
import OpenModalButton from '../../OpenModalDeleteTask/index'

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
			<div className='task-details-bottom-div'>
				<span>
				<p className='task-card-task-finished'>{curr_task?.is_completed ? "Done" : "Not Done"}</p>
				</span>
				<div>
				<button className='task-edit-button' onClick={() => handleEditTask(curr_task.id)}><i class="fa-regular fa-pen-to-square"></i></button>
				<OpenModalButton className='modal-delete-task'
              	buttonText={
                <i className="fas fa-trash-alt"></i>
              }
              modalComponent={<DeleteTask curr_task={curr_task} project={project} />}
            />

				</div>
				{/* <button className='task-delete-button'>Delete</button>	 */}
				{/* <button className='task-delete-button'><i className="fa fa-ellipsis"></i></button> */}
			</div>
		</div>

	)

}

export default TaskCard;