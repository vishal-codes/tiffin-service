import mongoose from 'mongoose';

const tiffinSchema = mongoose.Schema(
    {
        lng: {
            type: Number,
            required: true,
        },
        lat: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 40,
        },
        description: {
            type: String,
            required: true,
            minLength: 20,
            maxLength: 800,
        },
        images: {
            type: [String],
            validate: (v) => Array.isArray(v) && v.length > 0,
        },
        uid: {
            type: String,
            required: true,
        },
        uName: {
            type: String,
            required: true,
        },
        uPhoto: {
            type: String,
            default: '',
        },
        likes: [
            {
                uid: {
                    type: String,
                    required: true,
                },
                uName: {
                    type: String,
                    required: true,
                },
                uPhoto: {
                    type: String,
                    default: '',
                },
            },
        ],
        dislikes: [
            {
                uid: {
                    type: String,
                    required: true,
                },
                uName: {
                    type: String,
                    required: true,
                },
                uPhoto: {
                    type: String,
                    default: '',
                },
            },
        ],
    },
    { timestamps: true }
);

const Tiffin = mongoose.model('tiffins', tiffinSchema);
export default Tiffin;
