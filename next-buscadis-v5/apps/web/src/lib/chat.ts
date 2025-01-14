import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function sendMessage(roomId: string, message: string, userId: string) {
  return await supabase
    .from('messages')
    .insert([
      {
        room_id: roomId,
        content: message,
        user_id: userId,
      },
    ])
} 