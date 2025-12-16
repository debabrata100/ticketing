import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import 'express-async-errors';
import { validateRequest, BadrequestError } from '@deb-ticketing/common';
import { User } from '../models/user';
import { Password } from '../services/password';
import logger from '../logger/logger';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      logger.error(`Invalid Credentials`);
      throw new BadrequestError('Invalid Credentials');
    }
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      logger.error(`Invalid Credentials`);
      throw new BadrequestError('Invalid Credentials');
    }
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    // store it in session
    req.session = {
      jwt: userJwt,
    };
    logger.info(`Login succeeded`, {
      userId: existingUser.id,
      requestId: req.requestId,
    });
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
