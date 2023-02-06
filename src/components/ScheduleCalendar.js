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

const ScheduleCalendar = ({ editView }) => {
    const [value, setValue] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [takenDays, setTakenDays] = useState(['4-2-2023']); //GET FROM SERVER!!

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        <div>
            <Stack direction='row' justifyContent={'center'} sx={{ position: 'absolute', bottom: '5px', width: '100%' }}>
                <Button variant="text" onClick={handleClickOpen} endIcon={<CalendarMonthIcon />}>Open Schedule</Button>
            </Stack>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    {'Schedule'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker
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
                                        <PickersDay {...DayComponentProps} disabled={editView ? false : true} sx={{ backgroundColor: '#d32f2f30', [':hover']:{backgroundColor: '#d32f2f40'} }} />
                                    );
                                    return <PickersDay {...DayComponentProps} />
                                }}
                            />
                        </LocalizationProvider>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {editView ? <Button onClick={handleChange}>Change</Button> : null}
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ScheduleCalendar;