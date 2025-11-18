'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface Notification {
  id: string
  type: NotificationType
  message: string
  duration: number
  timestamp: number
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (type: NotificationType, message: string, duration?: number) => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

const STORAGE_KEY = 'lonvia_notifications'

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  // Load notifications from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed: Notification[] = JSON.parse(stored)
        const now = Date.now()
        // Filter out expired notifications
        const valid = parsed.filter(n => now - n.timestamp < n.duration)
        setNotifications(valid)
        
        // Set up auto-removal for remaining notifications
        valid.forEach(notification => {
          const remaining = notification.duration - (now - notification.timestamp)
          if (remaining > 0) {
            setTimeout(() => {
              removeNotification(notification.id)
            }, remaining)
          }
        })
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [removeNotification])

  // Save to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  }, [notifications])

  const addNotification = useCallback((type: NotificationType, message: string, duration = 5000) => {
    const id = Math.random().toString(36).substring(7)
    const notification: Notification = { 
      id, 
      type, 
      message, 
      duration,
      timestamp: Date.now()
    }
    
    setNotifications(prev => [...prev, notification])
    
    // Auto-remove notification after duration
    setTimeout(() => {
      removeNotification(id)
    }, duration)
  }, [removeNotification])

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
} 