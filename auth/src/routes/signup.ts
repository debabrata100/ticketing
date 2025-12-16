import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadrequestError, validateRequest } from '@deb-ticketing/common';
import { User } from '../models/user';
import 'express-async-errors';
import jwt from 'jsonwebtoken';
import logger from '../logger/logger';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 to 20 charancters'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.error(`Email in use ${req.path}`);
      throw new BadrequestError('Email in use');
    }
    const user = User.build({ email, password });
    await user.save();
    // generate
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    // store it in session
    req.session = {
      jwt: userJwt,
    };
    logger.info('Signup succeeded', {
      userId: user.id,
      requestId: req.requestId,
    });
    res.status(201).send(user);
  }
);

export { router as signupRouter };
