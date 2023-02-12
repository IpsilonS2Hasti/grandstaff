import SearchIcon from '@mui/icons-material/Search';
import CompassIcon from '@mui/icons-material/Explore';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';

export const navData = [
    {
        path: "/find",
        icon: <SearchIcon />,
        name: "Директория"
    },
    {
        path: "/discover",
        icon: <CompassIcon />,
        name: "Открий"
    },
    {
        path: "/concerts",
        icon: <MusicNoteIcon />,
        name: "Концерти"
    },
    {
        path: "/job",
        icon: <ArticleIcon/>,
        name: "Мои Обяви"
    },
    {
        path: "/profile",
        icon: <PersonIcon />,
        name: "Профил"
    }
];