import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const getStripeSession = async (priceId: string, userId: string) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{price: priceId, quantity: 1}],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/publicacion/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/publicacion/cancel`,
    metadata: {
      userId,
    },
  })
  return session
} 