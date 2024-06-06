"use client"

import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import NextNProgress from 'nextjs-progressbar';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
  
import { ThemeProvider } from '@/contexts';
import { useNextCssRemovalPrevention } from '@/hooks';
import { PageLayout } from '@/layouts';
import '@/styles/styles.scss';
import { ReactNode } from 'react';
  
type Props = {
    children: ReactNode
}
    
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
return (
    <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
    </div>
);
};

function makeQueryClient() {
return new QueryClient({
    defaultOptions: {
    queries: {
        cacheTime: 60 * 1000,
        staleTime: 60 * 1000,
        retry: false,
    //   throwOnError: true,
    },
    },
});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
if (typeof window === 'undefined') {
    return makeQueryClient();
} else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
}
}

export default function Providers({children}: Props) {
const queryClient = getQueryClient()

// useNextCssRemovalPrevention();

return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
            <Toaster />
            <NextNProgress />
            <PageLayout>
                {children}
            </PageLayout>
            </ThemeProvider>
        </QueryClientProvider>
    </ErrorBoundary>
);
}
  