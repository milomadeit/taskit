import React, {useEffect, useState} from 'react'
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './ProjectDetails.css'
import { getProjectTasks } from '../../../store/tasks';
import TaskCard from '../../Tasks/TaskCards';
import TaskCarousel from '../../Tasks/TaskCards/TaskCarousel';

function ProjectDetails() {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const project = location.state.project
	const [loading, setLoading] = useState(false)
	const tasks = useSelector((state) => state.tasksReducer.projectTasks)
	const task_array = Object.values(tasks)

	useEffect(() => {
		setLoading(true)
		dispatch(getProjectTasks(project.id)).then(setLoading(false))


	}, [dispatch])

	if (loading) {
		return (<p>loading...</p>)
	}

	function formatDate(dateString) {
		const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
		return new Date(dateString).toLocaleString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+)/, '$1/$2/$3 $4');
	}

	const navigateToCreateTask = () => {
		history.push(`/projects/tasks/${project.id}/new`)
	}

	return (
		<div className='main-project-details-div'>
			<div className='project-info'>
			<h2>{project.name}</h2>
			<p className="project-detail">{project.description}</p>
			<p className="project-detail">{formatDate(project.due_date)}</p>
			<p className={`project-public ${project.is_public ? 'public' : 'private'}`}>
				{project.is_public ? 'Public' : 'Private'}
			</p>
			<p>{project.task_count < 1 ? 'No tasks to complete' : project.task_count + ' tasks to complete'}</p>
			</div>
			<div>
				<button onClick={() => navigateToCreateTask()}>Add Task</button>
			</div>
			<div>
				<TaskCarousel  task_array={task_array} />
			</div>
				
		</div>
	)
}


export default ProjectDetails