import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import api from '../lib/api';
import type {
  User,
  Team,
  Project,
  Task,
  Phase,
  BrainStorm,
} from '@prisma/client';
import { useMemo } from 'react';

export function useUser() {
  const data = useQuery<
    User & {
      teams: (Team & {
        participants: User[];
        project: Project & {
          Phases: (Phase & {
            tasks: (Task & {
              assignees: User[];
            })[];
          })[];
          brainstorm: BrainStorm;
        };
      })[];
    }
  >('/auth/me', {
    retry: false,
  });

  return data;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();

  return function login() {
    const consentURL = `http://localhost:5000/auth/github`;

    window.open(consentURL, '__blank', 'width=500&height=800');

    window.addEventListener('message', async event => {
      if (event.data === 'success') {
        await queryClient.invalidateQueries('/auth/me');
        await router.push('/');

        toast({
          title: 'Logged In!',
          description: `You are logged in to your account!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();

  return async function logout() {
    await router.push('/');
    await api.post('/auth/logout');

    queryClient.setQueryData('/auth/me', null);

    toast({
      title: 'Logged Out!',
      description: `You are logged out of your account!`,
      status: 'success',
      isClosable: true,
      duration: 3000,
    });

    await queryClient.invalidateQueries('/auth/me');
  };
}
