import React, {useEffect} from "react";
import cc from './images/cocreate.png'
import './HomePage.css'
import {useHistory} from "react-router-dom"
import { getAllProjects } from "../../store/projects";
import { useDispatch } from "react-redux";




function HomePage () {
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {

		dispatch(getAllProjects())

}, [dispatch])

	const navigateToCreate = () => {
		history.push('/projects/new')
	}

	return (
		<div>
		<div className="coming-soon">
			<img src={cc} alt='cocreate'/>
			<h1>
			CoCreate
			</h1>
			<button onClick={() => navigateToCreate()}>
			Create Project
			</button>
		</div>
		</div>
	)
}

export default HomePage