const NEW_PROJECT = 'projects/NEW_PROJECT';
const ALL_PROJECTS = 'projects/ALL_PROJECTS'
const USER_PROJECTS = 'projects/USER_PROJECTS'
const UPDATE_PROJECT = 'projects/UPDATE_PROJECT'
const DELETE_PROJECT = 'projects/DELETE_PROJECT'

const newProject = (project) => {
	return {
		type: NEW_PROJECT,
		project
	}
}

const storeUpdateProject = (project) => {
	return {
		type: UPDATE_PROJECT,
		project
	}
}

// const storeProjects = (projects) => {
// 	return {
// 		type: ALL_PROJECTS,
// 		projects
// 	}
// }

const storeUserProjects = (projects) => {
	return {
		type: USER_PROJECTS,
		projects
	}
}

const removeProject = (projectId) => {
	return {
		type: DELETE_PROJECT,
		projectId
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
		
		return errorData
	}
}

export const updateProject = (project, projectId) => async (dispatch) => {
	const response = await fetch(`/api/projects/${projectId}`, {
		method: "PUT",
		body: project
	})
	if (response.ok) {
		const project_data = await response.json();
		dispatch(storeUpdateProject(project_data))
		return project_data
	} else {
		const errorData = await response.json();
	
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
		if (projects.length > 0 ) {
			dispatch(storeUserProjects(projects))
			return projects;	
		} 
		return projects;
	} else {
		const errorData = await response.json();
	
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
		if (projects.length > 0) {
			dispatch(storeUserProjects(projects))
			return projects;	
		} 
		return projects;
	} else {
		const errorData = await response.json();
		return errorData
	}
}

export const deleteProject = (projectId) => async (dispatch) => {
	const response = await fetch(`/api/projects/${projectId}`, {
		method: 'DELETE',
		headers: {
			"Content-Type": "application/json",
		  },
	})

	if (response.ok) {
		const data = await response.json();
		dispatch(removeProject(projectId))
		dispatch(getUserProjects())
		return data
	} else {
		const errorData = await response.json();
		return errorData
	}
}


const initialState = {allProjects:{}, userProjects: {}}
export default function projectReducer(state = initialState, action ) {
    switch (action.type) {
        case NEW_PROJECT: {
			const { project } = action;
			return {
				...state,
				allProjects: {
					...state.allProjects,
					[project.id]: project
				}
			};
		}
		

        case ALL_PROJECTS: {
			const projects = action.projects.reduce((acc, project) => {
				acc[project.id] = project;
				return acc;
			}, {});
			return {
				...state,
				allProjects: projects
			};
		};
		
        case UPDATE_PROJECT: {
			const updatedProject = action.project;
			return {
				...state,
				allProjects: {
					...state.allProjects,
					[updatedProject.id]: updatedProject
				}
			};
		};
		

        case USER_PROJECTS: {
			const projects = action.projects.reduce((acc, project) => {
				acc[project.id] = project;
				return acc;
			}, {});
			return {
				...state,
				userProjects: projects
			};
		};
		case DELETE_PROJECT: {
			const newAllProjects = {...state.allProjects}
			delete newAllProjects[action.projectId]
			const newUserProjects = {...state.userProjects}
			delete newUserProjects[action.projectId]
			return {
				...state,
				allProjects: newAllProjects,
				userProjects: newUserProjects,

			}

		}
		

        default:
            return state;
    }
}
