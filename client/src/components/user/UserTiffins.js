import React, { useEffect, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { getUserTiffins } from '../../actions/tiffin';
import {
    Avatar,
    Card,
    Container,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Rating,
    Tooltip,
} from '@mui/material';
import { StarBorder } from '@mui/icons-material';

const UserTiffins = () => {
    const {
        state: { currentUser },
        dispatch,
    } = useValue();

    const [filteredTiffins, setTiffins] = useState([]);

    useEffect(() => {
        const fetchTiffins = async () => {
            const result = await getUserTiffins(currentUser, dispatch);
            if (result) {
                setTiffins(result);
            }
        };
        fetchTiffins();
    }, [currentUser, dispatch]);

    return (
        <Container>
            <ImageList
                gap={12}
                sx={{
                    mb: 8,
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(280px, 1fr))!important',
                }}
            >
                {filteredTiffins.length > 0 ? (
                    filteredTiffins.map((tiffin) => (
                        <Card
                            key={tiffin._id}
                            sx={{
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                dispatch({
                                    type: 'UPDATE_TIFFIN',
                                    payload: tiffin,
                                });
                            }}
                        >
                            <ImageListItem sx={{ height: '100% !important' }}>
                                <ImageListItemBar
                                    sx={{
                                        background:
                                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%), rgba(0,0,0,0) 100%)',
                                    }}
                                    title={
                                        tiffin.price === 0
                                            ? 'Free Tiffin'
                                            : '$' + tiffin?.price
                                    }
                                    actionIcon={
                                        <Tooltip
                                            title={tiffin.uName}
                                            sx={{ mr: '5px' }}
                                        >
                                            <Avatar src={tiffin.uPhoto} />
                                        </Tooltip>
                                    }
                                    position='top'
                                />
                                <img
                                    src={tiffin.images[0]}
                                    alt={tiffin.title}
                                    loading='lazy'
                                />
                                <ImageListItemBar
                                    title={tiffin.title}
                                    actionIcon={
                                        <Rating
                                            sx={{
                                                color: 'rgba(255,255,255,0.8)',
                                                mr: '5px',
                                            }}
                                            name='room-rating'
                                            defaultValue={3.5}
                                            precision={0.5}
                                            emptyIcon={
                                                <StarBorder
                                                    sx={{
                                                        color: 'rgba(255,255,255, 0.8)',
                                                    }}
                                                />
                                            }
                                        />
                                    }
                                />
                            </ImageListItem>
                        </Card>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <h2>No Tiffin Service Found</h2>
                    </div>
                )}
            </ImageList>
        </Container>
    );
};

export default UserTiffins;
