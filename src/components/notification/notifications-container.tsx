'use client'

import { useNotifications } from '@/contexts/NotificationContext'
import { Notification } from './notification'

export const NotificationsContainer = () => {
  const { notifications, removeNotification } = useNotifications()

  return (
    <div className="fixed top-4 right-4 z-[60] space-y-2 min-w-[320px] max-w-[420px]">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  )
}