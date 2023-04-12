import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Slide, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { forwardRef, useEffect, useState } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { addYears } from "date-fns";
import { PickersDay } from "@mui/x-date-pickers";
import { Stack } from "@mui/system";
import axios from "axios";
import { useContext } from "react";
import { EntityContext } from "../context/EntityContext";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const ScheduleCalendar = () => {
    const { editView, _id, type } = useContext(EntityContext);
    const user = JSON.parse(localStorage.getItem('user'));
    const [value, setValue] = useState(new Date());
    useEffect(() => {
        axios({
            method: 'get',
            url: ('https://grandstaff.herokuapp.com/api/schedule/getDatesTaken/' + _id)
        }).then(res => {
            setTakenDays(res.data.datesTaken);
        }).catch(err => {
            //console.log(err);
        });
    }, [])
    const [takenDays, setTakenDays] = useState([]);

    const handleChange = () => {
        const date = `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`
        const index = takenDays.indexOf(date);
        console.log(index);
        console.log(date);
        if (index > -1) {
            if (type === "Band") {
                axios({
                    method: 'patch',
                    url: ('https://grandstaff.herokuapp.com/api/schedule/freeDayBand'),
                    headers: { 'Authorization': 'Bearer ' + (user !== null ? user.token : '0') },
                    data: {
                        days: [date],
                        bandId: _id
                    }
                }).then(res => {
                    setTakenDays(res.data.schedule.datesTaken);
                }).catch(err => {
                    console.log(err);
                });
            } else {
                axios({
                    method: 'patch',
                    url: ('https://grandstaff.herokuapp.com/api/schedule/freeDay'),
                    headers: { 'Authorization': 'Bearer ' + (user !== null ? user.token : '0') },
                    data: {
                        days: [date],
                        jobId: _id
                    }
                }).then(res => {
                    setTakenDays(res.data.schedule.datesTaken);
                }).catch(err => {
                    console.log(err);
                });
            }
            
        } else {
            if (type === "Band") {
                axios({
                    method: 'patch',
                    url: ('https://grandstaff.herokuapp.com/api/schedule/takeDayBand'),
                    headers: { 'Authorization': 'Bearer ' + (user !== null ? user.token : '0') },
                    data: {
                        days: [date],
                        bandId: _id
                    }
                }).then(res => {
                    setTakenDays(res.data.schedule.datesTaken);
                }).catch(err => {
                    console.log(err);
                });
            } else {
                axios({
                    method: 'patch',
                    url: ('https://grandstaff.herokuapp.com/api/schedule/takeDay'),
                    headers: { 'Authorization': 'Bearer ' + (user !== null ? user.token : '0') },
                    data: {
                        days: [date],
                        jobId: _id
                    }
                }).then(res => {
                    setTakenDays(res.data.schedule.datesTaken);
                }).catch(err => {
                    console.log(err);
                });
            }

        }
        //console.log(takenDays);
        setTakenDays(takenDays);
    };

    const handleDoubleClick = (event) => {
        if (event.detail > 1) {
            handleChange();
        }
    }

    return (
        <Box sx={{ position: 'fixed', overflowY: 'auto', height: "inherit", width: 'inherit' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    className="ScheduleCalendar"
                    minDate={Date.now()}
                    maxDate={addYears(Date.now(), 1)}
                    disablePast
                    orientation="landscape"
                    openTo="day"
                    displayStaticWrapperAs="desktop"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    renderDay={(day, _value, DayComponentProps) => {
                        const isSelected = takenDays.includes(`${day.getDate()}-${day.getMonth() + 1}-${day.getFullYear()}`); //Months start from 0?!? Repeat that?!?
                        if (isSelected) return (
                            <PickersDay onClick={editView ? handleDoubleClick : () => { }} {...DayComponentProps} disabled={editView ? false : true} sx={{ backgroundColor: '#d32f2f90', [':hover']: { backgroundColor: '#d32f2fAA' } }} />
                        );
                        return <PickersDay onClick={editView ? handleDoubleClick : () => { }} {...DayComponentProps} sx={{ backgroundColor: '#00000000' }} />
                    }}
                />
                {editView ? <Button style={{ marginLeft: '110px' }} onClick={handleChange}>Промени Дата</Button> : null}
            </LocalizationProvider>
        </Box>
    );
}

export default ScheduleCalendar;