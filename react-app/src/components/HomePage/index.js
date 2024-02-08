import React, {useEffect} from "react";
import cc from './images/TaskItLogo1.png'
import './HomePage.css'
import {useHistory} from "react-router-dom"
import { getAllProjects } from "../../store/projects";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import OpenModalButton from '../OpenModalHomePage'
import LoginFormModal from "../LoginFormModal";



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

	const navigateToPublic = () => {
		history.push('/projects/public')
	}

	return (
		<div>
		<div className="main-home-div">
			<img  className='home-page-img'src={cc} alt='cocreate'/>
			<h1>
			TaskIt
			</h1>
			<div className="home-buttons">
				{!currentUser && (
					<>
					<button onClick={() => navigateToPublic()} className="public-projects-button">Public Projects</button>
					<OpenModalButton
						buttonText="Sign In"
						modalComponent={<LoginFormModal
							className='nav-sign-in-up-btn nav-sign-in-btn'
					
					/>
					}
					/>
					</>
				)}
				{currentUser && (
					<>
					<button className='nav-to-create-home' onClick={() => navigateToCreate()}>
					Create Project
					</button>
					<button onClick={() => navigateToPublic()}  className="public-projects-button">Public Projects</button>
					{/* <OpenModalButton className='button' modalComponent={<CreateProject/>} buttonText='Create A Project' /> */}
					<button className="nav-to-user-proj-home" onClick={() => navigateToUserProjects()}>My Projects</button>
					</>
				)}
			</div>
		</div>
		</div>
	)
}

export default HomePage