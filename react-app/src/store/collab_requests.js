const NEW_REQUEST = 'requests/NEW_REQUEST'
// const UPDATE_REQUEST = 'requests/UPDATE_REQUEST'
const GET_REQUESTS = 'request/GET_REQUESTS'
const DELETE_REQUEST = 'requests/DELETE_REQUEST'

const storeNewRequest = (request) => {
	return {
		type: NEW_REQUEST,
		request,
	}
}

// const storeUpdateRequest = (request) => {
// 	return {
// 		type: UPDATE_REQUEST,
// 		request
// 	}
// }

const storeGetRequests = (requests) => {
	return {
		type: GET_REQUESTS,
		requests
	}
}

const storeDeleteRequest = (requestId) => {
	return {
		type: DELETE_REQUEST,
		requestId
	}
}



export const getRequests = (userId) => async (dispatch) => {
	const response = await fetch(`/api/request/${userId}`, {
		method: 'GET'
	})

	if (response.ok) {
		const request = await response.json();
		console.log(request, 'my reqs yooo')
		dispatch(storeGetRequests(request.request))
		return request
	} else {
		const errorData = await response.json();
		console.log(errorData, "my errorr yoo")
		
		return errorData
	}


}


export const DeleteRequest = (requestId) => async (dispatch) => {
	const response = await fetch(`/api/request/${requestId}`, {
		method: 'DELETE'
	});

	if (response.ok) {
		const request = await response.json();
		dispatch(storeDeleteRequest(requestId))
		return request
	} else {
		const errorData = await response.json();
		
		return errorData
	}

}

export const newRequest = (projectId) => async (dispatch) => {
	const response = await fetch(`/api/request/${projectId}/new`, {
		method: "POST",

	})

	if (response.ok) {
		const request = await response.json();
		dispatch(storeNewRequest(request))
		return request
	} else {
		const errorData = await response.json();
		
		return errorData
	}
	
}



const initialState = {collabRequests: {}, currentRequests: {}}


export default function collabReducer(state = initialState, action) {
	switch (action.type) {
		case NEW_REQUEST: {
			const {request} = action;

			return {
				...state,
				collabRequests: {
					...state.collabRequests,
					[request.id]: request
				}
			};
		}
		case GET_REQUESTS: {
			const requests = action.requests.reduce((acc, request) => {
				acc[request.id] = request;
				return acc
			}, {});

			return {
				...state,
				currentRequests: requests
			}
			
		}
		case DELETE_REQUEST: {
			const newCurrentRequests = {...state.currentRequests}
			delete newCurrentRequests[action.requestId]

			return {
				...state,
				currentRequests: newCurrentRequests
			}
		}
		default:
			return state;
	}
}
