import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Chip, alpha } from '@mui/material';
import Popover from '@mui/material/Popover';
import { useSearchParams } from 'react-router-dom';

const FeedTypeDropdown = ({ data }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    //Fetch type from server (if null set = to musicians)
    const type = "musicians"
    const [selVal, setSelVal] = useState(type)

    let btns = [
        {
            param: "musicians",
            name: 'Музиканти'
        },
        {
            param: 'jobs',
            name: 'Обяви'
        },
        {
            param: 'both',
            name: 'И двете'
        },
    ]

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = param => {
        setSelVal(param);
        console.log(param);
        //Update on server and refresh to show proper feed.
    };

    const labelName = () => {
        const btn = btns.find(btn => btn.param === selVal);
        if (selVal) return <p><b>{"Предпочитам: "}</b> {btn ? btn.name : "???"}</p>;
        return "Предпочитам";
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Chip aria-describedby={id} label={labelName()} onClick={handleClick} sx={ { marginLeft: "25px",backgroundColor: theme => alpha(theme.palette.primary.main, 0.6), color: '#fff', [':hover']: { backgroundColor: theme => alpha(theme.palette.primary.main, 0.7) } } } />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Box width="100px">
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical contained button group"
                        variant="text"
                        fullWidth
                    >
                        {btns.map(({ param, name }) => {
                            if (selVal === param) return (
                                <Button key={param} name={param} style={{ borderBottom: 0 }} sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12), [":hover"]: { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12) } }} onClick={() => { handleClose(); handleChange(param) }}>{name}</Button>
                            );
                            return <Button key={param} name={param} style={{ borderBottom: 0 }} onClick={() => { handleClose(); handleChange(param) }}>{name}</Button>;
                        })}
                    </ButtonGroup>
                </Box>
            </Popover>
        </div>
    );
}

export default FeedTypeDropdown;