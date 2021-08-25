import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useAtom} from "jotai";
import {toast} from "react-toastify";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {Box, CircularProgress} from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import {signInStyles} from "../constants/styles";
import {currentUserAtom} from "../atoms/atom";
import UserValidator from "../vallidators/user.validators";
import GenUtil from "../utils/gen-util";
import UserService from "../services/user.service";
import AuthUtil from "../utils/auth.util";
import FrontendRoutes from "../utils/frontend-routes";

const LoginContainer = () => {
    const classes = signInStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
    const history = useHistory();

    async function handleSignIn(event) {
        event.preventDefault();

        const { error, value } = UserValidator.validateUser({
            email,
            password,
        });

        if (error) {
            GenUtil.toastError(error.details[0].message);
        } else {
            const res = await UserService.login(value);

            if (!res.success) {
                GenUtil.toastError(res.message);
            } else {
                GenUtil.toastMessage(res.message);
                AuthUtil.setJWTToken(res.data.jwtToken);
                setCurrentUser(res.data);
                history.replace(FrontendRoutes.tripsRoute);
            }

        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => setPassword(event.target.value)}
                    />


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => handleSignIn(e)}
                    >
                        Sign In
                    </Button>
                    <Grid container>

                        <Grid item>
                            <Link to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
};

export default LoginContainer;