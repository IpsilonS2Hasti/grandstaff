import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Slide, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { forwardRef, useState } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { addYears } from "date-fns";
import { PickersDay } from "@mui/x-date-pickers";
import { Stack } from "@mui/system";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const ScheduleCalendar = ({ editView=true }) => {
    const [value, setValue] = useState(new Date());
    const [takenDays, setTakenDays] = useState(['4-2-2023']); //GET FROM SERVER!!

    const handleChange = () => {
        const date = `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`
        const index = takenDays.indexOf(date);
        if (index > -1) {
            takenDays.splice(index, 1);
        } else takenDays.push(date);
        console.log(takenDays);
        setTakenDays(takenDays);
    };

    return (

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
                        <PickersDay {...DayComponentProps} disabled={editView ? false : true} sx={{ backgroundColor: '#d32f2f90', [':hover']: { backgroundColor: '#d32f2fAA' } }} />
                    );
                    return <PickersDay {...DayComponentProps} sx={{ backgroundColor: '#00000000'}} />
                }}
            />
            {editView ? <Button style={{marginLeft: '110px'}} onClick={handleChange}>Промени Дата</Button> : null}
        </LocalizationProvider>
    );
}

export default ScheduleCalendar;