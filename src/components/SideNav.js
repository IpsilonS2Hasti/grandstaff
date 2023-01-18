import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { navData } from '../lib/navData';

const SideNav = () => {
    const { collapseSidebar } = useProSidebar();
    const { pathname } = useLocation();

    return (
        <Sidebar
            // For 720p displays, make width smaller and make it collapsed by default or just have it be perma collapsed
            style={{ position: 'sticky', top: 0, borderRadius: "15px", marginTop: "15px", marginBottom: "15px", height: "90vh" }} rootStyles={{  //!sticky
                border: "none",
                [`.ps-sidebar-container`]: {
                    backgroundColor: '#00000000',
                },
            }}>
            <Menu
                menuItemStyles={{
                    button: ({ active }) => {
                        let style = {
                            [`:hover`]: {
                                backgroundColor: '#eaebef',
                            },
                            borderRadius: '15px',
                            margin: "3px 5px 3px 5px"
                        }
                        if (active) return {
                            ...style,
                            backgroundColor: '#d3e3fd',
                            [`:hover`]: {
                                backgroundColor: '#d3e3fd',
                            },
                        };
                        return style;
                    },
                }}
            >
                {navData.map(cur => (
                    <MenuItem
                        id={cur.name} //Doesn't seem to work?
                        active={pathname === cur.path ? true : false}
                        routerLink={<Link to={cur.path} />}
                        icon={cur.icon}
                    >
                        {cur.name}
                    </MenuItem>
                ))}
            </Menu>
        </Sidebar>
    );
}

export default SideNav;