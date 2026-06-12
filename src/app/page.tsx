import { BookingProvider } from '@/lib/bookingContext'
import BookingModal from '@/components/BookingModal'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import OurWork from '@/components/OurWork'
import BeforeAfter from '@/components/BeforeAfter'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Booking from '@/components/Booking'
import Footer from '@/components/Footer'
import Marquee from '@/components/Marquee'

export default function Home() {
  return (
    <BookingProvider>
      <BookingModal />
      <main>
        <Nav />
        <Hero />
        <Marquee />
        <Services />
        <OurWork />
        <BeforeAfter />
        <Marquee reverse words={['Five-Star Rated', 'Fully Insured', 'We Come To You', 'Kannapolis · NC']} />
        <Testimonials />
        <About />
        <FAQ />
        <ContactForm />
        <Booking />
        <Footer />
      </main>
    </BookingProvider>
  )
}
