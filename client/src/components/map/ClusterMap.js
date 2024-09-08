import React, { useEffect, useState } from 'react';
import { Avatar, Paper, Tooltip } from '@mui/material';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Supercluster from 'supercluster';
import 'mapbox-gl/dist/mapbox-gl.css';

import './ClusterMap.css';
import { getTiffins } from '../../actions/tiffin';
import { useValue } from '../../context/ContextProvider';
import GeocoderInput from '../sidebar/GeocoderInput';
import TiffinPopup from './TiffinPopup';

const supercluster = new Supercluster({
    radius: 75,
    maxZoom: 20,
});

const ClusterMap = () => {
    const {
        state: { filteredTiffins },
        dispatch,
        mapRef,
    } = useValue();
    const [points, setPoints] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [bounds, setBounds] = useState([-180, -85, 180, 85]);
    const [zoom, setZoom] = useState(0);
    const [popupInfo, setPopupInfo] = useState(null);

    useEffect(() => {
        getTiffins(dispatch);
    }, []);

    useEffect(() => {
        const points = filteredTiffins.map((tiffin) => ({
            type: 'Feature',
            properties: {
                cluster: false,
                tiffinId: tiffin._id,
                price: tiffin.price,
                title: tiffin.title,
                description: tiffin.description,
                lng: tiffin.lng,
                lat: tiffin.lat,
                images: tiffin.images,
                uPhoto: tiffin.uPhoto,
                uName: tiffin.uName,
            },
            geometry: {
                type: 'Point',
                coordinates: [parseFloat(tiffin.lng), parseFloat(tiffin.lat)],
            },
        }));
        setPoints(points);
    }, [filteredTiffins]);

    useEffect(() => {
        supercluster.load(points);
        setClusters(supercluster.getClusters(bounds, zoom));
    }, [points, zoom, bounds]);

    useEffect(() => {
        if (mapRef.current) {
            setBounds(mapRef.current.getMap().getBounds().toArray().flat());
        }
    }, [mapRef]);

    return (
        <ReactMapGL
            mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
            initialViewState={{
                longitude: -117.885182,
                latitude: 33.881645,
                zoom: 10,
            }}
            mapStyle='mapbox://styles/mapbox/streets-v11'
            ref={mapRef}
            onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
        >
            {clusters.map((cluster) => {
                const { cluster: isCluster, point_count } = cluster.properties;
                const [longitude, latitude] = cluster.geometry.coordinates;
                if (isCluster) {
                    return (
                        <Marker
                            key={`cluster-${cluster.id}`}
                            longitude={longitude}
                            latitude={latitude}
                        >
                            <div
                                className='cluster-marker'
                                style={{
                                    width: `${
                                        (point_count / points.length) * 20
                                    }px`,
                                    height: `${
                                        (point_count / points.length) * 20
                                    }px`,
                                }}
                                onClick={() => {
                                    const zoom = Math.min(
                                        supercluster.getClusterExpansionZoom(
                                            cluster.id
                                        ),
                                        20
                                    );
                                    mapRef.current.flyTo({
                                        center: [longitude, latitude],
                                        zoom,
                                        speed: 1,
                                    });
                                }}
                            >
                                {point_count}
                            </div>
                        </Marker>
                    );
                }

                return (
                    <Marker
                        key={`tiffin-${cluster.properties.tiffinId}`}
                        longitude={longitude}
                        latitude={latitude}
                    >
                        <Tooltip title={cluster.properties.uName}>
                            <Avatar
                                src={cluster.properties.uPhoto}
                                component={Paper}
                                elevation={2}
                                sx={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setPopupInfo(cluster.properties);
                                }}
                            />
                        </Tooltip>
                    </Marker>
                );
            })}
            <GeocoderInput />
            {popupInfo && (
                <Popup
                    longitude={popupInfo.lng}
                    latitude={popupInfo.lat}
                    maxWidth='auto'
                    closeOnClick={false}
                    focusAfterOpen={false}
                    onClose={() => {
                        setPopupInfo(null);
                    }}
                >
                    <TiffinPopup {...{ popupInfo }} />
                </Popup>
            )}
        </ReactMapGL>
    );
};

export default ClusterMap;
