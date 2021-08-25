import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import Box from "@material-ui/core/Box";
import {currentUserAtom} from "../atoms/atom";
import {UserRole} from "../constants/constants";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {useAtom} from "jotai";
import {homeStyles} from "../constants/styles";

const FilterComponent = ({onSearchTrips, onNextMonthPlan}) => {

    const [minStartDate, setMinStartDate] = useState();
    const [maxStartDate, setMaxStartDate] = useState();
    const [minEndDate, setMinEndDate] = useState();
    const [maxEndDate, setMaxEndDate] = useState();
    const [currentUser] = useAtom(currentUserAtom);
    const [ownTrips, setOwnTrips] = useState(false);

    const classes = homeStyles();

    const resetFilter = () => {
        setMinStartDate(null);
        setMaxStartDate(null);
        setMinEndDate(null);
        setMaxEndDate(null);
        setOwnTrips(false);
    }

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        variant="inline"
                        format="yyyy/MM/dd"
                        margin="normal"
                        id="date-picker-inline"
                        label="Min Start Date"
                        value={minStartDate}
                        onChange={(date)=> setMinStartDate(date?moment(date).format("YYYY-MM-DD"):null)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        variant="inline"
                        format="yyyy/MM/dd"
                        margin="normal"
                        id="date-picker-inline"
                        label="Max Start Date"
                        value={maxStartDate}
                        onChange={(date)=> setMaxStartDate(date?moment(date).format("YYYY-MM-DD"):null)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        variant="inline"
                        format="yyyy/MM/dd"
                        margin="normal"
                        id="date-picker-inline"
                        label="Min End Date"
                        value={minEndDate}
                        onChange={(date)=> setMinEndDate(date?moment(date).format("YYYY-MM-DD"):null)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        variant="inline"
                        format="yyyy/MM/dd"
                        margin="normal"
                        id="date-picker-inline"
                        label="Max End date"
                        value={maxEndDate}
                        onChange={(date)=> setMaxEndDate(date?moment(date).format("YYYY-MM-DD"):null)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />

                </Grid>
            </MuiPickersUtilsProvider>
            {
                currentUser && currentUser.role === UserRole.ADMIN?<Box display="flex" justifyContent="center" >
                    <FormControlLabel
                        checked={ownTrips}
                        control={<Checkbox checked={ownTrips}  name="checkedA" />}
                        onChange = {e=>setOwnTrips(e.target.checked)}
                        label="Check Own Trips"
                    />
                </Box>:''
            }

            <Box display="flex" justifyContent="center" pb={1} my={2}>
                <Button variant="contained" color="primary" className={classes.filterBtn} onClick={e => onNextMonthPlan({ownTrips})}>
                    Next Month Plan
                </Button>
                <Button variant="contained" color="primary" className={classes.filterBtn} onClick={(e)=> onSearchTrips({
                    minStartDate,
                    maxStartDate,
                    minEndDate,
                    maxEndDate,
                    ownTrips
                })}>
                    Search Trips
                </Button>
                <Button variant="contained" color="secondary" className={classes.filterBtn} onClick={resetFilter}>
                    Clear Filter
                </Button>
            </Box>
        </div>
    )
}

export default FilterComponent;