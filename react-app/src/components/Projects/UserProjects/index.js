import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import './UserProjects.css'
import { getUserProjects } from "../../../store/projects";
import ProjectCard from "./ProjectCard";



function UserProjects() {
	const dispatch = useDispatch();
	const history = useHistory();
	const currentUser = useSelector((state) => state.session.user)
	const projects = useSelector((state) => state.projectReducer.userProjects)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		dispatch(getUserProjects())
		setIsLoading(false)


	}, [dispatch, currentUser, history])

	if (!currentUser) {
		return <Redirect to="/" />;
	}

	if (isLoading) return <div>Loading...</div>

	const navigateToCreate = () => {
		history.push('/projects/new')
	}

	const navigateToDash = () => {
		history.push('/profile/user')
	}


	return (
		<div className="main-project-car-div">
			<div className="projects-page-create-project-button">
				<button className='project-page-create-project-button' onClick={() => navigateToCreate()}>
						Create New Project
				</button>
				<button className="project-page-create-project-button" onClick={() => navigateToDash()}> Dashboard</button>
			</div>
			<div className="projects-container">

			<ProjectCard className='project-card-component' projects={projects} />
			</div>
		</div>
	);
	
}

export default UserProjects;