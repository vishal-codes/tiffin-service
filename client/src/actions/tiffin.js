import fetchData from '../utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/tiffin';

export const addTiffin = async (tiffin, currentUser, dispatch, setPage) => {
    dispatch({ type: 'START_LOADING' });

    const result = await fetchData(
        { url, body: tiffin, token: currentUser?.token },
        dispatch
    );
    if (result) {
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: 'true',
                severity: 'success',
                message: 'Your tiffin service has been added successfully!',
            },
        });
        dispatch({ type: 'RESET_TIFFIN' });
        setPage(0);
        dispatch({ type: 'UPDATE_TIFFIN', payload: result });
    }

    dispatch({ type: 'END_LOADING' });
};

export const getTiffins = async (dispatch) => {
    const result = await fetchData({ url, method: 'GET' }, dispatch);
    if (result) {
        dispatch({
            type: 'UPDATE_TIFFINS',
            payload: result,
        });
    }
};
