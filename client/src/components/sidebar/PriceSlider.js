import { Box, Slider, Typography } from '@mui/material';
import React from 'react';
import { useValue } from '../../context/ContextProvider';

const marks = [
    { value: 5, label: '$5' },
    { value: 17, label: '$17' },
    { value: 30, label: '$30' },
];

const PriceSlider = () => {
    const {
        state: { priceFilter },
        dispatch,
    } = useValue();
    return (
        <Box sx={{ mt: 5 }}>
            <Typography>Max Price: {'$ ' + priceFilter}</Typography>
            <Slider
                min={5}
                max={30}
                defaultValue={15}
                valueLabelDisplay='auto'
                marks={marks}
                value={priceFilter}
                onChange={(e, price) =>
                    dispatch({ type: 'FILTER_PRICE', payload: price })
                }
            />
        </Box>
    );
};

export default PriceSlider;
