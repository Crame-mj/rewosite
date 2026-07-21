/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, MapPin, Landmark, Trees, ShieldAlert, Sparkles } from 'lucide-react';
import mapImage from '../assets/images/yutus_world_map_1784608990303.jpg';

interface Region {
  id: string;
  name: string;
  englishName: string;
  icon: React.ReactNode;
  coordinates: { x: string; y: string };
  atmosphere: string;
  description: string;
}

export default function WorldMap() {
  const [selectedRegion, setSelectedRegion] = useState<string>('ostria');

  const regions: Region[] = [
    {
      id: 'ostria',
      name: '팔라디온',
      englishName: 'Paladion',
      icon: <Landmark className="w-5 h-5 text-amber-800" />,
      coordinates: { x: '62%', y: '50%' },
      atmosphere: '왕정 국가',
      description: '대륙 동쪽에 위치한 거대한 왕정국가입니다. 인간·엘프·드워프 등 다양한 종족이 어우러져 살아가고 있습니다.'
    },
    {
      id: 'lodeon',
      name: '아우렐리아',
      englishName: 'Aurelia',
      icon: <Compass className="w-5 h-5 text-amber-700" />,
      coordinates: { x: '81%', y: '45%' },
      atmosphere: '팔라디온의 수도',
      description: '대성당과 왕성이 위치한 팔라디온의 수도입니다. 모험가 소환이 주로 이루어지는 장소이기도 합니다.'
    },
    {
      id: 'olive-woods',
      name: '판데모니움',
      englishName: 'Pandemonium',
      icon: <Trees className="w-5 h-5 text-emerald-800" />,
      coordinates: { x: '38%', y: '50%' },
      atmosphere: '마족 국가',
      description: '대륙 서쪽에 위치한 마족국가입니다. 대부분 마족과 마물들만 살고 있으며, 척박하고 황폐화된 대지가 특징입니다.'
    },
    {
      id: 'demon-castle',
      name: '헬론',
      englishName: 'Hellon',
      icon: <ShieldAlert className="w-5 h-5 text-stone-900 animate-pulse" />,
      coordinates: { x: '26%', y: '63%' },
      atmosphere: '판데모니움의 수도',
      description: '마왕성이 위치한 판데모니움의 수도입니다.'
    }
  ];

  const currentRegion = regions.find(r => r.id === selectedRegion) || regions[0];

  return (
    <div className="bg-[#fcf8f2] border-2 border-[#8b7355]/40 rounded-xl p-6 shadow-[inset_0_0_30px_rgba(139,115,85,0.1),0_10px_25px_rgba(45,35,25,0.08)] flex flex-col h-full font-serif-kr" id="interactive-yutus-map">
      {/* Title block */}
      <div className="border-b-2 border-double border-[#8b7355]/30 pb-3 mb-5">
        <span className="text-[10px] uppercase tracking-widest text-[#8b7355] font-bold font-mono block">Cartography Codex</span>
        <h3 className="text-xl font-bold text-[#3e2723] flex items-center gap-1.5 mt-0.5">
          <Compass className="w-5 h-5 text-[#8b7355] animate-spin-slow" />
          유투스 세계지도
        </h3>
      </div>

      {/* Grid: Map on top/left, Lore details on bottom/right */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        
        {/* Map Canvas - Left (3 cols) */}
        <div className="xl:col-span-3 flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] max-w-lg bg-[#efe7d3] border-2 border-[#8b7355]/30 rounded-lg overflow-hidden shadow-inner select-none">
            {/* Real Generated Map Image Backdrop */}
            <img 
              src={mapImage} 
              alt="Yutus World Map" 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-500"
            />
            
            {/* Subtle old paper shading overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/15 via-transparent to-amber-950/5 pointer-events-none" />
            <div className="absolute inset-0 border border-amber-950/5 grid grid-cols-6 grid-rows-6 pointer-events-none" />

            {/* Interactive Region Pins */}
            {regions.map((region) => {
              const isSelected = region.id === selectedRegion;
              return (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  style={{ left: region.coordinates.x, top: region.coordinates.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20"
                >
                  {/* Outer breathing ring */}
                  <div className={`absolute -inset-3.5 rounded-full blur-sm transition-all duration-300 ${
                    isSelected ? 'bg-amber-600/30 scale-125' : 'bg-stone-500/0 group-hover:bg-amber-600/15'
                  }`} />
                  
                  {/* Pin core */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center backdrop-blur-[1px] shadow-sm transition-all duration-300 ${
                    isSelected 
                      ? 'bg-amber-600/50 border-amber-950 scale-110 ring-4 ring-amber-500/30' 
                      : 'bg-white/30 border-amber-950/20 hover:bg-white/50 hover:scale-105 hover:border-amber-950/40'
                  }`}>
                    {/* Tiny center dot */}
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isSelected ? 'bg-amber-950 scale-110' : 'bg-amber-950/40'
                    }`} />
                  </div>

                  {/* Label tooltip */}
                  <div className={`absolute top-9 left-1/2 -translate-x-1/2 bg-[#3e2723] text-[#f4efe2] text-[9.5px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none ${
                    isSelected 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 -translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'
                  }`}>
                    {region.name}
                  </div>
                </button>
              );
            })}

            {/* Subtle map border outline */}
            <div className="absolute inset-2 border border-dashed border-[#8b7355]/30 pointer-events-none" />
          </div>
          <p className="text-[10px] text-stone-500 font-serif-kr mt-2 text-center">
            * 지도 위의 핀들을 선택해 각 지역에 대한 간략한 정보를 확인해보세요.
          </p>
        </div>

        {/* Detailed Lore Panel - Right (2 cols) */}
        <div className="xl:col-span-2 flex flex-col justify-between h-full min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRegion}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#f4efe2] border border-[#8b7355]/20 rounded-lg p-4 relative overflow-hidden h-full flex flex-col justify-between shadow-inner"
            >
              {/* Parchment background scroll borders */}
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#8b7355]/0 via-[#8b7355]/15 to-[#8b7355]/0 pointer-events-none" />
              <div className="absolute right-2.5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#8b7355]/0 via-[#8b7355]/15 to-[#8b7355]/0 pointer-events-none" />

              <div className="space-y-4 z-10">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#8b7355] font-bold uppercase">{currentRegion.englishName}</span>
                  <h4 className="text-base font-bold text-[#3e2723] font-serif-kr mt-0.5">
                    {currentRegion.name}
                  </h4>
                  <p className="text-xs text-amber-900/80 font-bold font-serif-kr italic mt-1">
                    "{currentRegion.atmosphere}"
                  </p>
                </div>

                <div className="text-xs text-[#5c3e21] leading-relaxed font-serif-kr space-y-3 pt-3 border-t border-[#8b7355]/15">
                  <p className="text-justify font-light">{currentRegion.description}</p>
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#8b7355]/10 flex justify-between items-center text-[10px] text-stone-500 z-10">
                <span className="font-serif-kr flex items-center gap-0.5 text-amber-800"><Sparkles className="w-3 h-3 fill-amber-500/20" /> 기록 보존됨</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
