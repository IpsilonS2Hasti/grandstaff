import { IconButton, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    whiteSpace: 'nowrap'
}));

const SearchBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState('');

    const handleClick = () => {
        searchParams.delete("name");
        searchParams.append("name", query)
        setSearchParams(searchParams); //Change to functional if problems arise
    }

    const keyPress = (e) => {
        if(e.keyCode == 13){
           handleClick();
        }
     }

    return (
        <Search>
                <IconButton onClick={handleClick} sx={{
                    ['&:hover']: theme => ({
                        backgroundColor: alpha(theme.palette.common.white, 0.20),
                    }),
                }}>
                    <SearchIcon style={{color: '#ffffffDD'}}/>
                </IconButton>

            <StyledInputBase
                onKeyDown={keyPress}
                onChange={e => setQuery(e.target.value)}
                placeholder="Потърси по име..."
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    );
}

export default SearchBar;