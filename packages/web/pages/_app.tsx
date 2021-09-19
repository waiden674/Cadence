import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Layout from '../components/layout';
import type { QueryFunction, QueryKey } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import api from '../lib/api';
import '../styles/globals.css';

const defaultQueryFn: QueryFunction<unknown, QueryKey> = async ({
  queryKey,
}) => {
  try {
    console.log({ queryKey });
    const { data } = await api.get(queryKey.join('/'));
    return data;
  } catch (error) {
    throw new Error((error as any)?.response?.data?.message || error);
  }
};

const theme = extendTheme({
  fonts: {
    heading: 'Avenir',
    body: 'Avenir',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn: defaultQueryFn,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
export default MyApp;
