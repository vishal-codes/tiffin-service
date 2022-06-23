import React, { forwardRef, useEffect, useState } from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Container,
    Dialog,
    IconButton,
    Rating,
    Slide,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import { Close, StarBorder } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Autoplay,
    EffectCoverflow,
    Lazy,
    Navigation,
    Zoom,
    Pagination,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/lazy';
import 'swiper/css/zoom';
import './swipper.css';

import 'swiper/css/pagination';

import { useValue } from '../../context/ContextProvider';

const Transition = forwardRef((props, ref) => {
    return <Slide direction='up' ref={ref} {...props} />;
});

const Tiffin = () => {
    const {
        state: { tiffin },
        dispatch,
    } = useValue();

    const [address, setAddress] = useState(null);

    useEffect(() => {
        if (tiffin) {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${tiffin.lng},${tiffin.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => setAddress(data.features[0]));
        }
    }, [tiffin]);

    const handleClose = () => {
        dispatch({
            type: 'UPDATE_TIFFIN',
            payload: null,
        });
    };

    return (
        <Dialog
            fullScreen
            open={Boolean(tiffin)}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar position='relative'>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='h6'
                        sx={{ ml: 2, flex: 1 }}
                    >
                        {tiffin?.title}
                    </Typography>
                    <IconButton color='inherit' onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container sx={{ pt: 5 }}>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    zoom={true}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={true}
                    modules={[
                        Autoplay,
                        EffectCoverflow,
                        Zoom,
                        Lazy,
                        Navigation,
                        Pagination,
                    ]}
                    effect='coverflow'
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                >
                    {tiffin?.images.map((url) => (
                        <SwiperSlide key={url}>
                            <div className='swiper-zoom-container'>
                                <img
                                    loading='lazy'
                                    src={url}
                                    alt={tiffin?.title}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                    <Tooltip
                        title={tiffin?.uName || ''}
                        sx={{
                            position: 'absolute',
                            bottom: '8px',
                            left: '8px',
                            zIndex: 2,
                        }}
                    >
                        <Avatar src={tiffin?.uPhoto || ''} />
                    </Tooltip>
                </Swiper>
                <Stack sx={{ p: 3 }} spacing={2}>
                    <Stack
                        direction='row'
                        sx={{
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box>
                            <Typography variant='h6' component='span'>
                                {'Price per month: '}
                            </Typography>
                            <Typography component='span'>
                                {tiffin?.price === 0
                                    ? 'Free Tiffin'
                                    : ' ₹' + tiffin?.price}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                diaplay: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant='h6' component='span'>
                                {'Ratings: '}
                            </Typography>
                            <Rating
                                name='tiffin-ratings'
                                defaultValue={3.5}
                                precision={0.5}
                                emptyIcon={<StarBorder />}
                            />
                        </Box>
                    </Stack>
                    <Stack
                        direction='row'
                        sx={{
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Box>
                            <Typography variant='h6' component='span'>
                                {'Tiffin Service Name: '}
                            </Typography>
                            <Typography component='span'>
                                {tiffin?.title}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='h6' component='span'>
                                {'Address: '}
                            </Typography>
                            <Typography component='span'>
                                {address?.place_name}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack>
                        <Typography variant='h6' component='span'>
                            {'Details: '}
                        </Typography>
                        <Typography component='span'>
                            {tiffin?.description}
                        </Typography>
                    </Stack>
                </Stack>
            </Container>
        </Dialog>
    );
};

export default Tiffin;
