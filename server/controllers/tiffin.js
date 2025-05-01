import Tiffin from '../models/Tiffin.js';
import tryCatch from '../utils/tryCatch.js';

export const addTiffin = tryCatch(async (req, res) => {
    const { id: uid, name: uName, photoURL: uPhoto } = req.user;
    const newTiffin = new Tiffin({ ...req.body, uid, uName, uPhoto });
    await newTiffin.save();
    res.status(201).json({ success: true, result: newTiffin });
});

export const getTiffins = tryCatch(async (req, res) => {
    const tiffins = await Tiffin.find().sort({ _id: -1 });
    res.status(200).json({ success: true, result: tiffins });
});

export const getTiffinById = tryCatch(async (req, res) => {
    const tiffin = await Tiffin.findById(req.params.id);
    if (!tiffin) {
        return res
            .status(404)
            .json({ success: false, message: 'Tiffin not found' });
    }
    res.status(200).json({ success: true, result: tiffin });
});

export const likeTiffin = tryCatch(async (req, res) => {
    const { id: uid, name: uName, photoURL: uPhoto } = req.user;
    const tiffin = await Tiffin.findById(req.params.id);
    if (!tiffin) {
        return res
            .status(404)
            .json({ success: false, message: 'Tiffin not found' });
    }
    const alreadyLiked = tiffin.likes.some((like) => like.uid === uid);
    if (alreadyLiked) {
        return res.status(400).json({
            success: false,
            message: 'You have already liked this tiffin',
        });
    }
    tiffin.likes.push({ uid, uName, uPhoto });
    await tiffin.save();
    res.status(200).json({ success: true, result: tiffin });
});

export const dislikeTiffin = tryCatch(async (req, res) => {
    const { id: uid, name: uName, photoURL: uPhoto } = req.user;
    const tiffin = await Tiffin.findById(req.params.id);
    if (!tiffin) {
        return res
            .status(404)
            .json({ success: false, message: 'Tiffin not found' });
    }
    const alreadyDisliked = tiffin.dislikes.some(
        (dislike) => dislike.uid === uid
    );
    if (alreadyDisliked) {
        return res.status(400).json({
            success: false,
            message: 'You have already disliked this tiffin',
        });
    }
    tiffin.dislikes.push({ uid, uName, uPhoto });
    await tiffin.save();
    res.status(200).json({ success: true, result: tiffin });
});

export const getTiffinsByUser = tryCatch(async (req, res) => {
    const { id: uid } = req.user;
    const tiffins = await Tiffin.find({ uid }).sort({ _id: -1 });
    res.status(200).json({ success: true, result: tiffins });
});

export const editTiffin = tryCatch(async (req, res) => {
    const { id: uid, name: uName, photoURL: uPhoto } = req.user;
    const updatedTiffin = await Tiffin.findByIdAndUpdate(
        req.params.id,
        { ...req.body, uid, uName, uPhoto },
        { new: true }
    );
    res.status(200).json({ success: true, result: updatedTiffin });
});

export const deleteTiffin = tryCatch(async (req, res) => {
    const { id: uid, name: uName, photoURL: uPhoto } = req.user;
    await Tiffin.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Tiffin deleted successfully',
    });
});

export const deleteAllTiffinsByUser = tryCatch(async (req, res) => {
    const { id: uid } = req.user;
    await Tiffin.deleteMany({ uid });
    res.status(200).json({
        success: true,
        message: 'All Tiffins deleted successfully',
    });
});
