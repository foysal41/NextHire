import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro' : 'price_1ThgwzK1JWRWLrOidpN3UYwL',
    'seeker_premium':  'price_1ThtWdK1JWRWLrOiIAm8u1TF',
    'recruiter_growth' : 'price_1ThtX4K1JWRWLrOi2WEcT1wl',
    'recruiter_enterprise' : 'price_1ThtXSK1JWRWLrOiuvwcNrS2'
   
}