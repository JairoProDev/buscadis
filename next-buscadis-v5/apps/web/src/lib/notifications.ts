import { createClient } from '@supabase/supabase-js'
import { Notification } from '@prisma/client'

export async function sendNotification(userId: string, notification: Partial<Notification>) {
  await prisma.notification.create({
    data: {
      userId,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      link: notification.link,
    },
  })
} 