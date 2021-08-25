import React, {useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {Link, useHistory} from "react-router-dom";
import {CircularProgress, FormControl, InputLabel, MenuItem, Select,} from "@material-ui/core";

import {useAtom} from "jotai";

import {currentUserAtom} from "../atoms/atom";
import {signUpStyles} from "../constants/styles";
import {UserRole} from "../constants/constants";
import UserValidator from "../vallidators/user.validators";
import GenUtil from "../utils/gen-util";
import UserService from "../services/user.service";
import AuthUtil from "../utils/auth.util";
import FrontendRoutes from "../utils/frontend-routes";


export default function SignupContainer(props) {
    const classes = signUpStyles();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState(UserRole.REGULAR);
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
    const history = useHistory();
    const createUser = async (e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            password,
            role,
        };
        const { error, value } = UserValidator.validateUserCreateSchema(data);

        if (error) {
            GenUtil.toastError(error.details[0].message);
        } else {
            const res = await UserService.createUser(value);
            if (!res.success) {
                GenUtil.toastError(res.message);
            }else {
                GenUtil.toastMessage(res.message);
                AuthUtil.setJWTToken(res.data.jwtToken);
                setCurrentUser(res.data);
                history.replace(FrontendRoutes.loginRoute);
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Name"
                                autoFocus
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Email"
                                autoFocus
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                variant="outlined"
                                required
                                fullWidth
                                label="Password"
                                autoFocus
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    style = {{width:"120px"}}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <MenuItem value={UserRole.REGULAR}>{UserRole.REGULAR}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(event) => createUser(event)}
                    >
                        SignUp
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/signin">Already have an account? Sign in</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}></Box>
        </Container>
    );
}

