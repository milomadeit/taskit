import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react';
import './TaskCard.css'
import DeleteTask from '../DeleteTask/index';
import OpenModalButton from '../../OpenModalDeleteTask/index'
import Toggle from '../toggle/toggle'; 
import { updateIsCompleted } from '../../../store/tasks';
import { useDispatch } from 'react-redux';
import { getProjectTasks } from '../../../store/tasks';
import { useSelector } from 'react-redux';


function TaskCard({task, project}) {
	const history = useHistory();
	const [isChecked, setIsChecked] = useState(task.is_completed);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user)

	
	const curr_task = task;

	useEffect(() => {
		dispatch(getProjectTasks(project?.id))
	}, [dispatch, curr_task.is_completed])

	const handleToggleCheck =  async (taskId, projectId) => {
		await dispatch(updateIsCompleted(taskId, projectId))
		await dispatch(getProjectTasks(project.id))
		setIsChecked(!isChecked)
	}


	const handleEditTask = (taskId) => {
		history.push({
			pathname: `/projects/tasks/edit/${taskId}`,
			state: {task:task, project:project}
		})
	}

	return (
		<div className='task-card-div'>
			<div>
			<h4 className='task-card-task-name'>{task.name}</h4>
		
			<p className='task-card-task-description'>{task?.description}</p>
			</div>
			{task?.creator_id === user?.id && (
			<div className='task-details-bottom-div'>
				<span className='task-toggle'>
				<p className='task-card-task-finished'>{task?.is_completed ? "Completed" : "Not Done"}</p>
				<Toggle className='toggle-component' isChecked={isChecked} handleToggleCheck={() => handleToggleCheck(task.id, project.id)} />
				</span>
				<div>
				<button className='task-edit-button' onClick={() => handleEditTask(task.id)}><i class="fa-regular fa-pen-to-square"></i></button>
				<OpenModalButton className='modal-delete-task'
              	buttonText={
                <i className="fas fa-trash-alt"></i>
              }
              modalComponent={<DeleteTask task={task} project={project} />}
            />

				</div>
				{/* <button className='task-delete-button'>Delete</button>	 */}
				{/* <button className='task-delete-button'><i className="fa fa-ellipsis"></i></button> */}
			</div>

			)}
		</div>

	)

}

export default TaskCard;