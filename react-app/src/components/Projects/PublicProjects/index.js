import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { getAllProjects } from '../../../store/projects';
import ProjectCard from '../UserProjects/ProjectCard';
import './PublicProjects.css'

function PublicProjects() {
	const dispatch = useDispatch();
	const history = useHistory;
	const allProjects = useSelector((state) => state.projectReducer.allProjects)

	useEffect (() => {
	dispatch(getAllProjects())


	}, [dispatch])

	return (
	
	<div className='main-public-div'>
		<div className='main-public-back'>
			<button>Back</button>
		</div>
	<div className='projects-container'>
		<ProjectCard className='project-card-component' projects={allProjects} />
	</div>

	</div>
	)
}

export default PublicProjects;