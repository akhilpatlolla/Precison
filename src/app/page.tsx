import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import OurWork from '@/components/OurWork'
import BeforeAfter from '@/components/BeforeAfter'
import Testimonials from '@/components/Testimonials'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import Booking from '@/components/Booking'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <OurWork />
      <BeforeAfter />
      <Testimonials />
      <About />
      <FAQ />
      <Booking />
    </main>
  )
}
