import 'dotenv-flow/config';
import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import routes from './routes';
import { User } from '@prisma/client';
import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import prisma from './lib/prisma';
import expressSession from 'express-session';
import pgSession from 'connect-pg-simple';

const app = express();

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);
app.use(express.json());

const PgStore = pgSession(expressSession);
const sessionMiddleware = expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new PgStore(),
});

app.use(sessionMiddleware);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);

        const userProfile = await prisma.user.upsert({
          where: {
            githubSocialId: profile.id,
          },
          create: {
            email: profile.emails?.[0]?.value,
            displayName: profile.displayName,
            username: profile.username,
            githubSocialId: profile.id,
            bio: profile?._json?.bio || '',
            photo: profile.photos?.[0]?.value || '',
            github: `https://github.com/${profile.username}`,
          },
          update: {
            displayName: profile.displayName,
            photo: profile.photos?.[0]?.value || '',
            github: `https://github.com/${profile.username}`,
            username: profile.username,
          },
        });

        done(null, userProfile);
      } catch (error) {
        console.error(error);
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, (user as User).id));
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  console.error(err);

  res.status(500).json({ success: false, message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
