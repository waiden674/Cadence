import { Router } from 'express';
import prisma from '../lib/prisma';
import slugify from 'slugify';

const router = Router();

router.get('/', async (req, res) => {
  const hackathons = await prisma.hackathon.findMany({});

  res.send(hackathons);
});

router.get('/:slug', async (req, res) => {
  const hackathon = await prisma.hackathon.findUnique({
    where: { slug: req.params.slug },
  });

  res.send(hackathon);
});

router.post('/', async (req, res) => {
  const data = req.body as {
    name: string;
    prizes: number;
    startingAt: string;
    endingAt: string;
  };
  const hackathon = await prisma.hackathon.create({
    data: {
      name: data.name,
      prizes: data.prizes,
      organizerId: req.user.id,
      startingAt: data.startingAt,
      endingAt: data.endingAt,
      slug: slugify(data.name, {
        lower: true,
        replacement: '-',
        strict: true,
      }),
    },
  });

  res.json({ message: 'Hackathon created!' });
});

export default router;
