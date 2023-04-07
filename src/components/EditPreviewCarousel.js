import { Box, Button, ButtonGroup, IconButton, Popover, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper";
import { alpha, Stack } from "@mui/system";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";
import { FilePond, registerPlugin } from 'react-filepond'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginMediaPreview from 'filepond-plugin-media-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css';
import { useLocation, useParams } from "react-router";
import { useContext } from "react";
import { EntityContext } from "../context/EntityContext";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginMediaPreview);

const EditPreviewCarousel = ({ miniMode }) => {
    const { previews: initPreviews, _id, type } = useContext(EntityContext);
    let isBand = type === "Band";
    const [previews, setPreviews] = useState([...initPreviews]);
    const [files, setFiles] = useState([]);
    const { pathname } = useLocation();
    let inJob = false;
    if (pathname.includes('/job')) inJob = true;
    const user = JSON.parse(localStorage.getItem('user'));

    const updateFiles = (newFiles) => {
        console.log("BOB!",newFiles);
        setPreviews(prev => (
            [
                ...prev,
                {
                    cover
                        :
                        "https://cdn.discordapp.com/attachments/802212627405078578/1093242271501123604/image.png",
                    source
                        :
                        "https://cdn.discordapp.com/attachments/802212627405078578/1093242271501123604/image.png",
                    type
                        :
                        "image",
                    _id
                        :
                        "642dbba918b6289b05a3278e"
                }
            ]
        ));
    }

    const EditSlide = index => {
        index = index.index;
        const [anchorEl, setAnchorEl] = useState(null); //popover
        const handleClick = (event) => { //popover
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => { //popover
            setAnchorEl(null);
        };

        const open = Boolean(anchorEl); //popover
        const id = open ? 'simple-popover' : undefined; //popover

        function deleteItem(index) {
            //DELETE ON SERVER!!
            console.log('delete' + (index));
            axios({
                method: "delete",
                url: (isBand ? `https://grandstaff.herokuapp.com/api/media/removeMediaBand/${(previews.at(index).source.split('/')[4])}/${user.token}/${_id}` : (inJob ? `https://grandstaff.herokuapp.com/api/media/removeMediaJob/${(previews.at(index).source.split('/')[4])}/${user.token}/${_id}` : `https://grandstaff.herokuapp.com/api/media/removeMedia/${(previews.at(index).source.split('/')[4])}/${user.token}`))
            })
                .then(res => {
                    let b = [...previews];
                    b.splice(index, 1);
                    setPreviews(b);
                })
        }

        const changeFile = e => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('imageIndex', index);
            console.log(formData.get('imageIndex'));
            axios({
                method: "post",
                url: (isBand ? ('https://grandstaff.herokuapp.com/api/media/addMediaBand/' + user.token + '/' + _id) : (inJob ? `https://grandstaff.herokuapp.com/api/media/addMediaJob/${user.token}/${_id}` : `https://grandstaff.herokuapp.com/api/media/addMedia/${user.token}`)),
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    console.log(response);
                    axios({
                        method: "delete",
                        url: (isBand ? `https://grandstaff.herokuapp.com/api/media/removeMediaBand/${(previews.at(index).source.split('/')[4])}/${user.token}/${_id}` : (inJob ? `https://grandstaff.herokuapp.com/api/media/removeMediaJob/${(previews.at(index).source.split('/')[4])}/${user.token}/${_id}` : `https://grandstaff.herokuapp.com/api/media/removeMedia/${(previews.at(index).source.split('/')[4])}/${user.token}`))
                    })
                        .then(function (response) {
                            window.location.reload(true);
                        })
                })
        };

        return (
            <Stack direction='row' style={{ width: '100%', position: 'absolute', zIndex: '3', justifyContent: 'flex-end' }}>
                <IconButton onClick={handleClick} sx={{ backgroundColor: theme => alpha(theme.palette.background.default, 0.25) }}>
                    <EditIcon fontSize="large" />
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
                                <input hidden accept="image/png, image/jpeg, image/jpg" type="file" onChange={changeFile} />
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

    const largeScreen = useMediaQuery((theme) => theme.breakpoints.up('xl'));

    return (
        <Stack direction="row">
            <Box
                display={previews.length < 1 ? 'none' : 'flex'}
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
            >
                <ArrowBackIosNewIcon alignSelf className={`swiper-button-prev${_id}`} style={{ cursor: 'pointer', width: '50px', height: '36px' }} /> {/* DISABLE ARROWS ON BREAKPOINT!  */}
            </Box>
            <Box maxWidth={'calc(100% - 76px)'} margin={'auto'}> {/* Remake with flex?  */}
                <Swiper
                    allowTouchMove={false}
                    effect={"cards"}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    navigation={{
                        nextEl: `.swiper-button-next${_id}`,
                        prevEl: `.swiper-button-prev${_id}`,
                    }}
                    cardsEffect={{
                        perSlideRotate: '0',
                        perSlideOffset: '10',
                        rotate: false
                    }}
                    pagination={{ clickable: false }}
                    modules={[EffectCards, Pagination, Navigation]}
                    className="editSwiper"
                >

                    {previews.map(({ type, cover, source }, index) => (
                        <SwiperSlide style={{ height: !largeScreen || miniMode ? '350px' : '500px', width: !largeScreen || miniMode ? '400px' : '650px' }}>
                            {({ isActive }) => {
                                if (!isActive)
                                    return (
                                        <Box style={{ backgroundImage: `url(${cover})`, backgroundSize: 'cover', height: '100%', width: '100%', borderRadius: '16px' }} />
                                    )
                                return (
                                    <div style={{ borderRadius: '16px', overflow: 'hidden', height: '100%', width: '100%' }}>
                                        <EditSlide index={index} />
                                        {renderSlideContent(type, cover, source)}
                                    </div>
                                )
                            }}
                        </SwiperSlide>
                    ))}

                    {
                        previews.length < 10
                            ?
                            <SwiperSlide style={{ height: miniMode ? '350px' : '500px', width: !largeScreen || miniMode ? '400px' : '650px' }}>
                                <Box sx={{ backdropFilter: 'blur(15px)', backgroundColor: theme => theme.palette.mode === 'dark' ? "#878787AA" : alpha(theme.palette.background.default, 0.67), borderRadius: '16px' }}>
                                    <FilePond
                                        files={files}
                                        onupdatefiles={setFiles}
                                        onprocessfile={updateFiles}
                                        allowMultiple={false}
                                        maxFiles={1}
                                        server={isBand ? ('https://grandstaff.herokuapp.com/api/media/addMediaBand/' + user.token + '/' + _id) : (inJob ? `https://grandstaff.herokuapp.com/api/media/addMediaJob/${user.token}/${_id}` : `https://grandstaff.herokuapp.com/api/media/addMedia/${user.token}`)}
                                        name="files" /* sets the file input name, it's filepond by default */
                                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                        stylePanelLayout='integrated'
                                        stylePanelAspectRatio={largeScreen && !miniMode ? '650:500' : '400:350'}
                                        credits={false}
                                    />
                                </Box>
                            </SwiperSlide>
                            :
                            null
                    }
                </Swiper>
            </Box>
            <Box
                display={previews.length < 1 ? 'none' : 'flex'}
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
            >
                <ArrowForwardIosIcon className={`swiper-button-next${_id}`} style={{ cursor: 'pointer', width: '50px', height: '36px' }} />
            </Box>
        </Stack>
    );
}

export default EditPreviewCarousel;