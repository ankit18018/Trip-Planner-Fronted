import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Button, Chip, Paper,} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {homeStyles} from "../constants/styles";
import GenUtil from "../utils/gen-util";
import {GenConst} from "../constants/constants";
import {useAtom} from "jotai";
import {currentUserAtom} from "../atoms/atom";
import FrontendRoutes from "../utils/frontend-routes";
import {Link} from "react-router-dom";
import UserService from "../services/user.service";
import PermissionUtil from "../utils/permission.util";

const UserContainer = () => {
  const classes = homeStyles();

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const [currentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    fetchUsers({ page: 0 });
  }, []);

  const fetchUsers = async ({ page }) => {
    const res = await UserService.getUsers(page);
    if (!res.success) {
      GenUtil.toastError(res.message);
    } else {
      const usrs = res.data;
      if (usrs.length < GenConst.pageLimit) {
        setShowLoadMore(false);
      }
      if (page > 0) setUsers([...users, ...usrs]);
      else setUsers([...usrs]);
      setPage((page) => page + 1);
    }
  };

  const onLoadMore = () => {
    console.log({page})
    fetchUsers({page});
  };

  return (
    <div>
      <div style = {{    display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center",
      marginTop: "20px"}}>
        <h2>Users</h2>
      {users &&
        users.map((user) => (
          // Enterprise card is full width at sm breakpoint
          <Grid
              item key={user.id} xs={12}   style={{padding: "0px 113px 20px",width:"70%"}}
          >
            <Card style={{ border: "1px solid #cfcccf" }}>
              <CardContent style={{ padding: "14px 50px" }}>
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={12}
                  >
                      <Typography  variant="h6" style = {{fontSize:"28px"}}>
                        {user.name}
                      </Typography>
                  </Grid>
                  <Grid
                      item xs={12}  style={{ paddingBottom: "18px"}}  >
                      <Typography style = {{fontSize:"18px"}}>
                        {user.email}
                      </Typography>
                  </Grid>
                  <Grid
                      item xs={12} style={{paddingBottom: "10px"}}>

                      <Typography color="disabled">
                        {user.role}
                      </Typography>
                  </Grid>
                  <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center">
                    <Grid item xs={12} sm={6} style={{ paddingBottom: "7px",textAlign:"start"}}>

                      {
                        <Link to={FrontendRoutes.viewUserRoute(user.id)} className ={classes.link}>
                          <Button variant="contained" color="primary">
                            View
                          </Button>
                        </Link>
                      }
                    </Grid>

                    <Grid item xs={12}   sm={6}style={{ paddingBottom: "7px",textAlign: "end"}}>

                      { user && PermissionUtil.canUpdateUser(currentUser,user) &&
                        <Link to={FrontendRoutes.updateUserRoute(user.id)} className ={classes.link}>
                          <Button variant="contained" color="secondary">
                            Update
                          </Button>
                        </Link>
                      }
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}

      {showLoadMore ? (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          m={2}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "25px" }}
            onClick={onLoadMore}
          >
            Load More
          </Button>
        </Grid>
      ) : (
        ""
      )}
      </div>
    </div>
  );
};

export default UserContainer;
