import { Router } from 'express';

import {
    addTiffin,
    getTiffins,
    getTiffinsByUser,
    editTiffin,
    deleteTiffin,
    deleteAllTiffinsByUser,
} from '../controllers/tiffin.js';
import auth from '../middleware/auth.js';

const tiffinRouter = Router();

tiffinRouter.post('/', auth, addTiffin);
tiffinRouter.get('/', getTiffins);
tiffinRouter.get('/user', auth, getTiffinsByUser);
tiffinRouter.post('/edit/:id', auth, editTiffin);
tiffinRouter.post('deleteTiffin/:id', auth, deleteTiffin);
tiffinRouter.post('/deleteAllTiffins', auth, deleteAllTiffinsByUser);

export default tiffinRouter;
