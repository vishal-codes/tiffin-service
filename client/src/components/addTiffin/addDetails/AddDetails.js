import {
    FormControl,
    FormControlLabel,
    InputAdornment,
    Radio,
    RadioGroup,
    Stack,
    TextField,
} from '@mui/material';
import React, { useState } from 'react';

import { useValue } from '../../../context/ContextProvider';
import AddInformation from './AddInformation';

const AddDetails = () => {
    const {
        state: {
            details: { title, description, price },
        },
        dispatch,
    } = useValue();
    const [costType, setCostType] = useState(price ? 1 : 0);

    const handleCostTypeChange = (e) => {
        const costType = Number(e.target.value);
        setCostType(costType);
        if (costType === 0) {
            dispatch({ type: 'UPDATE_DETAILS', payload: { price: 0 } });
        } else {
            dispatch({ type: 'UPDATE_DETAILS', payload: { price: 4000 } });
        }
    };

    const handlePriceChange = (e) => {
        dispatch({
            type: 'UPDATE_DETAILS',
            payload: { price: e.target.value },
        });
    };

    return (
        <Stack
            sx={{
                alignItems: 'center',
                '& .MuiTextField-root': {
                    width: '100%',
                    maxWidth: 500,
                    m: 1,
                },
            }}
        >
            <FormControl>
                <RadioGroup
                    name='costType'
                    value={costType}
                    row
                    onChange={handleCostTypeChange}
                >
                    <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label='Free'
                    />
                    <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label='Price Per day'
                    />
                    {Boolean(costType) && (
                        <TextField
                            name='price'
                            sx={{ width: '10ch !important' }}
                            variant='standard'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        $
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                type: 'number',
                                min: 5,
                                max: 30,
                            }}
                            value={price}
                            onChange={handlePriceChange}
                        />
                    )}
                </RadioGroup>
            </FormControl>
            <AddInformation
                mainProps={{ name: 'title', label: 'Title', value: title }}
                minLength={5}
                maxLength={40}
            />
            <AddInformation
                mainProps={{
                    name: 'description',
                    label: 'Description',
                    value: description,
                }}
                minLength={20}
                maxLength={800}
                optionalProps={{ multiline: true }}
            />
        </Stack>
    );
};

export default AddDetails;
