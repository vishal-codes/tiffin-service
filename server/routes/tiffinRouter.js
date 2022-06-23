import { Router } from 'express';

import { addTiffin, getTiffins } from '../controllers/tiffin.js';
import auth from '../middleware/auth.js';

const tiffinRouter = Router();

tiffinRouter.post('/', auth, addTiffin);
tiffinRouter.get('/', getTiffins);

export default tiffinRouter;
