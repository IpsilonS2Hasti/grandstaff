import SearchIcon from '@mui/icons-material/Search';
import CompassIcon from '@mui/icons-material/Explore';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';

export const navData = [
    {
        path: "/find",
        icon: <SearchIcon />,
        name: "Find"
    },
    {
        path: "/discover",
        icon: <CompassIcon />,
        name: "Discover"
    },
    {
        path: "/concerts",
        icon: <MusicNoteIcon />,
        name: "Concerts"
    },
    {
        path: "/profile",
        icon: <PersonIcon />,
        name: "Profile"
    }
];