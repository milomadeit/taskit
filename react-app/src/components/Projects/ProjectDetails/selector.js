const selectProjectById = (state, projectId) => {
    //find the project in public projects
    let project = state.projectReducer.allProjects[parseInt(projectId)];
    
    // if the user has private projects, try to find it there
    if (!project && state.projectReducer.userProjects) {
      project = state.projectReducer.userProjects[parseInt(projectId)];
    }
    
    return project;
  
}

export default selectProjectById;