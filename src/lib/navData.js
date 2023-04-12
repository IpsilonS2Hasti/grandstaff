import SearchIcon from '@mui/icons-material/Search';
import CompassIcon from '@mui/icons-material/Explore';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import SendIcon from '@mui/icons-material/Send';

export const navData = [
    {
        path: "/find",
        icon: <SearchIcon />,
        name: "Директория"
    },
    {
        path: "/",
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
        path: "/messages",
        icon: <SendIcon />,
        name: "Съобщения"
    },
    {
        path: "/profile",
        icon: <PersonIcon />,
        name: "Профил"
    }
];