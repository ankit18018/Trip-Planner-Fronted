import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  ListItemText,
  Paper,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import moment from "moment";
import TripService from "../services/trip.service";
import { homeStyles } from "../constants/styles";
import GenUtil from "../utils/gen-util";
import { GenConst, UserRole } from "../constants/constants";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import { useAtom } from "jotai";
import { currentUserAtom } from "../atoms/atom";
import FrontendRoutes from "../utils/frontend-routes";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

const TripsContainer = () => {
  const classes = homeStyles();

  const [trips, setTrips] = useState([]);
  const [page, setPage] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const [minStartDate, setMinStartDate] = useState(null);
  const [maxStartDate, setMaxStartDate] = useState(null);
  const [minEndDate, setMinEndDate] = useState(null);
  const [maxEndDate, setMaxEndDate] = useState(null);
  const [destination, setDestination] = useState("");
  const [currentUser] = useAtom(currentUserAtom);
  const [ownTrips, setOwnTrips] = useState(false);

  useEffect(() => {
    fetchTrips({
      minStartDate,
      minEndDate,
      maxStartDate,
      maxEndDate,
      ownTrips,
      page: 0,
    });
  }, []);

  const resetFilter = () => {
    setMinStartDate(null);
    setMaxStartDate(null);
    setMinEndDate(null);
    setMaxEndDate(null);
    setDestination("");
    setOwnTrips(false);
  };

  const getTripDaysCount = (startDate) => {
    const currDate = moment(new Date()).format("YYYY-MM-DD");
    return moment.duration(moment(startDate).diff(currDate)).asDays();
  };

  const fetchTrips = async ({
    minStartDate,
    maxStartDate,
    minEndDate,
    maxEndDate,
    ownTrips,
    destination,
    nextMonthPlan,
    page,
  }) => {
      console.log({
          min_start_date: minStartDate,
          max_start_date: maxStartDate,
          min_end_date: minEndDate,
          max_end_date: maxEndDate,
          own_trips: ownTrips,
          destination,
          page,
          next_month_plan: nextMonthPlan,
      })
    const res = await TripService.getTrips({
      min_start_date: minStartDate,
      max_start_date: maxStartDate,
      min_end_date: minEndDate,
      max_end_date: maxEndDate,
      own_trips: ownTrips,
      destination,
      page,
      next_month_plan: nextMonthPlan,
    });
    if (!res.success) {
      GenUtil.toastError(res.message);
    } else {
      const trps = res.data;
      console.log(trps)
      if (trps.length < GenConst.pageLimit) {
        setShowLoadMore(false);
      }
      if (page > 0) {
          setTrips([...trips, ...trps]);
      }
      else setTrips([...trps]);
      setPage((page) => page + 1);
    }
  };

  const onSearchTrips = () => {
    fetchTrips({
      minStartDate,
      maxStartDate,
      minEndDate,
      maxEndDate,
      ownTrips,
      destination,
      page: 0,
    });
  };

  const onNextMonthPlan = () => {
    fetchTrips({
      minStartDate: moment().add(1, "M").startOf("month").format("YYYY-MM-DD"),
      maxStartDate: moment().add(1, "M").endOf("month").format("YYYY-MM-DD"),
      minEndDate: moment().add(1, "M").startOf("month").format("YYYY-MM-DD"),
      maxEndDate: moment().add(1, "M").endOf("month").format("YYYY-MM-DD"),
      ownTrips,
      page: 0,
      nextMonthPlan: true,
    });
  };

  const onLoadMore = () => {
    fetchTrips({
      minStartDate,
      maxStartDate,
      minEndDate,
      maxEndDate,
      ownTrips,
      page,
    });
  };

  return (
    <div>
      <div
        style={{
          width: "60%",
          margin: "20px auto",
          border: "1px solid #cfcccf",
        }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container>
            <Grid container justify="space-around">
              <Grid item xs={12} sm={3}>
                <KeyboardDatePicker
                  variant="inline"
                  format="yyyy/MM/dd"
                  margin="normal"
                  id="date-picker-inline"
                  label="Min Start Date"
                  value={minStartDate}
                  onChange={(date) =>
                    setMinStartDate(
                      date ? moment(date).format("YYYY-MM-DD") : null
                    )
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <KeyboardDatePicker
                  variant="inline"
                  format="yyyy/MM/dd"
                  margin="normal"
                  id="date-picker-inline"
                  label="Max Start Date"
                  value={maxStartDate}
                  onChange={(date) =>
                    setMaxStartDate(
                      date ? moment(date).format("YYYY-MM-DD") : null
                    )
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </Grid>

            <Grid container justify="space-around">
              <Grid item xs={12} sm={3}>
                <KeyboardDatePicker
                  variant="inline"
                  format="yyyy/MM/dd"
                  margin="normal"
                  id="date-picker-inline"
                  label="Min End Date"
                  value={minEndDate}
                  onChange={(date) =>
                    setMinEndDate(
                      date ? moment(date).format("YYYY-MM-DD") : null
                    )
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <KeyboardDatePicker
                  variant="inline"
                  format="yyyy/MM/dd"
                  margin="normal"
                  id="date-picker-inline"
                  label="Max End date"
                  value={maxEndDate}
                  onChange={(date) =>
                    setMaxEndDate(
                      date ? moment(date).format("YYYY-MM-DD") : null
                    )
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </Grid>
            <Grid container justify="space-around">
              <Grid item xs={12} sm={3}>
                <TextField
                  type="text"
                  variant="standard"
                  required
                  style={{ width: "250px" }}
                  label="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                {currentUser && currentUser.role === UserRole.ADMIN ? (
                  <FormControlLabel
                    checked={ownTrips}
                    control={<Checkbox checked={ownTrips} name="checkedA" />}
                    onChange={(e) => setOwnTrips(e.target.checked)}
                    style={{ marginTop: "12px" }}
                    label="Own Trips only"
                  />
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>

        <Box display="flex" justifyContent="center" pb={1} my={2}>
          <Button
            variant="contained"
            color="primary"
            className={classes.filterBtn}
            onClick={onNextMonthPlan}
          >
            Next Month Plan
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.filterBtn}
            onClick={onSearchTrips}
          >
            Search Trips
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.filterBtn}
            onClick={resetFilter}
          >
            Clear Filter
          </Button>
        </Box>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {trips &&
          trips.map((trip) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={trip.id}
              xs={12}
              style={{ padding: "0px 113px 20px", width: "70%" }}
            >
              <Card style={{ border: "1px solid #cfcccf" }}>
                <CardContent style={{ padding: "10px 40px" }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="h6" style={{ fontSize: "28px" }}>
                        {trip.destination}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ paddingBottom: "7px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "220px",
                          margin: "auto",
                        }}
                      >
                        <Typography style={{ fontSize: "18px" }}>
                          {trip.startDate}
                        </Typography>
                        <span
                          style={{
                            borderTop: "2px solid black",
                            width: "16px",
                            marginTop: "12px",
                          }}
                        ></span>
                        <Typography style={{ fontSize: "18px" }}>
                          {trip.endDate}
                        </Typography>
                      </div>
                    </Grid>

                    {trip.comment ? (
                      <Grid item xs={12} style={{ paddingBottom: "7px" }}>
                        <Typography>{trip.comment}</Typography>
                      </Grid>
                    ) : null}

                    <Grid item xs={12} style={{ paddingBottom: "7px" }}>
                      {getTripDaysCount(trip.startDate) > 0 ? (
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                          <Chip
                            color="primary"
                            label={`${getTripDaysCount(
                              trip.startDate
                            )} days to go`}
                          />
                        </Grid>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      style={{ paddingBottom: "7px", textAlign: "start" }}
                    >
                      {
                        <Link
                          to={FrontendRoutes.viewTripRoute(trip.id)}
                          className={classes.link}
                        >
                          <Button variant="contained" color="primary">
                            View
                          </Button>
                        </Link>
                      }
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      style={{ paddingBottom: "7px", textAlign: "end" }}
                    >
                      {
                        <Link
                          to={FrontendRoutes.updateTripRoute(trip?.id)}
                          className={classes.link}
                        >
                          <Button variant="contained" color="secondary">
                            Update
                          </Button>
                        </Link>
                      }
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </div>
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
  );
};

export default TripsContainer;
