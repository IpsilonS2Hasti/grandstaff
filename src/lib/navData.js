import SearchIcon from '@mui/icons-material/Search';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkIcon from '@mui/icons-material/Work';

export const navData = [
    {
        path: "/find",
        icon: <SearchIcon />,
        name: "Find"
    },
    {
        path: "/concerts",
        icon: <MusicNoteIcon />,
        name: "Concerts"
    },
    {
        path: "/band",
        icon: <PeopleAltIcon />,
        name: "Band"
    }
];