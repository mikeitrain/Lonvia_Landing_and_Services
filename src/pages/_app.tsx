import { AppProps } from 'next/app';
import '@/styles/globals.css';
import { ErrorHandlerProvider } from '@/contexts/ErrorHandlerContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { NotificationsContainer } from '@/components/notification/notifications-container';
import { Loading } from '@/components/layout/loading';
import { Layout } from '@/components/layout/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NotificationProvider>
        <LanguageProvider>
          <ErrorHandlerProvider config={{ defaultNotificationDuration: 8000 }}>
            <NotificationsContainer />
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <Loading />
          </ErrorHandlerProvider>
        </LanguageProvider>
      </NotificationProvider>
    </>
  );
} 