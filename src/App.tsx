/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  MapPin, 
  BookOpen, 
  Map, 
  Users, 
  RotateCcw, 
  Sparkles, 
  BookOpenCheck,
  Shield,
  HelpCircle,
  Smartphone,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music
} from 'lucide-react';

import SummonEffect from './components/SummonEffect';
import WorldMap from './components/WorldMap';
import CharacterIntro from './components/CharacterIntro';
import bgmUrl from './assets/bgm.wav';

export default function App() {
  const [showSummon, setShowSummon] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'worldmap' | 'characters'>('overview');
  const [timeState, setTimeState] = useState<string>('');
  const [tickerMessage, setTickerMessage] = useState<string>('평온함');

  // Background Audio State & Elements
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.3); // Comfortable default volume
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Initialize Audio & Setup autoplay click triggers
  useEffect(() => {
    const audio = new Audio(bgmUrl || '/bgm.wav');
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Keep UI states in sync with audio element state
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = (e: Event) => {
      console.error("BGM Audio Error Event:", e);
      console.error("BGM Audio Error details:", audio.error);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    // Event listener for click/tap anywhere to trigger play
    const handleAutoplay = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            // Clean up global listeners once successfully playing
            window.removeEventListener('click', handleAutoplay);
            window.removeEventListener('touchstart', handleAutoplay);
            window.removeEventListener('keydown', handleAutoplay);
          })
          .catch((err) => {
            console.log("Autoplay was prevented by browser until more interaction:", err);
          });
      }
    };

    window.addEventListener('click', handleAutoplay);
    window.addEventListener('touchstart', handleAutoplay);
    window.addEventListener('keydown', handleAutoplay);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      window.removeEventListener('click', handleAutoplay);
      window.removeEventListener('touchstart', handleAutoplay);
      window.removeEventListener('keydown', handleAutoplay);
      audio.pause();
    };
  }, []);

  // Sync Volume & Mute to Audio Element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Audio play error:", err));
    }
  };

  // Simulated atmospheric period inside Yutus
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const hours = date.getHours();
      let period = '신전의 정오 (Noon)';
      if (hours >= 5 && hours < 11) period = '수탉이 우는 새벽 (Dawn)';
      else if (hours >= 11 && hours < 15) period = '햇살 드는 한낮 (Day)';
      else if (hours >= 15 && hours < 18) period = '노을빛 밀밭의 황혼 (Twilight)';
      else if (hours >= 18 && hours < 22) period = '양초가 타들어 가는 밤 (Evening)';
      else period = '마물들이 득실대는 심야 (Midnight)';
      
      setTimeState(period);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Set background atmospheric news tickers
  useEffect(() => {
    const events = [
      '충격, 용사 두 명 소환. 대사제는 전례 없는 일이라며 이 일에 대해...',
      '헤르미나 대성당, 내일부터 빵과 와인을 무료나눔할 것으로 알려져...',
      '최근 시궁쥐 급증 사태의 원인으로 무분별한 음식물 투기를 지목해...',
      '국경지대를 침범하는 마족 경계병이 급증한 것으로 알려져 주민들의 불안이...',
      '신규 오팔 등급 모험가 탄생. 아우렐리아에서 일주일간 대축제가 열릴 예정...'
    ];

    const changeEvent = () => {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setTickerMessage(randomEvent);
    };

    changeEvent();
    const interval = setInterval(changeEvent, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSummonComplete = () => {
    setShowSummon(false);
  };

  const handleTriggerSummonFlash = () => {
    setShowSummon(true);
  };

  if (showSummon) {
    return <SummonEffect onComplete={handleSummonComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#f4efe2] text-[#3e2723] py-8 px-4 md:px-8 font-serif-kr relative overflow-hidden selection:bg-[#8b7355]/30 selection:text-[#3e2723]">
      {/* Decorative medieval double borders on desktop */}
      <div className="absolute inset-4 border-2 border-double border-[#8b7355]/20 pointer-events-none rounded-2xl hidden md:block" />
      <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#8b7355]/40 pointer-events-none hidden md:block" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#8b7355]/40 pointer-events-none hidden md:block" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#8b7355]/40 pointer-events-none hidden md:block" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#8b7355]/40 pointer-events-none hidden md:block" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-6">
        
        {/* Top Header / App Branding */}
        <header className="border-b-2 border-[#8b7355]/30 pb-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#fcf8f2]/60 p-5 rounded-xl border border-[#8b7355]/15">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#8b7355] border-2 border-[#5c3e21] rounded-full flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6 text-[#fcf8f2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl md:text-2xl font-black font-cinzel tracking-widest text-[#5c3e21]">
                  YUTUS
                </h1>
                <span className="text-[9px] bg-[#8b7355]/15 border border-[#8b7355]/25 px-1.5 rounded text-[#5c3e21] font-sans font-bold">
                  INTRO CODEX
                </span>
              </div>
            </div>
          </div>

          {/* Quick World Data Widget */}
          <div className="flex items-center gap-3 text-xs">
            <div className="bg-[#f4efe2] border border-[#8b7355]/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-stone-700 font-mono text-[10.5px]">
              <MapPin className="w-3.5 h-3.5 text-amber-800" />
              <span>헤르미나 대성당</span>
              <span className="text-[#8b7355]/40">|</span>
              <span>{timeState}</span>
            </div>

          </div>
        </header>

        {/* Live Continent News Alert Ticker */}
        <div className="bg-amber-900/5 border border-amber-950/10 px-4 py-2.5 rounded-lg flex items-start gap-2.5 text-xs text-[#5c3e21] leading-relaxed relative overflow-hidden">
          <span className="font-bold text-amber-900 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-900/20 shrink-0 font-sans uppercase text-[9.5px] tracking-wider">
            YUTUS DAILY
          </span>
          <span className="italic font-serif-kr truncate text-stone-700">
            {tickerMessage}
          </span>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex justify-center border-b border-[#8b7355]/20 pb-1 gap-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 text-sm font-bold font-serif-kr border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-[#5c3e21] text-[#3e2723] font-black'
                : 'border-transparent text-stone-500 hover:text-[#5c3e21]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            유투스
          </button>
          <button
            onClick={() => setActiveTab('worldmap')}
            className={`px-5 py-2.5 text-sm font-bold font-serif-kr border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'worldmap'
                ? 'border-[#5c3e21] text-[#3e2723] font-black'
                : 'border-transparent text-stone-500 hover:text-[#5c3e21]'
            }`}
          >
            <Map className="w-4 h-4" />
            세계지도
          </button>
          <button
            onClick={() => setActiveTab('characters')}
            className={`px-5 py-2.5 text-sm font-bold font-serif-kr border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'characters'
                ? 'border-[#5c3e21] text-[#3e2723] font-black'
                : 'border-transparent text-stone-500 hover:text-[#5c3e21]'
            }`}
          >
            <Users className="w-4 h-4" />
            주요인물
          </button>
        </nav>

        {/* Tab Content Display Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Visual Cover Style Card */}
                <div className="bg-[#fcf8f2] border-2 border-[#8b7355]/40 rounded-xl p-6 md:p-8 shadow-[inset_0_0_35px_rgba(139,115,85,0.1),0_10px_25px_rgba(45,35,25,0.08)] space-y-6 text-justify">
                  <div className="text-center border-b border-[#8b7355]/20 pb-5 max-w-lg mx-auto">
                    <span className="text-[10px] uppercase tracking-widest text-[#8b7355] font-black font-mono">Prologue Codex</span>
                    <h2 className="text-2xl md:text-3xl font-black text-[#3e2723] font-serif-kr mt-1">
                      이세계 유투스
                    </h2>

                  </div>

                  {/* Main Prologue text styled with beautiful typography */}
                  <div className="space-y-4 font-serif-kr text-[#5c3e21] text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
                    <p>
                      <span className="font-semibold text-stone-950">‘유투스(Yutus)’</span>는 지구와 닮았지만 다른 행성으로, 거대한 대륙 하나로 이루어져 있습니다.
                    </p>
                    <p>
                      대륙 동쪽은 인간, 엘프를 비롯해 다양한 종족들이 어우러져 살아가는 팔라디온이, 서쪽은 마족들이 살아가는 판데모니움이 위치해 서로 끊임없이 부딪히고 있습니다.
                    </p>
                    <p>
                      선대 용사가 죽고, 마왕 세력이 점차 강해지자 위기감을 느낀 팔라디온은 마왕 견제를 위해 새 용사, <span className="font-semibold text-stone-950">‘루크 앤더슨’</span>을 소환합니다.
                    </p>
                    <p>
                      그러나 유투스의 주신 헤르미나가 아무도 모르는 작은 실수를 하는 바람에 원래 한 명이었어야 할 용사가 두 명이 소환되고야 말았습니다.
                    </p>
                    <p>
                      전례없는 대형 사건에 누군가는 마침내 마왕을 완전히 토벌할 기회라는 긍정적 반응을, 누군가는 재앙의 전조라는 부정적 반응을 보이고 있습니다.
                    </p>
                  </div>

                  {/* Subtle decorative scroll graphic divider */}
                  <div className="flex items-center justify-center gap-3 py-2">
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#8b7355]/40" />
                    <Sparkles className="w-4 h-4 text-[#8b7355]" />
                    <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#8b7355]/40" />
                  </div>

                  {/* Quick Feature highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="bg-[#f4efe2] border border-[#8b7355]/20 p-4 rounded-lg text-center space-y-1">
                      <span className="text-lg">🏰</span>
                      <h4 className="font-bold text-xs text-[#3e2723]">중세 유럽 풍경</h4>
                      <p className="text-[11.5px] text-stone-500 leading-normal font-serif-kr">유투스는 지구의 중세 유럽과 닮은 모습을 지녔습니다.</p>
                    </div>
                    <div className="bg-[#f4efe2] border border-[#8b7355]/20 p-4 rounded-lg text-center space-y-1">
                      <span className="text-lg">🪄</span>
                      <h4 className="font-bold text-xs text-[#3e2723]">마법과 마물</h4>
                      <p className="text-[11.5px] text-stone-500 leading-normal font-serif-kr">지구에서는 진위 여부가 불분명했던 마법과 마물이 유투스에서는 명확한 현실입니다.</p>
                    </div>
                    <div className="bg-[#f4efe2] border border-[#8b7355]/20 p-4 rounded-lg text-center space-y-1">
                      <span className="text-lg">🫳</span>
                      <h4 className="font-bold text-xs text-[#3e2723]">기프트</h4>
                      <p className="text-[11.5px] text-stone-500 leading-normal font-serif-kr">헤르미나는 실수에 대한 사죄를 대신해 특별한 능력을 내려주었습니다.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'worldmap' && (
              <motion.div
                key="worldmap"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <WorldMap />
              </motion.div>
            )}

            {activeTab === 'characters' && (
              <motion.div
                key="characters"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <CharacterIntro />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="pt-4 border-t border-[#8b7355]/20 text-center text-[11px] text-[#8b7355]/80 font-serif-kr">
          <p>© Yutus Chronicles. 팔라디온 대책 위원회.</p>
        </footer>

      </div>

      {/* Floating Medieval BGM Controller */}
      <div className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)] md:max-w-sm bg-[#fcf8f2] border-2 border-double border-[#8b7355]/40 rounded-xl p-3 shadow-lg flex items-center gap-3 text-[#5c3e21]">
        <div className="w-8 h-8 rounded-full bg-[#8b7355]/10 flex items-center justify-center text-[#8b7355] shrink-0">
          <Music className={`w-4 h-4 ${isPlaying ? 'animate-spin-slow text-amber-700' : ''}`} />
        </div>
        <div className="flex flex-col min-w-[100px] select-none">
          <span className="text-[9px] font-sans font-bold tracking-widest text-[#8b7355] uppercase">BGM</span>
          <span className="text-xs font-serif-kr font-semibold text-stone-800 -mt-0.5 truncate max-w-[140px] md:max-w-[180px]">
            이세계 덤으로 소환되었다
          </span>
        </div>
        <div className="flex items-center gap-2 border-l border-[#8b7355]/20 pl-3 shrink-0">
          <button
            onClick={togglePlay}
            className="p-1.5 hover:bg-[#8b7355]/10 rounded-lg transition-colors"
            title={isPlaying ? "일시정지" : "재생"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-[#5c3e21]" />
            ) : (
              <Play className="w-4 h-4 text-[#5c3e21] fill-[#5c3e21]" />
            )}
          </button>
          
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 hover:bg-[#8b7355]/10 rounded-lg transition-colors"
              title={isMuted ? "음소거 해제" : "음소거"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-[#5c3e21]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#5c3e21]" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                const newVolume = parseFloat(e.target.value);
                setVolume(newVolume);
                if (newVolume > 0) {
                  setIsMuted(false);
                }
              }}
              className="w-16 h-1 bg-[#8b7355]/30 rounded-lg appearance-none cursor-pointer accent-[#5c3e21] hover:accent-[#3e2723] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
