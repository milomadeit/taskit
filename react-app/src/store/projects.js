const NEW_PROJECT = 'projects/NEW_PROJECT';
const ALL_PROJECTS = 'projects/ALL_PROJECTS'
const USER_PROJECTS = 'projects/USER_PROJECTS'

const newProject = (project) => {
	return {
		type: NEW_PROJECT,
		project
	}
}

const storeProjects = (projects) => {
	return {
		type: ALL_PROJECTS,
		projects
	}
}

const storeUserProjects = (projects) => {
	return {
		type: USER_PROJECTS,
		projects
	}
}

export const createProject = (project) => async (dispatch) => {
	const response = await fetch(`/api/projects/new`, {
		method: "POST",
		body: project
	})
	if (response.ok) {
		const project_data = await response.json();
		dispatch(newProject(project_data))
		return project_data
	} else {
		const errorData = await response.json();
		console.log(errorData);
		return errorData
	}
}

export const getAllProjects = () => async (dispatch) => {
	const response = await fetch(`/api/projects`, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
		  },
	})

	if (response.ok) {
		const projects = await response.json()
		dispatch(storeProjects(projects))
		return projects;
	} else {
		const errorData = await response.json();
		console.log(errorData);
		return errorData
	}
}

export const getUserProjects = () => async (dispatch) => {
	const response = await fetch(`/api/projects/current`, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
		  },
	})

	if (response.ok) {
		const projects = await response.json()
		dispatch(storeUserProjects(projects))
		return projects;
	} else {
		const errorData = await response.json();
		console.log(errorData);
		return errorData
	}
}


const initialState = {allProjects:{}, userProjects: {}}
export default function ProjectReducer(state = initialState, action ) {
	switch (action.type) {
		case NEW_PROJECT: {
			const new_project = action.project
			return {
				...state,
				allProjects:{ ...state.allProjects, [new_project.id]: new_project}
			}
		}
		case ALL_PROJECTS: {
			const all_projects = action.projects.reduce(
				(acc, project) => ({...acc, [project.id]:project }), {}
			);
			return {
				...state,
				allProjects: {...state.allProjects, ...all_projects}
			}
		};
		case USER_PROJECTS: {
			const all_projects = action.projects.reduce(
				(acc, project) => ({...acc, [project.id]:project }), {}
			);
			return {
				...state,
				userProjects: {...state.userProjects, ...all_projects}
			}
		};
		default:
			return state;
	}
}