import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link, Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";
import {useAtom} from "jotai";
import {currentUserAtom} from "../atoms/atom";
import GenUtil from "../utils/gen-util";
import FrontendRoutes from "../utils/frontend-routes";
import {homeStyles} from "../constants/styles";
import AuthUtil from "../utils/auth.util";
import UserService from "../services/user.service";
import {UserRole} from "../constants/constants";

const Navbar = ()=>{
    const classes = homeStyles();
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);


    const logout =async () => {
        const token = AuthUtil.getJWTToken();
        AuthUtil.clearJWTToken();
        const res = await UserService.logout(token);
        setCurrentUser(null);
        GenUtil.toastMessage('Logged out successfully')
            return (
                <Redirect
                    to={{
                        pathname: FrontendRoutes.loginRoute,
                    }}
                />
            );
        }


    return(
        <div>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        <Link variant="button" color="textPrimary" to="/trips" className={classes.link}>
                            Trip Planner
                        </Link>
                    </Typography>

                    <Link variant="button" color="textPrimary" to={FrontendRoutes.createTripRoute} className={classes.link}>
                        <Button variant="outlined">Create Trips</Button>
                    </Link>

                    <Link variant="button" color="textPrimary" to={FrontendRoutes.tripsRoute} className={classes.link}>
                        <Button variant="outlined">Trips </Button>
                    </Link>

                    {
                        currentUser && [UserRole.ADMIN, UserRole.MANAGER].includes(currentUser.role)?<Link variant="button" color="textPrimary" to={FrontendRoutes.createUserRoute} className={classes.link}>
                            <Button variant="outlined">Create Users</Button>
                        </Link>:''
                    }
                    {
                        currentUser && [UserRole.ADMIN, UserRole.MANAGER].includes(currentUser.role)?<Link variant="button" color="textPrimary" to={FrontendRoutes.usersRoute} className={classes.link}>
                            <Button variant="outlined">Users</Button>
                        </Link>:''
                    }

                        <Button href="#" color="primary" variant="outlined" className={classes.link} onClick={logout}>
                            Logout
                        </Button>


                </Toolbar>
            </AppBar>
        </div>
    );
}

export  default Navbar;