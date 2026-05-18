import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import OurWork from '@/components/OurWork'
import BeforeAfter from '@/components/BeforeAfter'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <OurWork />
      <BeforeAfter />
      <Testimonials />
    </main>
  )
}
