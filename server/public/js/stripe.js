import axios from 'axios'
import { showAlert } from './alerts'
const stripe = Stripe(
  'pk_test_51JeEUDKnN53WRkukMnbqL8Xt4aTkymvo3dl4X0O8Gl6w0p2YFygaEhGnjw0F5whAhY3yxcQT2af9tbnbqHIGQrHy00J4xwiUTd'
)

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`)
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    })
  } catch (err) {
    console.log(err)
    showAlert('error', err)
  }
}
