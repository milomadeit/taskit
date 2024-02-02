import React from 'react'
import { useHistory, useLocation } from "react-router-dom";
import './ProjectDetails.css'

function ProjectDetails() {
	const location = useLocation();
	const history = useHistory();

	const project = location.state.project

	function formatDate(dateString) {
		const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
		return new Date(dateString).toLocaleString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+)/, '$1/$2/$3 $4');
	}

	const navigateToCreateTask = () => {
		history.push(`/projects/tasks/new`)
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
			</div>
			<div>
				<button onClick={() => navigateToCreateTask()}>Create Task</button>
			</div>
				
		</div>
	)
}


export default ProjectDetails