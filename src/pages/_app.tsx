import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';
import { theme } from '../styles/theme';
import { PostProvider } from '../contexts/PostContext';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <PostProvider>
          <ReactQueryDevtools />
          <Component {...pageProps} />
        </PostProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
