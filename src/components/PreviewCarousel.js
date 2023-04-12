import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper";
import { Stack } from "@mui/system";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useMediaQuery from '@mui/material/useMediaQuery';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useContext } from "react";
import { EntityContext } from "../context/EntityContext";


const PreviewCarousel = ({ miniMode }) => {
    const { previews, _id } = useContext(EntityContext);
    if (!previews) previews = [];
    const largeScreen = useMediaQuery((theme) => theme.breakpoints.up('xl'));

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
                display={previews ? (previews.length < 2 ? 'none' : 'flex') : 'none'}
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
            >
                <ArrowBackIosNewIcon className={`swiper-button-prev${_id}`} style={{ cursor: 'pointer', width: '50px', height: '36px' }} /> {/* DISABLE ARROWS ON BREAKPOINT!  */}
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
                    pagination={{clickable: 'true'}}
                    modules={[EffectCards, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {previews.map(({type, cover, source}) => (
                        <SwiperSlide style={{ height: !largeScreen || miniMode ? '350px' : '500px', width: !largeScreen || miniMode ? '400px' : '650px' }}>
                            {({ isActive }) => {
                                if (!isActive)
                                    return (
                                        <Box style={{ backgroundImage: `url(${cover})`, backgroundSize: 'cover', height: '100%', width: '100%', borderRadius: '16px' }} />
                                    )
                                return (
                                    <div style={{ borderRadius: '16px', overflow: 'hidden', height: '100%', width: '100%' }}>
                                        {renderSlideContent(type, cover, source)}
                                    </div>
                                )
                            }}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Box
                display={previews.length < 2 ? 'none' : 'flex'}
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
            >
                <ArrowForwardIosIcon className={`swiper-button-next${_id}`} style={{ cursor: 'pointer', width: '36px', height: '36px' }} />
            </Box>
        </Stack>
    );
}

export default PreviewCarousel;