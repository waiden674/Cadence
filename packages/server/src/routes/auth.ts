import { User } from '@prisma/client';
import { Router } from 'express';
import passport from 'passport';
import { ensureAuthenticated, ensureGuest } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = Router();

router.get('/me', ensureAuthenticated, async (req, res) => {
  res.json(req.user);
});

router.get('/success', (req, res) => {
  res.send(/* html */ `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Login Successful</title>
    </head>
    <body>
      <h1>Authorized</h1>
      <p>You can close this window now</p>
      <script>
        let originUrl = window.location.origin;
        if (window.location.hostname === 'localhost') {
          originUrl = 'http://localhost:3000'
        }
        window.opener.postMessage('success', originUrl);
        window.close();
      </script>
    </body>
  </html>
  `);
});

router.get('/github', ensureGuest, (req, res, next) => {
  const scope = ['user:email', 'repo', 'read:user'];

  passport.authenticate('github', {
    scope,
  })(req, res, next);
});

router.get(
  '/github/callback',
  (req, res, next) => {
    passport.authenticate('github', {
      failureRedirect: '/',
    })(req, res, next);
  },
  (req, res) => {
    res.redirect('/auth/success');
  }
);

router.post('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out' });
});

export default router;
