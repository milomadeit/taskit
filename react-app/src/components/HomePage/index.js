import React, {useEffect} from "react";
import cc from './images/cocreate.png'
import './HomePage.css'
import {useHistory} from "react-router-dom"
import { getAllProjects } from "../../store/projects";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";




function HomePage () {
	const history = useHistory();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user)

	useEffect(() => {

		dispatch(getAllProjects())

}, [dispatch])

	const navigateToUserProjects = () => {
		history.push('/projects/user')
	}
	const navigateToCreate = () => {
		history.push('/projects/new')
	}

	return (
		<div>
		<div className="main-home-div">
			<img src={cc} alt='cocreate'/>
			<h1>
			CoCreate
			</h1>
			<div className="home-buttons">
				{currentUser && (
					<>
					<button className='nav-to-create button' onClick={() => navigateToCreate()}>
					Create Project
					</button>
					{/* <OpenModalButton className='button' modalComponent={<CreateProject/>} buttonText='Create A Project' /> */}
					<button className="nav-to-user-proj button" onClick={() => navigateToUserProjects()}>Current Projects</button>
					</>
				)}
			</div>
		</div>
		</div>
	)
}

export default HomePage