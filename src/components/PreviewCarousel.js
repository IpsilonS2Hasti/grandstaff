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


const PreviewCarousel = ({ previews, uid, miniMode }) => {
    const largeScreen = useMediaQuery((theme) => theme.breakpoints.up('xl'));

    return (
        <Stack direction="row">
            <Box
                display={previews.length < 2 ? 'none' : 'flex'}
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
            >
                <ArrowBackIosNewIcon allignSelf className={`swiper-button-prev${uid}`} style={{ cursor: 'pointer', width: '36px', height: '36px' }} /> {/* DISABLE ARROWS ON BREAKPOINT!  */}
            </Box>
            <Box maxWidth={'calc(100% - 76px)'} margin={'auto'}> {/* Remake with flex?  */}
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
                        perSlideOffset: '10',
                        rotate: false
                    }}
                    pagination={{clickable: 'true'}}
                    modules={[EffectCards, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {previews.map(({ type, cover, source }) => (
                        <SwiperSlide style={{ height: !largeScreen || miniMode ? '350px' : '500px', width: !largeScreen || miniMode ? '400px' : '650px' }}>
                            {({ isActive }) => (
                                isActive ?
                                    <div style={{ borderRadius: '16px', overflow: 'hidden', zIndex: 1, height: '100%', width: '100%' }}>
                                        <video style={{ objectFit: 'cover', width: "100%", height: "100%" }} controls poster={cover}>
                                            <source src={source} type="video/mp4" />
                                        </video>
                                    </div>
                                    :
                                    <Box style={{ backgroundImage: `url(${cover})`, backgroundSize: 'cover', height: '100%', width: '100%', borderRadius: '16px' }} />
                            )}
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
                <ArrowForwardIosIcon className={`swiper-button-next${uid}`} style={{ cursor: 'pointer', width: '36px', height: '36px' }} />
            </Box>
        </Stack>
    );
}

export default PreviewCarousel;