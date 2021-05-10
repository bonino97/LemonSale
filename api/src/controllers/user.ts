/* External */
import { Request, Response } from 'express';

/* Internal */
import logging from '../config/logging';

/* Models */
import User from '../models/user';
import IUser from '../interfaces/user';
import sendResponse from '../handlers/handleResponses';

const NAMESPACE = 'User Controller';

const getUsers = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'GetUsers Method');
    User.find()
        .select('-password')
        .exec()
        .then((users: IUser[]) => sendResponse(res, 'GET_USERS', 200, { data: { users, count: users.length } }))
        .catch((error: Error) => sendResponse(res, 'GET_USERS_ERROR', 500, error));
};

const getUser = (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'GetUser Method');
    console.log(res.locals.jwt);
    const { email } = req.body.user;
    User.findOne({ email })
        .select('-password')
        .exec()
        .then((user: any) => {
            console.log(user);
            return sendResponse(res, 'GET_USER', 200, { data: user });
        })
        .catch((error: Error) => sendResponse(res, 'GET_USER_ERROR', 500, error));
};

export default { getUsers, getUser };
