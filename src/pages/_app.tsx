import { AppProps } from 'next/app';
import '@/config/amplify';
import '@/styles/globals.css';
import { ErrorHandlerProvider } from '@/contexts/ErrorHandlerContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { NotificationsContainer } from '@/components/notification/notifications-container';
import { Loading } from '@/components/layout/loading';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { FormDataExpiryWarning } from '@/components/common/FormDataExpiryWarning';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NotificationProvider>
      <LanguageProvider>
        <ErrorHandlerProvider config={{ defaultNotificationDuration: 8000 }}>
          <AuthProvider>
            <NotificationsContainer />
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <Loading />
            <FormDataExpiryWarning />
          </AuthProvider>
        </ErrorHandlerProvider>
      </LanguageProvider>
      </NotificationProvider>
    </>
  );
} 