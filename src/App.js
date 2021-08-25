import './App.css';
import React, {useEffect} from 'react';
import {Provider} from "jotai";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import FrontendRoutes from "./utils/frontend-routes";
import SignupContainer from "./containers/signup-container";
import LoginContainer from "./containers/login-container";
import TripsContainer from "./containers/trips-container";
import {UserRole} from "./constants/constants";
import ProtectedRoute from "./utils/protected-route";
import Navbar from "./components/navbar-component";
import TripCrudContainer from "./containers/trip-crud-container";
import {toast} from "react-toastify";
import UserContainer from "./containers/user-container";
import UserCrudContainer from "./containers/user-crud-container";
toast.configure();
function App() {

  return (
    <div className="App">
      <React.Fragment>
        <Provider>
          <Router>
            <Navbar />
            <Switch>

              <Route
                  path={FrontendRoutes.loginRoute}
                  component={LoginContainer}
                  exact
              />
              <Route
                  path={FrontendRoutes.signupRoute}
                  component={SignupContainer}
                  exact
              />

              <ProtectedRoute
                  Component={TripsContainer}
                  path={FrontendRoutes.tripsRoute}
                  roles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.REGULAR]}
                  exact
              />
              <ProtectedRoute
                  Component={UserContainer}
                  path={FrontendRoutes.usersRoute}
                  roles={[UserRole.ADMIN, UserRole.MANAGER]}
                  exact
              />

              <ProtectedRoute
                  Component={TripCrudContainer}
                  path={FrontendRoutes.createTripRoute}
                  roles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.REGULAR]}
                  key={FrontendRoutes.createTripRoute}
                  exact
                />

              <ProtectedRoute
                  Component={TripCrudContainer}
                  path={FrontendRoutes.viewTripRoute()}
                  roles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.REGULAR]}
                  key={FrontendRoutes.viewTripRoute()}
                  exact
              />

              <ProtectedRoute
                  Component={TripCrudContainer}
                  path={FrontendRoutes.updateTripRoute()}
                  roles={[UserRole.ADMIN, UserRole.MANAGER, UserRole.REGULAR]}
                  key={FrontendRoutes.updateTripRoute()}
                  exact
              />
              <ProtectedRoute
                  Component={UserCrudContainer}
                  path={FrontendRoutes.createUserRoute}
                  roles={[UserRole.ADMIN, UserRole.MANAGER]}
                  key={FrontendRoutes.createUserRoute}
                  exact
                />

              <ProtectedRoute
                  Component={UserCrudContainer}
                  path={FrontendRoutes.viewUserRoute()}
                  roles={[UserRole.ADMIN, UserRole.MANAGER]}
                  key={FrontendRoutes.viewUserRoute()}
                  exact
              />

              <ProtectedRoute
                  Component={UserCrudContainer}
                  path={FrontendRoutes.updateUserRoute()}
                  roles={[UserRole.ADMIN, UserRole.MANAGER]}
                  key={FrontendRoutes.updateUserRoute()}
                  exact
              />








              <Route
                  component={LoginContainer}
              />



              {/*<ProtectedRoutes path="/signup" exact Component={SignUp} />*/}
              {/*<ProtectedRoutes*/}
              {/*    path="/users"*/}
              {/*    exact*/}
              {/*    component={Users}*/}
              {/*    role={UserRole.ADMIN}*/}
              {/*/>*/}
              {/*<ProtectedRoutes path="/signin" Component={SignIn} />*/}
              {/*<ProtectedRoutes path="/" Component={App} />*/}

            {/*</ProtectedRoutesSwitch>*/}
            </Switch>
          </Router>
        </Provider>
      </React.Fragment>,
    </div>
  );
}

export default App;
