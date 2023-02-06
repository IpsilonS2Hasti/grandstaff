import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Chip, alpha } from '@mui/material';
import Popover from '@mui/material/Popover';
import { useSearchParams } from 'react-router-dom';

const ChipDropdown = ({ data }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selVal, setSelVal] = useState(data.default)
    const [searchParams, setSearchParams] = useSearchParams();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = name => {
        setSelVal(name);
        searchParams.delete(data.queryParam);
        searchParams.append(data.queryParam, name);
        setSearchParams(searchParams); //Change to functional if problems arise
    };

    const labelName = () => {
        const btn = data.btns.find(btn => btn.param === selVal);
        if (selVal) return <p><b>{`${data.chipName}: `}</b> {btn ? btn.name : "???"}</p>;
        return data.chipName;
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Chip aria-describedby={id} label={labelName()} onClick={handleClick} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.16)', color: '#fff', [':hover']: { backgroundColor: 'rgba(255, 255, 255, 0.24)' } }} />
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
                        {data.btns.map(({ param, name }) => {
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

export default ChipDropdown;