import { Box, IconButton } from "@mui/material";
import BandTile from "./BandTile";
import MemberTile from "./MemberTile";
import { Stack } from "@mui/system";
import BandCreationPopup from "./BandCreationPopup";
import AddToBand from "./AddToBandPopup";

const InfoStack = ({ isBand }) => {
    const isForeignUser = false;
    //Fetch from server
    const limit = isBand ? 30 : 10;
    const data = isBand ?
        [
            {
                firstName: "Ilhan",
                lastName: "Andonoff",
                pfpUrl: "https://cdn.discordapp.com/attachments/471777194847502351/1039169390064705586/unknown.png",
                instruments: [
                    "Флатуленция",
                    "Пелтечене"
                ]
            }
        ]
        :
        [
            {
                name: "Орк. Глупаците от Долна Джумая",
                pfpUrl: "https://cdn.discordapp.com/attachments/471777194847502351/1037830501530083488/unknown.png",
                genres: [
                    "Чалга",
                    "Маками"
                ],
                memberCount: "7"
            },
            {
                name: "Орк. Глупаците от Долна Джумая 2.0",
                pfpUrl: "https://cdn.discordapp.com/attachments/471777194847502351/1037830501530083488/unknown.png",
                genres: [
                    "Чалга",
                    "Маками"
                ],
                memberCount: "7"
            },
        ]
        ;
    const renderIconButton = () => {
        if (isForeignUser)
            return (
                <Stack direction="row" justifyContent="center" margin="5px">
                    <AddToBand />
                </Stack>
            );
        return (
            <Stack direction="row" justifyContent="center" margin="5px">
                <BandCreationPopup />
            </Stack>
        );
    };
    return (
        <Box sx={{ position: 'fixed', overflowY: 'auto', height: { xl: 'calc(100% - 430px)', lg: 'calc(100% - 330px)' }, lineHeight: 'normal' }}>
            {data.map(
                el => isBand ? <MemberTile {...el} /> : <BandTile {...el} />
            )}
            {
                (data.length < limit) && !isBand
                    ?
                    renderIconButton()
                    :
                    null
            }
        </Box >
    );
}

export default InfoStack;