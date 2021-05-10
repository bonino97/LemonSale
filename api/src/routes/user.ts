import express from 'express';
import userController from '../controllers/user';

const router = express.Router();

router.get('/all', userController.getUsers);
router.get('', userController.getUser);

export = router;
