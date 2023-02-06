import { Box, Button, ButtonGroup, IconButton, Popover } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper";
import { alpha, Stack } from "@mui/system";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";
import { FilePond, registerPlugin } from 'react-filepond'
import EditIcon from '@mui/icons-material/Edit';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginMediaPreview from 'filepond-plugin-media-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginMediaPreview);

const EditPreviewCarousel = ({ initPreviews, uid }) => {
    const [previews, setPreviews] = useState([...initPreviews]);
    const [files, setFiles] = useState([]);

    const EditSlide = index => {
        const [anchorEl, setAnchorEl] = useState(null); //popover
        const handleClick = (event) => { //popover
            setAnchorEl(event.currentTarget);
        };
    
        const handleClose = () => { //popover
            setAnchorEl(null);
        };
    
        const open = Boolean(anchorEl); //popover
        const id = open ? 'simple-popover' : undefined; //popover
    
        const deleteItem = index => {
            //DELETE ON SERVER!!
            let bob = [...previews];
            bob.splice(index, 1);
            setPreviews(bob);
        }

        const changeFile = e => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            //SEND TO SERVER AND REFRESH PAGE!!
        };

        return (
            <Stack direction='row' style={{ width: '100%', position: 'absolute', zIndex: '3', justifyContent: 'flex-end' }}>
                <IconButton onClick={handleClick} sx={{backgroundColor: theme => alpha(theme.palette.background.default, 0.25)}}>
                    <EditIcon fontSize="large"/>
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Box width="100px">
                        <ButtonGroup
                            orientation="vertical"
                            aria-label="vertical contained button group"
                            variant="text"
                            fullWidth
                        >
                            <Button key="one" component='label' style={{ borderBottom: 0 }}>
                                Change
                                <input hidden accept="image/*" type="file" onChange={changeFile} />
                            </Button>
                            <Button key="two" onClick={() => { handleClose(); deleteItem(index) }} sx={{ color: 'error.main' }}>Delete</Button>
                        </ButtonGroup>
                    </Box>
                </Popover>
            </Stack>
        )
    }

    const renderSlideContent = (type, cover, source) => {
        if (type === 'video')
            return (
                <video style={{ objectFit: 'cover', width: "100%", height: "100%" }} controls poster={cover}>
                    <source src={source} type="video/mp4" />
                </video>
            )
        if (type === 'image')
            return (
                <Box style={{ backgroundImage: `url(${cover})`, backgroundSize: 'cover', height: '100%', width: '100%', borderRadius: '16px' }} />
            )
    };

    return (
        <Stack direction="row">
            <Box
                display={previews.length < 2 ? 'none' : 'flex'}
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
            >
                <ArrowBackIosIcon allignSelf className={`swiper-button-prev${uid}`} style={{ cursor: 'pointer', width: '50px', height: '36px' }} /> {/* DISABLE ARROWS ON BREAKPOINT!  */}
            </Box>
            <Box maxWidth={'calc(100% - 100px)'} margin={'auto'}> {/* Remake with flex?  */}
                <Swiper
                    allowTouchMove={false}
                    effect={"cards"}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    navigation={{
                        nextEl: `.swiper-button-next${uid}`,
                        prevEl: `.swiper-button-prev${uid}`,
                    }}
                    cardsEffect={{
                        perSlideRotate: '0',
                        perSlideOffset: '15',
                        rotate: false
                    }}
                    pagination={false} // FIX PAGINATION IN FUTURE
                    modules={[EffectCards, Pagination, Navigation]}
                    className="mySwiper"
                >

                    {previews.map(({ type, cover, source }, index) => (
                        <SwiperSlide style={{ height: '500px', width: '400px' }} key={cover} >
                            {({ isActive }) => {
                                if (!isActive)
                                    return (
                                        <Box style={{ backgroundImage: `url(${cover})`, backgroundSize: 'cover', height: '100%', width: '100%', borderRadius: '16px' }} />
                                    )
                                return (
                                    <div style={{ borderRadius: '16px', overflow: 'hidden', height: '100%', width: '100%' }}>
                                        <EditSlide index={index}/>
                                        {renderSlideContent(type, cover, source)}
                                    </div>
                                )
                            }}
                        </SwiperSlide>
                    ))}

                    {
                        previews.length < 5
                            ?
                            <SwiperSlide style={{ height: '500px', width: '400px' }}>
                                <FilePond
                                    files={files}
                                    onupdatefiles={setFiles}
                                    allowMultiple={false}
                                    maxFiles={1}
                                    server="/api"
                                    name="files" /* sets the file input name, it's filepond by default */
                                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                    stylePanelLayout='integrated'
                                    stylePanelAspectRatio='4:5'
                                />
                            </SwiperSlide>
                            :
                            null
                    }
                </Swiper>
            </Box>
            <Box
                display={previews.length < 2 ? 'none' : 'flex'}
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
            >
                <ArrowForwardIosIcon className={`swiper-button-next${uid}`} style={{ cursor: 'pointer', width: '50px', height: '36px' }} />
            </Box>
        </Stack>
    );
}

export default EditPreviewCarousel;