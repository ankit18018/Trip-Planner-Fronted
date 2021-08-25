import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Box, CssBaseline, FormControl, InputLabel, MenuItem, Select,} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, {useCallback, useEffect, useState} from "react";
import {ModalStyles} from "../constants/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import GenUtil from "../utils/gen-util";
import FrontendRoutes from "../utils/frontend-routes";
import {Delete, Update} from "@material-ui/icons";
import PermissionUtil from "../utils/permission.util";
import {useAtom} from "jotai";
import {currentUserAtom} from "../atoms/atom";
import UserService from "../services/user.service";
import UserValidator from "../vallidators/user.validators";
import {UserRole} from "../constants/constants";

const UserCrudContainer = () => {
  const classes = ModalStyles();

  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState({});
  const [action, setAction] = useState();
  const [currentUser] = useAtom(currentUserAtom);
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const loadUser = useCallback(async (userId) => {
    const res = await UserService.getUser(userId);
    if (!res.success) {
      GenUtil.toastError(res.message);
    } else {
      GenUtil.toastMessage(res.data.message);
      setUser(res.data);
    }
    setLoader(false);
  }, []);

  useEffect(() => {
    if (history.location.pathname.includes("create")) {
      setAction("Create");
      setLoader(false);
    } else {
      if (history.location.pathname.includes("view")) setAction("View");

      loadUser(params.id);
    }
  }, [history, loadUser, location, params]);

  const onSubmit = useCallback(
    async (e, act) => {
      e.preventDefault();
      let res;
      if (act === "Create") {
        const { error, value } =
          currentUser.role === UserRole.ADMIN
            ? UserValidator.validateUserByAdminCreateSchema(user)
            : UserValidator.validateUserCreateSchema(user);
        if (error) {
          GenUtil.toastError(error.details[0].message);
          return;
        }
        if (currentUser.role === UserRole.ADMIN)
          res = await UserService.createUserByAdmin(value);
        else res = await UserService.createUser(value);
      }
      else if (act === "Update") {
        delete user.id
        const { error, value } =
          currentUser.role === UserRole.ADMIN
            ? UserValidator.validateUserAdminUpdateSchema(user)
            : UserValidator.validateUserManagerUpdateSchema(user);
        if (error) {
          GenUtil.toastError(error.details[0].message);
          return;
        }
        res = await UserService.updateUser(value, params.id);
      } else if (act === "Delete") {
        res = await UserService.deleteUser(params.id);
      }
      if (!res.success) {
        GenUtil.toastError(res.message);
      } else {
        GenUtil.toastMessage(res.message);
        if (act === "Create" || act === "Delete") {
          history.replace(FrontendRoutes.usersRoute);
        }
      }
    },
    [history, user]
  );

  const showActionButtons = useCallback(() => {
    if (action === "Create") {
      return (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={(e) => onSubmit(e, "Create")}
        >
          Create
        </Button>
      );
    } else if (
      action === "View" &&
      PermissionUtil.canUpdateUser(currentUser, user)
    ) {
      return (
        <Link to={FrontendRoutes.updateUserRoute(user?.id)}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </Link>
      );
    } else {
      return (
        <Grid item xs={12} style={{ padding: "8px" }}>
          <Box display="flex" justifyContent="flex-end">
            {user && PermissionUtil.canUpdateUser(currentUser, user) ? (
              <Box mx={2}>
                <Update
                  className={classes.icon}
                  fontSize="large"
                  color="secondary"
                  onClick={(e) => onSubmit(e, "Update")}
                />
              </Box>
            ) : null}
            {user && PermissionUtil.canDeleteUser(currentUser, user) ? (
              <Box mx={2}>
                <Delete
                  className={classes.icon}
                  fontSize="large"
                  color="secondary"
                  onClick={(e) => onSubmit(e, "Delete")}
                />
              </Box>
            ) : null}
          </Box>
        </Grid>
      );
    }
  }, [action, classes.icon, classes.submit, currentUser, onSubmit, user]);

  if (loader) return <div>loading...</div>;
  return (
    <div>
      <div className={classes.paper} style={{ borderRadius: "10px" }}>
        <Container component="main" maxWidth="xs" style={{ padding: "25px" }}>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              {action}
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    disabled={action === "View"}
                    defaultValue={user?.name}
                    value={user?.name}
                    label="Name"
                    autoFocus
                    onChange={(event) => {
                      setUser({ ...user, name: event.target.value });
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="email"
                    defaultValue={user?.email}
                    value={user?.email}
                    disabled={action === "View"}
                    autoComplete="Email"
                    onChange={(event) => {
                      setUser({ ...user, email: event.target.value });
                    }}
                  />
                </Grid>
                {action === 'View' ? "" :
                    <Grid item xs={12}>
                      <TextField
                          required
                          fullWidth
                          label="Password"
                          defaultValue={user?.password}
                          value={user?.password}
                          disabled={action === "View"}
                          autoComplete="password"
                          onChange={(event) => {
                            setUser({...user, password: event.target.value});
                          }}
                      />
                    </Grid>
                }
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={user?.role}
                      disabled={action === "View"}
                      style={{ width: "120px" }}
                      autoComplete="role"
                      onChange={(e) =>
                        setUser({ ...user, role: e.target.value })
                      }
                    >
                      <MenuItem value={UserRole.REGULAR}>
                        {UserRole.REGULAR}
                      </MenuItem>
                        <MenuItem value={UserRole.MANAGER}>
                          {UserRole.MANAGER}
                        </MenuItem>
                        <MenuItem value={UserRole.ADMIN}>
                          {UserRole.ADMIN}
                        </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {showActionButtons()}
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default UserCrudContainer;
