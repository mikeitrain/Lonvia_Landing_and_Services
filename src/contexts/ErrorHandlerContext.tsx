'use client';

import React, { createContext, useContext, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useNotifications } from '@/contexts/NotificationContext'
import { HttpError, HttpErrorCode, HttpErrorMessage } from '@/types/httpError'
import { useLanguage } from '@/contexts/LanguageContext'

interface ErrorHandlerConfig {
  defaultNotificationDuration?: number
  onHttpError?: (error: HttpError<HttpErrorCode, HttpErrorMessage<HttpErrorCode>>) => void
  onCustomError?: (code: NotificationCodes, message: string) => void
  translateMessage?: (message: string) => string
}

interface ErrorHandlerContextType {
  handleHttpError: (error: HttpError<HttpErrorCode, HttpErrorMessage<HttpErrorCode>>) => void
  handleCustomError: (code: NotificationCodes, message: string) => void
}

export enum NotificationCodes {
    HTTP_USER_ERROR = 'HTTP_USER_ERROR',
    HTTP_SERVER_ERROR = 'HTTP_SERVER_ERROR',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    AMPLIFY_ERROR = 'AMPLIFY_ERROR',
    // Add more codes as needed
  }

// Create a separate component to use the hook
function ErrorHandlerLogic({
  children,
  config = {},
}: {
  children: React.ReactNode
  config?: ErrorHandlerConfig
}) {
  const router = useRouter()
  const { addNotification } = useNotifications()
  const { t } = useLanguage()
  const {
    defaultNotificationDuration = 8000,
    onHttpError,
    onCustomError,
    translateMessage = (msg) => msg,
  } = config

  const handleHttpError = useCallback(
    (error: HttpError<HttpErrorCode, HttpErrorMessage<HttpErrorCode>>) => {
      // Special handling for Cognito NotAuthorized errors (e.g., unconfirmed or non-existing user)
      if (error.type === 'NotAuthorizedException') {
        addNotification(
          'error',
          t('auth.notAuthorizedNotConfirmed'),
          defaultNotificationDuration
        )
        return
      }
      if (onHttpError) {
        onHttpError(error)
        return
      }

      // Helper function to replace message placeholder
      const formatMessage = (template: string, message?: string) => {
        return template.replace('{message}', message || '');
      };

      switch (error.code) {
        case 400:
          addNotification(
            'error',
            formatMessage(t('error.http.400'), error.message),
            defaultNotificationDuration
          )
          break

        case 401:
          addNotification(
            'error',
            t('error.http.401'),
            defaultNotificationDuration
          )
          router.push('/auth/login')
          break

        case 403:
          addNotification(
            'error',
            formatMessage(t('error.http.403'), error.message),
            defaultNotificationDuration
          )
          // Don't redirect for 403 - just show the error message
          break

        case 404:
          addNotification(
            'error',
            t('error.http.404'),
            defaultNotificationDuration
          )
          break

        case 500:
          addNotification(
            'error',
            t('error.http.500'),
            defaultNotificationDuration
          )
          break

        default:
          addNotification(
            'error',
            t('error.http.generic'),
            defaultNotificationDuration
          )
      }
    },
    [addNotification, defaultNotificationDuration, onHttpError, router, t]
  )

  const handleCustomError = useCallback(
    (code: NotificationCodes, message: string) => {
      if (onCustomError) {
        onCustomError(code, message)
        return
      }
      addNotification('error', translateMessage(message), defaultNotificationDuration)
    },
    [addNotification, defaultNotificationDuration, onCustomError, translateMessage]
  )

  // Global error handler for unhandled promise rejections
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {      
      // Check if it's an HttpError
      if (event.reason instanceof HttpError) {
        event.preventDefault() // Prevent the default unhandled rejection behavior
        handleHttpError(event.reason)
        return
      }
      
      // Handle other types of errors
      if (event.reason instanceof Error) {
        event.preventDefault()
        handleCustomError(
          NotificationCodes.HTTP_SERVER_ERROR,
          `An unexpected error occurred: ${event.reason.message}`
        )
        return
      }
      
      // Handle string errors or other types
      if (typeof event.reason === 'string') {
        event.preventDefault()
        handleCustomError(
          NotificationCodes.HTTP_SERVER_ERROR,
          `An error occurred: ${event.reason}`
        )
        return
      }
      
      // Generic fallback
      event.preventDefault()
      handleCustomError(
        NotificationCodes.HTTP_SERVER_ERROR,
        'An unexpected error occurred. Please try again.'
      )
    }

    // Add the global error handler
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    
    // Cleanup
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [handleHttpError, handleCustomError])

  return (
    <ErrorHandlerContext.Provider value={{ handleHttpError, handleCustomError }}>
      {children}
    </ErrorHandlerContext.Provider>
  )
}

const ErrorHandlerContext = createContext<ErrorHandlerContextType | null>(null)

export function ErrorHandlerProvider({
  children,
  config = {},
}: {
  children: React.ReactNode
  config?: ErrorHandlerConfig
}) {
  return (
    <ErrorHandlerLogic config={config}>
      {children}
    </ErrorHandlerLogic>
  )
}

export function useErrorHandler() {
  const context = useContext(ErrorHandlerContext)
  if (!context) {
    throw new Error('useErrorHandler must be used within an ErrorHandlerProvider')
  }
  return context
} 