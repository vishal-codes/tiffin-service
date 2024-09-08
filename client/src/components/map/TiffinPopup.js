import React from 'react';
import { Box, Card, ImageListItem, ImageListItemBar } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Lazy } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/lazy';

import { useValue } from '../../context/ContextProvider';

const TiffinPopup = ({ popupInfo }) => {
    const { title, description, price, images } = popupInfo;
    const { dispatch } = useValue();

    return (
        <Card>
            <ImageListItem sx={{ display: 'block' }}>
                <ImageListItemBar
                    sx={{
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%), rgba(0,0,0,0) 100%)',
                        zIndex: 2,
                    }}
                    title={price === 0 ? 'Free Tiffin ' : ' $' + price}
                    position='top'
                />
                <ImageListItemBar
                    title={title}
                    subtitle={description.substr(0, 30) + '...'}
                    sx={{ zIndex: 2 }}
                />
                <Swiper
                    modules={[Autoplay, Pagination, Lazy]}
                    autoplay
                    lazy
                    pagination={{ clickable: true }}
                    style={{
                        '--swiper-pagination-color': 'rgba(255,255,255, 0.8)',
                        '--swiper-pagination-bullet-inactive-color': '#fff',
                        '--swiper-pagination-bullet-inactive-opacity': 0.5,
                    }}
                >
                    {images.map((url) => (
                        <SwiperSlide key={url}>
                            <Box
                                component='img'
                                loading='lazy'
                                src={url}
                                alt='tiffin'
                                sx={{
                                    height: 255,
                                    display: 'block',
                                    overflow: 'hidden',
                                    width: '100%',
                                    cursor: 'pointer',
                                    objectFit: 'cover',
                                }}
                                onClick={() =>
                                    dispatch({
                                        type: 'UPDATE_TIFFIN',
                                        payload: popupInfo,
                                    })
                                }
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </ImageListItem>
        </Card>
    );
};

export default TiffinPopup;
