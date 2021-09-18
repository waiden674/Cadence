import { RequestHandler } from 'express';

export const ensureAuthenticated: RequestHandler = (req, res, next) => {
  if (req.user) {
    return next();
  }

  res.status(403).json({
    message: 'Not Authorized',
  });
};

export const ensureGuest: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return next();
  }

  res.status(403).json({
    message: 'Not Authorized',
  });
};
