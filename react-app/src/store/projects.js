const NEW_PROJECT = 'projects/NEW_PROJECT';

const newProject = (project) => {
	return {
		type: NEW_PROJECT,
		project
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

const initialState = {}
export default function ProjectReducer(state = initialState, action ) {
	switch (action.type) {
		case NEW_PROJECT: {
			const new_project = action.project
			return {
				...state,
				project: {...state.project, [new_project.id]: new_project}
			}
		}
		default:
			return state;
	}
}