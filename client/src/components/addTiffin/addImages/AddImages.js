import { Paper } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ImagesList from './ImagesList';
import ProgressList from './progressList/ProgressList';

const AddImages = () => {
    const [files, setFiles] = useState([]);
    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
    });

    return (
        <React.Fragment>
            <Paper
                sx={{
                    cursor: 'pointer',
                    background: '#fafafa',
                    color: '#bdbdbd',
                    border: '1px dashed #ccc',
                    '&:hover': { border: '1px solid #ccc' },
                }}
            >
                <div style={{ padding: '16px' }} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p style={{ color: 'green' }}>
                            Drop the images here...
                        </p>
                    ) : (
                        <p>Drag and Drop the images here</p>
                    )}
                    <em>
                        (images with *.jpeg, *.png, *.jpg extension will be
                        accepted)
                    </em>
                </div>
            </Paper>
            <ProgressList {...{ files }} />
            <ImagesList />
        </React.Fragment>
    );
};

export default AddImages;
