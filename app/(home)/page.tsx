import Features from "@/components/sections/Features/Features";
import CTA from "@/components/sections/GetStarted/CTA";
import Hero from "@/components/sections/Hero/Hero"
import TechStack from "@/components/sections/TechStack/TechStack";


const Home = () => {
  return (

    <main className="mx-10">
      <Hero />
      <Features />
      <TechStack />
      <CTA />
    </main>

  )
}

export default Home
