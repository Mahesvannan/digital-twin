import Nav from '@/components/nav';
import Hero from '@/components/hero';
import About from '@/components/about';
import Experience from '@/components/experience';
import ChatSection from '@/components/chat-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <ChatSection />
      <Footer />
    </main>
  );
}
