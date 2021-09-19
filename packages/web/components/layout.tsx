import { Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Flex minH="100vh" flexDirection="column">
      {children}
    </Flex>
  );
}
