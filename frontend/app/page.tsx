import Nav from '@/components/nav';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Experience from '@/components/experience';
import ChatSection from '@/components/chat-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ink text-zinc-200">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <ChatSection />
      <Footer />
    </main>
  );
}
