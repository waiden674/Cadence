import Head from 'next/head';
import Image from 'next/image';
import { useUser } from '../hooks/auth';
import AboutMe from '../components/about-me';

export default function Home() {
  const { data } = useUser();

  if (!data) return null;

  if (!data.bio || data.skills.length === 0) {
    return <AboutMe />;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
