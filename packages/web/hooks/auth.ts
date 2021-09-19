import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';
import api from '../lib/api';
import type { User } from '@prisma/client';
import { useMemo } from 'react';

export function useUser() {
  const data = useQuery<User>('/auth/me', {
    retry: false,
    refetchOnWindowFocus: false,
    // 10 mins
    staleTime: 1000 * 60 * 10,
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
