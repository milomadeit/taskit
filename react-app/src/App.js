import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import CreateProject from "./components/Projects/CreateProject";
import UserProjects from "./components/Projects/UserProjects";
import UpdateProject from "./components/Projects/UpdateProject";
import ProjectDetails from "./components/Projects/ProjectDetails";
import CreateTask from "./components/Tasks/CreateTask";
import UpdateTask from "./components/Tasks/UpdateTask";
import PublicProjects from "./components/Projects/PublicProjects";
import UserProfile from "./components/Profile/UserProfile";
import EasterEgg from "./components/EasterEgg/EasterEgg/index"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const appKey = sessionUser ? `user-${sessionUser.id}` : 'no-user';

  return (
    <div key={appKey}>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>
          {sessionUser && (<Route path="/projects/easteregg">
          <EasterEgg />
        </Route>
        )} 

          {sessionUser && (<Route path="/profile/user">
            <UserProfile />
          </Route>
          )}

          <Route path='/projects/public'>
            <PublicProjects />
          </Route>

          {sessionUser && (<Route exact path="/projects/user">
            <UserProjects />
          </Route>
          )}

          {sessionUser && (<Route path="/projects/tasks/edit/:taskId/">
            <UpdateTask />
          </Route>
          )}

          {sessionUser && (<Route path="/projects/tasks/:projectId/new">
            <CreateTask />
          </Route>
          )}
          

          {sessionUser && (<Route path="/projects/:projectId/update">
            <UpdateProject />
          </Route>
          )}

          {sessionUser && (<Route path="/projects/new">
            <CreateProject />
          </Route>
          )}

          <Route exact path="/projects/:projectId/">
              <ProjectDetails />
            </Route>

  

          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>

      )}
    </div>
  );
}

export default App;