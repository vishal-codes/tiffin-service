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

export const getUserTiffins = async (currentUser, dispatch) => {
    const result = await fetchData(
        { url: `${url}/user`, token: currentUser?.token, method: 'GET' },
        dispatch
    );
    if (result) {
        return result;
    } else {
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: 'true',
                severity: 'error',
                message: 'No tiffin service found!',
            },
        });
    }
};

export const editTiffin = async (
    tiffin,
    currentUser,
    dispatch,
    setPage,
    tiffinId
) => {
    dispatch({ type: 'START_LOADING' });

    const result = await fetchData(
        { url: `${url}/${tiffinId}`, body: tiffin, token: currentUser?.token },
        dispatch
    );
    if (result) {
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: 'true',
                severity: 'success',
                message: 'Your tiffin service has been updated successfully!',
            },
        });
        dispatch({ type: 'RESET_TIFFIN' });
        setPage(0);
        dispatch({ type: 'UPDATE_TIFFIN', payload: result });
    }

    dispatch({ type: 'END_LOADING' });
};

export const deleteTiffin = async (
    tiffinId,
    currentUser,
    dispatch,
    setPage
) => {
    dispatch({ type: 'START_LOADING' });

    const result = await fetchData(
        {
            url: `${url}/${tiffinId}`,
            method: 'DELETE',
            token: currentUser?.token,
        },
        dispatch
    );
    if (result) {
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: 'true',
                severity: 'success',
                message: 'Your tiffin service has been deleted successfully!',
            },
        });
        setPage(0);
        dispatch({ type: 'DELETE_TIFFIN', payload: tiffinId });
    }

    dispatch({ type: 'END_LOADING' });
};

export const deleteAllTiffinsByUser = async (
    currentUser,
    dispatch,
    setPage
) => {
    dispatch({ type: 'START_LOADING' });

    const result = await fetchData(
        {
            url: `${url}/deleteAll`,
            method: 'DELETE',
            token: currentUser?.token,
        },
        dispatch
    );
    if (result) {
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: 'true',
                severity: 'success',
                message:
                    'All your tiffin services have been deleted successfully!',
            },
        });
        setPage(0);
        dispatch({ type: 'DELETE_ALL_TIFFINS' });
    }

    dispatch({ type: 'END_LOADING' });
};
