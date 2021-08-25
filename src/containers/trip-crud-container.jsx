import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Box, CssBaseline} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, {useCallback, useEffect, useState} from "react";
import {ModalStyles} from "../constants/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import {Link, useHistory, useLocation, useParams} from "react-router-dom";
import TripValidator from "../vallidators/trip.validator";
import GenUtil from "../utils/gen-util";
import TripService from "../services/trip.service";
import FrontendRoutes from "../utils/frontend-routes";
import {Delete, Update} from "@material-ui/icons";
import PermissionUtil from "../utils/permission.util";
import {useAtom} from "jotai";
import {currentUserAtom} from "../atoms/atom";


const TripCrudContainer = () => {

    const classes = ModalStyles();

    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [comment, setComment] = useState("");
    const [trip, setTrip] = useState(null);
    const [action, setAction] = useState()
    const [currentUser] = useAtom(currentUserAtom);
    const history = useHistory();
    const location = useLocation();
    const params = useParams();


    const loadTrip = useCallback(async (tripId) => {
        const res = await TripService.getTrip(tripId);
        if (!res.success) {
            GenUtil.toastError(res.message);
        } else {
            setTrip(res.data);
            setDestination(res.data.destination);
            setStartDate(res.data.startDate);
            setEndDate(res.data.endDate);
            setComment(res.data.comment);
        }

    }, [])


    useEffect(() => {
        if (history.location.pathname.includes('create')) {
            setAction('Create');
        } else {
            if (history.location.pathname.includes('view'))
                setAction('View');

            loadTrip(params.id);
        }
    }, [history, loadTrip, location, params])


    const onSubmit = useCallback(async (e, act) => {
        e.preventDefault();
        const {error, value} = TripValidator.validateCreateTrip({startDate, endDate, comment, destination});
        console.log(error,value);
        if (error) {
            GenUtil.toastError(error.details[0].message)
        } else {
            value.startDate = GenUtil.formatDateToStr(value.startDate)
            value.endDate = GenUtil.formatDateToStr(value.endDate)
            let res;
            if (act === 'Create')
                res = await TripService.addTrip(value)
            else if (act === 'Update')
                res = await TripService.updateTrip(trip.id, value)
            else if (act === 'Delete')
                res = await TripService.deleteTrip(trip.id)

            if (!res.success) {
                GenUtil.toastError(res.message);
            } else {
                GenUtil.toastMessage(res.message);
                if (act === 'Create' || act === 'Delete') {
                    history.replace(FrontendRoutes.tripsRoute);
                }
            }
        }

    }, [comment, destination, endDate, history, startDate, trip])

    const showActionButtons = useCallback(() => {

        if (action === 'Create') {
            return (<Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => onSubmit(e, 'Create')}
            >
                Create
            </Button>)
        } else if (trip && action === 'View' && PermissionUtil.canUpdateTrip(currentUser, trip)) {

            return (
                <Link to={FrontendRoutes.updateTripRoute(trip?.id)}>
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
            )
        } else {
            return (
                <Grid item xs={12} style={{padding: "8px"}}>
                    <Box display="flex" justifyContent="flex-end">
                        {trip && PermissionUtil.canUpdateTrip(currentUser, trip) ? <Box mx={2}>
                            <Update
                                className={classes.icon}
                                fontSize="large"
                                color="secondary"
                                onClick={(e) => onSubmit(e, 'Update')}
                            />

                        </Box> : null}
                        {trip && PermissionUtil.canUpdateTrip(currentUser, trip) ? <Box mx={2}>
                            <Delete
                                className={classes.icon}
                                fontSize="large"
                                color="secondary"
                                onClick={(e) => onSubmit(e, 'Delete')}
                            />
                        </Box> : null}

                    </Box>

                </Grid>
            )
        }
    }, [action, classes.icon, classes.submit, currentUser, onSubmit, trip]);

    return (<div>
        <div className={classes.paper} style={{borderRadius: "10px"}}>
            <Container component="main" maxWidth="xs" style={{padding: "25px"}}>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        {action}
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="Destination"
                                    required
                                    fullWidth
                                    disabled={action === 'View'}
                                    defaultValue={destination}
                                    value={destination}
                                    label="Destination"
                                    autoFocus
                                    onChange={(event) => {
                                        setDestination(event.target.value)
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            variant="inline"
                                            format="yyyy/MM/dd"
                                            margin="normal"
                                            id="date-picker-inline"
                                            disabled={action === 'View'}
                                            label="Start Date"
                                            value={startDate}
                                            onChange={(date) => {
                                                setStartDate(date ? moment(date).format("YYYY-MM-DD") : null)
                                            }}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            style={{margin: "0px 0px 10px 0px"}}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            variant="inline"
                                            format="yyyy/MM/dd"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="End Date"
                                            value={endDate}
                                            disabled={action === 'View'}
                                            onChange={(date) => {
                                                setEndDate(date ? moment(date).format("YYYY-MM-DD") : null)
                                            }}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            style={{margin: "0px 0px 10px 0px"}}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Comment"
                                    defaultValue={comment}
                                    value={comment}
                                    disabled={action === 'View'}
                                    autoComplete="Comment"
                                    onChange={(event) => {
                                        setComment(event.target.value)
                                    }}
                                />
                            </Grid>

                        </Grid>
                        {showActionButtons()}
                    </form>
                </div>
            </Container>
        </div>
    </div>)
}

export default TripCrudContainer