import AgeGate       from '@/components/sections/AgeGate'
import Navbar        from '@/components/layout/Navbar'
import WelcomeScreen from '@/components/sections/WelcomeScreen'
import HomeHero      from '@/components/sections/HomeHero'
import Events        from '@/components/sections/Events'
import Services      from '@/components/sections/Services'
import LiquorMenu    from '@/components/sections/LiquorMenu'
import FoodMenu      from '@/components/sections/FoodMenu'
import DJSection     from '@/components/sections/DJSection'
import Reservation   from '@/components/sections/Reservation'
import VirtualTour   from '@/components/sections/VirtualTour'
import Gallery       from '@/components/sections/Gallery'
import Location      from '@/components/sections/Location'
import Footer        from '@/components/layout/Footer'

export default function Home() {
  return (
    <main>
      <AgeGate />
      <Navbar />
      <WelcomeScreen />
      <HomeHero />
      <Events />
      <Services />
      <LiquorMenu />
      <FoodMenu />
      <DJSection />
      <Reservation />
      <VirtualTour />
      <Gallery />
      <Location />
      <Footer />
    </main>
  )
}