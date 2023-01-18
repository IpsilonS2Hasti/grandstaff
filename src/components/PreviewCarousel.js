import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper";
import { Stack } from "@mui/system";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


const PreviewCarousel = ({ previews, uid }) => {
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
                    {previews.map(bg => (
                        <SwiperSlide style={{ height: '500px', width: '400px' }}>
                            {({ isActive }) => (
                                isActive ?
                                    <div style={{ borderRadius: '16px', overflow: 'hidden', zIndex: 1, height: '100%', width: '100%' }}>
                                        <video style={{objectFit: 'cover',  width: "100%", height:"100%"}} controls poster={bg}>
                                            <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4" />
                                        </video>
                                    </div>
                                    :
                                    <Box style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', height: '100%', width: '100%', borderRadius: '16px' }} />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Box
                display={previews.length < 3 ? 'none' : 'flex'}
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
            >
                <ArrowForwardIosIcon className={`swiper-button-next${uid}`} style={{ cursor: 'pointer', width: '50px', height: '36px' }} />
            </Box>
        </Stack>
    );
}

export default PreviewCarousel;