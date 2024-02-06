import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './UserProjects.css'
import { getUserProjects } from "../../../store/projects";
import OpenModalButton from "../../DeleteModalButton"
import DeleteProject from "../DeleteProject";
// import { deleteProject } from "../../../store/projects";
import PopOutMenu from "../../PopOutMenu";


function ProjectCard({projects}) {
	const dispatch = useDispatch();
	const history = useHistory();
	const currentUser = useSelector((state) => state.session.user)
	const projects_2 = useSelector((state) => state.projectReducer.userProjects)
	const [loading, setLoading] = useState('true')
	
	useEffect(() => {
		dispatch(getUserProjects())
		setLoading(!loading)

	}, [dispatch])

	if (loading) return <div>Loading...</div>

	const handleEdit = (e, projectId) => {
		e.stopPropagation();
        // navigate to edit page with projectId
        history.push(`/projects/${projectId}/update`);
    };

	const navigateToProject = (projectId, project) => {
		history.push({
			pathname: `/projects/${projectId}`,
			state: {project: project}
		})
	}


	function formatDate(dateString) {
		const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
		return new Date(dateString).toLocaleString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+)/, '$1/$2/$3 $4');
	}
	

	return (
		<div className="project-card-div">
		{Object.values(projects).map((project) => (
			<div onClick={() => navigateToProject(project.id, project)} key={project.id} className="user-project-card">
				<h2 className="user-project-title">{project.name}</h2>
				<p className="user-project-detail">{project.description}</p>
				<p className="user-project-date">{formatDate(project.due_date)}</p>
				{project.task_count > 0 && (<p className="projects-task-count" >{project.task_count} TASK{project.task_count > 1 ? 'S' : ''}</p>)}
				{project.task_count === 0 && (<p className="projects-task-count" >NO TASKS</p>)}
				<p className={`user-project-public ${project.is_public ? 'public' : 'private'}`}>
					{project.is_public ? 'Public' : 'Private'}
				</p>
				{currentUser && currentUser.id === project.creator_id && (
					<div onClick={(e) => e.stopPropagation()} className="project-actions">
						<PopOutMenu>
							<button className="edit-project-button" onClick={(e) => handleEdit(e, project.id)}>Edit</button>
							<OpenModalButton  className="delete-project-button" buttonText="Delete" modalComponent={<DeleteProject projectId={project.id}/>} />

						</PopOutMenu>
					</div>
				)}
			</div>
			))}
		</div>
	);
	
}

export default ProjectCard;