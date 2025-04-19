import { v4 as uuidv4 } from 'uuid';

import uploadFile from '../firebase/uploadFile';
import fetchData from '../utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/user';

export const register = async (user, dispatch) => {
    dispatch({ type: 'START_LOADING' });
    const result = await fetchData(
        {
            url: url + '/register',
            body: user,
        },
        dispatch
    );
    if (result) {
        dispatch({
            type: 'UPDATE_USER',
            payload: result,
        });
        dispatch({ type: 'CLOSE_LOGIN' });
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'success',
                message: 'Your account has been created successfully!',
            },
        });
    }
    dispatch({ type: 'END_LOADING' });
};

export const logIn = async (user, dispatch) => {
    dispatch({ type: 'START_LOADING' });
    const result = await fetchData(
        {
            url: url + '/login',
            body: user,
        },
        dispatch
    );
    if (result) {
        dispatch({
            type: 'UPDATE_USER',
            payload: result,
        });
        dispatch({ type: 'CLOSE_LOGIN' });
    }
    dispatch({ type: 'END_LOADING' });
};

export const updateProfile = async (currentUser, updateFields, dispatch) => {
    dispatch({ type: 'START_LOADING' });
    const { name, file } = updateFields;
    let body = { name };
    try {
        if (file) {
            const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
            const photoURL = await uploadFile(
                file,
                `profile/${currentUser?.id}/${imageName}`
            );
            body = { ...body, photoURL };
        }
        const result = await fetchData(
            {
                url: url + '/updateProfile',
                method: 'POST',
                body,
                token: currentUser.token,
            },
            dispatch
        );
        if (result) {
            dispatch({
                type: 'UPDATE_USER',
                payload: { ...currentUser, ...result },
            });
            dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                    open: true,
                    severity: 'success',
                    message: 'Your profile has been updated successfully!',
                },
            });
            dispatch({
                type: 'UPDATE_PROFILE',
                payload: {
                    open: false,
                    file: null,
                    photoURL: result.photoURL,
                },
            });
        }
    } catch (error) {
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'error',
                message: error.message,
            },
        });
        console.log(error);
    }
    dispatch({ type: 'END_LOADING' });
};

export const deleteUser = async (currentUser, dispatch) => {
    dispatch({ type: 'START_LOADING' });
    const result = await fetchData(
        {
            url: url + '/deleteUser',
            token: currentUser.token,
        },
        dispatch
    );
    dispatch({ type: 'END_LOADING' });
    console.log(result);
    if (result) {
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'success',
                message: 'Your account has been deleted successfully!',
            },
        });
        dispatch({
            type: 'UPDATE_USER',
            payload: null,
        });
    } else {
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'error',
                message: 'Failed to delete your account, please try again!',
            },
        });
    }
};
