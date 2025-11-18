import { 
  XMarkIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'
import { Notification as NotificationType } from '@/contexts/NotificationContext'
import { useState } from 'react'
import { Button } from '@/components/common/Button'

const notificationStyles = {
  info: 'bg-info-50 text-info-800 border-info-300',
  success: 'bg-success-50 text-success-800 border-success-300',
  warning: 'bg-warning-50 text-warning-800 border-warning-300',
  error: 'bg-error-50 text-error-800 border-error-300',
}

interface NotificationProps {
  notification: NotificationType
  onRemove: (id: string) => void
}

export const Notification = ({ notification, onRemove }: NotificationProps) => {
  const { id, type, message } = notification
  const [isLeaving, setIsLeaving] = useState(false)

  const getIcon = () => {
    switch (type) {
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 flex-shrink-0" />
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 flex-shrink-0" />
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />
      case 'error':
        return <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0" />
    }
  }

  const handleRemove = () => {
    setIsLeaving(true)
    setTimeout(() => onRemove(id), 300)
  }

  return (
    <div
      className={`
        ${notificationStyles[type]}
        flex items-start justify-between
        px-4 py-3 rounded-lg border
        shadow-lg
        animate-[slideIn_0.3s_ease-in-out,fadeIn_0.3s_ease-in-out]
        ${isLeaving ? 'animate-[slideOut_0.3s_ease-in-out,fadeOut_0.3s_ease-in-out]' : ''}
        hover:scale-[1.02] transition-transform
      `}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        <p className="text-sm font-medium leading-5">{message}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        className="ml-4 text-foreground-tertiary hover:text-foreground-secondary transition-colors flex-shrink-0"
      >
        <XMarkIcon className="h-5 w-5" />
      </Button>
    </div>
  )
}