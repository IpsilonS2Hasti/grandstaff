import React from 'react';
import { useHMSActions } from '@100mslive/react-sdk';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, Menu, MenuItem, alpha } from '@mui/material';

const Permission = ({ audioTrack, id }) => {
  const hmsActions = useHMSActions();
  const changeRole = (role) => {
    hmsActions.changeRole(id, role, true);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          sx: {
              backdropFilter: 'blur(10px)',
              backgroundColor: theme => alpha(theme.palette.background.paper, 0.67),
              borderRadius: "16px"
          },
      }}
      >
        <MenuItem onClick={() => changeRole('listener')}>Направи Слушател</MenuItem>
        <MenuItem onClick={() => changeRole('musician')}>Направи Изпълнител</MenuItem>
      </Menu>
    </div>
  );
};

export default Permission;
