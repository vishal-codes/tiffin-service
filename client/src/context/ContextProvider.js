import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useRef,
} from 'react';
import reducer from './reducer';
// import useContextDevTools from 'context-api-dev-tools-extension';

const INITIAL_STATE = {
    alert: {
        open: false,
        severity: 'info',
        message: '',
    },
    currentUser: null,
    loading: false,
    openLogIn: false,
    profile: {
        open: false,
        file: null,
        photoURL: '',
    },
    images: [],
    details: {
        title: '',
        description: '',
        price: 0,
    },
    location: { lng: 0, lat: 0 },
    tiffins: [],
    priceFilter: 10000,
    addressFilter: null,
    filteredTiffins: [],
    tiffin: null,
};

const Context = createContext(INITIAL_STATE);

export const useValue = () => {
    return useContext(Context);
};

const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    // const devTools = useContextDevTools(dispatch);
    const mapRef = useRef();
    const containerRef = useRef();
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            dispatch({
                type: 'UPDATE_USER',
                payload: currentUser,
            });
        }
    }, []);

    // useEffect(() => {
    //     devTools.sendUpdatedState(state);
    // }, [state, devTools]);

    return (
        // <Context.Provider value={devTools.sendDispatch}>
        <Context.Provider value={{ state, dispatch, mapRef, containerRef }}>
            {children}
        </Context.Provider>
        // </Context.Provider>
    );
};

export default ContextProvider;
