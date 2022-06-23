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
