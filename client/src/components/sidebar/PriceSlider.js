import { Box, Slider, Typography } from '@mui/material';
import React from 'react';
import { useValue } from '../../context/ContextProvider';

const marks = [
    { value: 1000, label: '₹1000' },
    { value: 5000, label: '₹5000' },
    { value: 10000, label: '₹10000' },
];

const PriceSlider = () => {
    const {
        state: { priceFilter },
        dispatch,
    } = useValue();
    return (
        <Box sx={{ mt: 5 }}>
            <Typography>Max Price: {'₹ ' + priceFilter}</Typography>
            <Slider
                min={1000}
                max={10000}
                defaultValue={10000}
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
