const reducer = (state, action) => {
    switch (action.type) {
        case 'FILTER_ADDRESS':
            return {
                ...state,
                addressFilter: action.payload,
                filteredTiffins: applyFilter(
                    state.tiffins,
                    action.payload,
                    state.priceFilter
                ),
            };

        case 'CLEAR_ADDRESS':
            return {
                ...state,
                addressFilter: null,
                filteredTiffins: state.tiffins,
                priceFilter: 10000,
            };

        case 'UPDATE_ALERT':
            return { ...state, alert: action.payload };

        case 'UPDATE_DETAILS':
            return {
                ...state,
                details: { ...state.details, ...action.payload },
            };

        case 'UPDATE_IMAGES':
            return { ...state, images: [...state.images, action.payload] };

        case 'DELETE_IMAGE':
            return {
                ...state,
                images: state.images.filter(
                    (image) => image !== action.payload
                ),
            };

        case 'START_LOADING':
            return { ...state, loading: true };

        case 'END_LOADING':
            return { ...state, loading: false };

        case 'UPDATE_LOCATION':
            return { ...state, location: action.payload };

        case 'OPEN_LOGIN':
            return { ...state, openLogIn: true };

        case 'CLOSE_LOGIN':
            return { ...state, openLogIn: false };

        case 'FILTER_PRICE':
            return {
                ...state,
                priceFilter: action.payload,
                filteredTiffins: applyFilter(
                    state.tiffins,
                    state.addressFilter,
                    action.payload
                ),
            };

        case 'UPDATE_PROFILE':
            return { ...state, profile: action.payload };

        case 'UPDATE_TIFFINS':
            return {
                ...state,
                tiffins: action.payload,
                addressFilter: null,
                priceFilter: 10000,
                filteredTiffins: action.payload,
            };

        case 'RESET_TIFFIN':
            return {
                ...state,
                images: [],
                details: {
                    title: '',
                    description: '',
                    price: 0,
                },
                location: { lng: 0, lat: 0 },
            };

        case 'UPDATE_TIFFIN':
            return {
                ...state,
                tiffin: action.payload,
            };

        case 'UPDATE_USER':
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
            return { ...state, currentUser: action.payload };

        default:
            throw new Error('NO matched action!');
    }
};

export default reducer;

const applyFilter = (tiffins, address, price) => {
    let filteredTiffins = tiffins;
    if (address) {
        const { lng, lat } = address;
        filteredTiffins = filteredTiffins.filter((tiffin) => {
            const lngDifference =
                lng > tiffin.lng ? lng - tiffin.lng : tiffin.lng - lng;
            const latDifference =
                lat > tiffin.lat ? lat - tiffin.lat : tiffin.lat - lat;
            return lngDifference <= 1 && latDifference <= 1;
        });
    }
    if (price < 10000) {
        filteredTiffins = filteredTiffins.filter(
            (tiffin) => tiffin.price <= price
        );
    }

    return filteredTiffins;
};
