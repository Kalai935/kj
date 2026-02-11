import React from 'react';
import { ReactLenis } from 'lenis/react';
import MainLayout from './components/Layout/MainLayout';
import HeroSection from './components/Hero/HeroSection';
import PolaroidGallery from './components/Memories/PolaroidGallery';
import Timeline from './components/Memories/Timeline';
import MemoryLaneMap from './components/Memories/MemoryLaneMap';
import ReasonsWhy from './components/Affection/ReasonsWhy';
import LoveLetters from './components/Affection/LoveLetters';
import LoveQuotes from './components/Affection/LoveQuotes';
import SpecialMoments from './components/Fun/SpecialMoments';
import MusicPlayer from './components/Fun/MusicPlayer';
import BucketList from './components/Fun/BucketList';
import OpenWhenLetters from './components/Fun/OpenWhenLetters';
import LoveCalculator from './components/Interactive/LoveCalculator';
import SecretMessage from './components/Interactive/SecretMessage';
import LovePotion from './components/Interactive/LovePotion';
import Constellation from './components/Interactive/Constellation';
import Heart3D from './components/3D/Heart3D';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <ReactLenis root>
      <MainLayout>
        <HeroSection />

        <PolaroidGallery />

        <Timeline />

        <MemoryLaneMap />

        <ReasonsWhy />

        <LoveLetters />

        <LoveQuotes />

        <SpecialMoments />

        <MusicPlayer />

        <BucketList />

        <OpenWhenLetters />

        <LoveCalculator />

        <SecretMessage />

        <LovePotion />

        <Constellation />

        <Heart3D />

        {/* Placeholders for upcoming sections */}
        <div className="h-screen flex items-center justify-center hidden"> {/* Hidden placeholder */}
        </div>

        <Footer />
      </MainLayout>
    </ReactLenis>
  );
}

export default App;
