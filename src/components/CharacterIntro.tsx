/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, User, Flame, Info, Heart } from 'lucide-react';

// Import newly uploaded character portraits
import imgHermina from '../assets/images/헤르미나.png';
import imgLuke from '../assets/images/루크 앤더슨.png';
import imgValeria from '../assets/images/발레리아 로시.png';
import imgLena from '../assets/images/레나 엘라.png';
import imgDaisy from '../assets/images/데이지 블리스.png';
import imgRoderick from '../assets/images/로데릭 쏘운.png';
import imgValzerion from '../assets/images/발제리온.png';
import imgMorphian from '../assets/images/모르피안.png';
import imgBathory from '../assets/images/바토리.png';
import imgKretovant from '../assets/images/크레토반트.png';

interface Character {
  id: string;
  category: 'divine' | 'paladion' | 'pandemonium';
  name: string;
  role: string;
  avatar: string;
  visualVibe: string;
  specialty: string;
  temperament: string;
  description: string;
  additionalLore: string;
}

export default function CharacterIntro() {
  const [activeSubTab, setActiveSubTab] = useState<'divine' | 'paladion' | 'pandemonium'>('divine');
  const [selectedId, setSelectedId] = useState<string>('hermina');

  const characters: Character[] = [
    {
      id: 'hermina',
      category: 'divine',
      name: '헤르미나',
      role: '유투스의 주신 (Goddess of Yutus)',
      avatar: imgHermina,
      visualVibe: '신비롭게 빛나는 금빛 머리칼, 아름답지만 어딘가 허술한 외모.',
      specialty: '용사 소환(과 사소한 실수), 축복 하사, 세상 지켜보면서 팝콘 뜯기',
      temperament: '선량, 허술, 유쾌, 발랄. 재밌는 게 제일 좋다.',
      description: '유투스의 주신입니다. 능력도, 외모도 뛰어나지만 문제는 너무나도 허술합니다. 그래도 용사 소환이라는 중요한 일은 그간 잘 해내왔는데, 이번엔 기어코 용사 소환까지 실수하고 말았습니다.',
      additionalLore: '두 명을 소환한 게 자신의 실수 때문이라는 걸 숨기려고 의도적으로 사제들에게 아무 계시도 내려주지 않고 있습니다. 실수 당시에는 당황했지만, 지금 상황도 나름 재밌다고 생각중입니다.'
    },
    {
      id: 'luke',
      category: 'paladion',
      name: '루크 앤더슨',
      role: '빛의 용사 (Hero)',
      avatar: imgLuke,
      visualVibe: '주신과 닮은 밝은 금빛 머리칼, 듬직한 체구와 순해보이는 인상.',
      specialty: '용사의 축복을 받아 검과 방패를 자유자재로 다룰 수 있음',
      temperament: '쾌활하고 정이 넘치며, 편견 없는 대형견 같은 성격.',
      description: '팔라디온의 사제들이 마왕 견제를 위해 소환한 용사입니다. 어찌나 친화력이 좋은지, 소환된 것에 당황하긴 커녕 순식간에 세상 모두와 친구가 되려고 하고 있습니다.',
      additionalLore: '자신이 용사라는 것을 인지하고 있고, 악을 물리쳐야 한다는 사명감도 있지만, 마음이 여려 조금은 망설임을 품고 있습니다.'
    },
    {
      id: 'valeria',
      category: 'paladion',
      name: '발레리아 로시',
      role: '용사 파티 마법사 (Wizard)',
      avatar: imgValeria,
      visualVibe: '영롱한 보라빛이 은은하게 섞인 흑발, 육감적인 외모.',
      specialty: '화염 마법, 얼음 마법',
      temperament: '진하게 몸을 섞는 게 가장 즐거운 사람.',
      description: '용사 파티에서 사실상 리더 역할을 맡고 있는 마법사입니다. 짓궂고 외설적이지만 실력만큼은 확실합니다. 진지할 땐 유능한 면모를 보여주곤 합니다.',
      additionalLore: '상대가 좀 매력적이다 싶으면 아무하고나 몸을 섞고는 하지만 감정적 교류에는 익숙하지 않습니다.'
    },
    {
      id: 'lena',
      category: 'paladion',
      name: '레나 엘라',
      role: '용사 파티 궁수 (Ranger)',
      avatar: imgLena,
      visualVibe: '부드러운 금빛 머리칼, 뾰족한 귀와 시원하게 뻗은 팔다리.',
      specialty: '궁술, 함정 제작, 은신술',
      temperament: '눈치 빠르고 이타적이며 남을 잘 챙기는 성격.',
      description: '용사 파티 유일한 엘프로, 단순히 활만 다루는 게 아니라 함정이나 독극물도 다룰 줄 압니다. 자연스레 남을 챙기는데, 너무 남을 신경쓰다가 본인이 스트레스를 받고는 합니다.',
      additionalLore: '이번 용사 파티가 워낙 독특한 인물이 많다보니 아주아주아주 조금이지만 용사 파티에 지원한 걸 후회하고 있습니다.'
    },
    {
      id: 'daisy',
      category: 'paladion',
      name: '데이지 블리스',
      role: '용사 파티 사제 (Priest)',
      avatar: imgDaisy,
      visualVibe: '신성함이 느껴지는 금빛 머리칼, 순수하고 해맑은 얼굴.',
      specialty: '신성 마법(치유와 강화에 치중됨)',
      temperament: '아무거나 다 물들 수 있는 순수한 백도화지 그 자체.',
      description: '용사 파티에 힐러로서 파견된 사제입니다. 공격 능력은 미숙하지만 치유와 강화 능력은 확실하며, 재능의 싹이 범상치 않습니다. 그런데... 순수해도 너무 순수합니다.',
      additionalLore: '너무 순수해서 순수악이다 싶을 정도입니다. 파티원들이 기행을 벌이면 말리거나 이상하게 생각하긴 커녕 재밌어 보인다며 같이 물들어버립니다.'
    },
    {
      id: 'roderick',
      category: 'paladion',
      name: '로데릭 쏘운',
      role: '모험가 (Adventurer)',
      avatar: imgRoderick,
      visualVibe: '깔끔하게 정돈된 짧은 흑발, 인간을 초월한 듯한 우람한 체구.',
      specialty: '격투술, 둔기술, 원소술, 생존술... 그 외 다수',
      temperament: '꼭 필요한 말만 하는 과묵함과 우직하게 밀어붙이는 대담함을 겸비한 성격.',
      description: '팔라디온에 몇 안 되는 오팔 등급 모험가입니다. 인간을 초월한 강자로, 조용히 세상 곳곳을 돌며 사람들을 돕곤 합니다.',
      additionalLore: '행동이 묘하게 각이 잡혀있는 게, 귀한 신분 출신인 것 같습니다.'
    },
    {
      id: 'valzerion',
      category: 'pandemonium',
      name: '발제리온',
      role: '마왕 (Overlord)',
      avatar: imgValzerion,
      visualVibe: '칠흑같은 긴 흑발, 서늘함이 느껴질 정도로 무감정한 얼굴.',
      specialty: '압도적인 수준의 어둠 마법',
      temperament: '냉정하고 무자비하며, 실수를 용납하지 않는 완벽주의자.',
      description: '오랫동안 팔라디온을 괴롭히고 있는 마왕입니다. 용사가 소환되면 잠시 세력이 주춤했다가, 공백기 동안 다시 힘을 키워 팔라디온을 집어삼키려고 하는 것을 끝없이 반복하고 있습니다.',
      additionalLore: '무자비한 성격은 같은 마족에게도 향하며, 실수를 한 부하의 목숨을 망설임 없이 거두어 가는 냉혈한입니다.'
    },
    {
      id: 'morphian',
      category: 'pandemonium',
      name: '모르피안',
      role: '판데모니움 군단장 겸 몽마의 왕 (King of Incubus)',
      avatar: imgMorphian,
      visualVibe: '빨려들어갈 듯한 흑발과 진보라빛 피부, 육감적인 체형.',
      specialty: '감정 제어, 감각 증폭, 꿈 조종',
      temperament: '본인의 이익을 중시하는 실리주의적 성격.',
      description: '마왕군을 이끄는 군단장이자 몽마들의 왕입니다. 최우선적으로 처치해야 할 강력한 주요 적이지만, 왠지 모르게 적의는 별로 없어보입니다.',
      additionalLore: '마왕에게 충성하기 보다는 본인이 마왕 밑에 있는 게 손해가 아니라서 따르고 있을 뿐입니다. 인간의 정기를 아주 좋아해서 인간이 멸종하길 바라지 않습니다.'
    },
    {
      id: 'bathory',
      category: 'pandemonium',
      name: '바토리',
      role: '판데모니움 심문관 (Inquisitor)',
      avatar: imgBathory,
      visualVibe: '고혹적이고 우아한 적발의 곱슬머리, 인형 같은 외모.',
      specialty: '감각 증폭(주로 통각에 특화됨)',
      temperament: '타인의 고통을 쾌락으로 삼는 지독한 사디스트.',
      description: '판데모니움의 포로 심문관 역할을 맡고 있습니다. 말이 심문이지 무조건 고문으로 이루어지며, 자백을 얻어내기보단 그냥 고통을 주는 것 자체를 즐기는 것뿐입니다.',
      additionalLore: '충성심 보다는 발제리온 곁에 있으면 꾸준히 고문할 수 있는 포로를 얻을 수 있기에 기쁜 마음으로 일하고 있습니다.'
    },
    {
      id: 'kretovant',
      category: 'pandemonium',
      name: '크레토반트',
      role: '판데모니움 연구원 (Researcher)',
      avatar: imgKretovant,
      visualVibe: '부스스한 백발, 늘 나른한 표정.',
      specialty: '뛰어난 지능, 키메라 군단 제어',
      temperament: '잔혹하고 무자비하며, 동족에 대한 애정도 전혀 없음.',
      description: '판데모니움의 연구원입니다. 주로 마족 군대 전열에 세울 마물이나 키메라를 만들어내는 역할을 합니다.',
      additionalLore: '본인은 마족 치고 전투능력이 떨어지지만, 크게 신경쓰는 분위기는 아닙니다. 늘 나른한 표정을 짓고 있지만 내재된 감정은 변덕스럽게 요동칩니다.'
    }
  ];

  const handleTabChange = (tab: 'divine' | 'paladion' | 'pandemonium') => {
    setActiveSubTab(tab);
    const filtered = characters.filter(c => c.category === tab);
    if (filtered.length > 0) {
      setSelectedId(filtered[0].id);
    }
  };

  const filteredCharacters = characters.filter(c => c.category === activeSubTab);
  const currentCharacter = characters.find(c => c.id === selectedId) || filteredCharacters[0] || characters[0];

  return (
    <div className="bg-[#fcf8f2] border-2 border-[#8b7355]/40 rounded-xl p-6 shadow-[inset_0_0_30px_rgba(139,115,85,0.1),0_10px_25px_rgba(45,35,25,0.08)] flex flex-col h-full font-serif-kr" id="interactive-yutus-characters">
      {/* Title block */}
      <div className="border-b border-[#8b7355]/20 pb-3 mb-4">
        <span className="text-[10px] uppercase tracking-widest text-[#8b7355] font-bold font-mono block">Personnel Record</span>
        <h3 className="text-xl font-bold text-[#3e2723] flex items-center gap-1.5 mt-0.5">
          <User className="w-5 h-5 text-[#8b7355]" />
          주역 인물
        </h3>
      </div>

      {/* Domain Sub-tabs Selector */}
      <div className="flex gap-1.5 border-b border-[#8b7355]/15 pb-3 mb-4 select-none">
        <button
          onClick={() => handleTabChange('divine')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all border ${
            activeSubTab === 'divine'
              ? 'bg-[#5c3e21] text-[#f4efe2] border-[#3e2723] shadow-inner scale-[1.02]'
              : 'bg-white/40 border-[#8b7355]/15 text-[#5c3e21] hover:bg-[#8b7355]/5 hover:border-[#8b7355]/30'
          }`}
        >
          ✨ 신계
        </button>
        <button
          onClick={() => handleTabChange('paladion')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all border ${
            activeSubTab === 'paladion'
              ? 'bg-[#5c3e21] text-[#f4efe2] border-[#3e2723] shadow-inner scale-[1.02]'
              : 'bg-white/40 border-[#8b7355]/15 text-[#5c3e21] hover:bg-[#8b7355]/5 hover:border-[#8b7355]/30'
          }`}
        >
          🏰 팔라디온
        </button>
        <button
          onClick={() => handleTabChange('pandemonium')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all border ${
            activeSubTab === 'pandemonium'
              ? 'bg-[#5c3e21] text-[#f4efe2] border-[#3e2723] shadow-inner scale-[1.02]'
              : 'bg-white/40 border-[#8b7355]/15 text-[#5c3e21] hover:bg-[#8b7355]/5 hover:border-[#8b7355]/30'
          }`}
        >
          👿 판데모니움
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left list of filtered names (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-2.5">
          {filteredCharacters.map((char) => {
            const isSelected = char.id === selectedId;
            return (
              <button
                key={char.id}
                onClick={() => setSelectedId(char.id)}
                className={`w-full text-left p-3.5 rounded-lg border-2 transition-all duration-300 flex items-center gap-3 relative overflow-hidden ${
                  isSelected 
                    ? 'bg-[#5c3e21] border-[#3e2723] text-[#f4efe2] shadow-md scale-[1.02]' 
                    : 'bg-white/50 border-[#8b7355]/15 hover:border-[#8b7355]/40 text-[#3e2723] hover:bg-stone-50'
                }`}
              >
                {/* Background light reflection for selected */}
                {isSelected && (
                  <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
                )}

                {/* Mini Portrait Circle focusing on the head */}
                <div className={`w-10 h-10 rounded-full border-2 overflow-hidden shrink-0 relative ${
                  isSelected ? 'border-white/40 bg-white/10' : 'border-[#8b7355]/20 bg-amber-950/5'
                }`}>
                  <img
                    src={char.avatar}
                    alt={char.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center scale-100"
                  />
                </div>

                {/* Text summary info */}
                <div className="truncate flex-1">
                  <h4 className="font-bold font-serif-kr text-sm">{char.name}</h4>
                  <p className={`text-[10px] font-serif-kr mt-0.5 truncate ${
                    isSelected ? 'text-amber-100/70' : 'text-stone-500'
                  }`}>
                    {char.role}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Details card (7 cols) */}
        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#f4efe2] border border-[#8b7355]/20 rounded-lg p-5 relative overflow-hidden h-full flex flex-col justify-between shadow-inner"
            >
              {/* Background graphic */}
              <div className="absolute -right-6 -bottom-6 opacity-5 text-[#5c3e21] pointer-events-none">
                <Flame className="w-32 h-32" />
              </div>

              {/* Header inside details with Face Portrait */}
              <div className="space-y-4">
                
                {/* Portrait and Identity Header Row */}
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start border-b border-[#8b7355]/15 pb-4">
                  {/* Portrait focusing on the face */}
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl border-2 border-[#8b7355]/40 overflow-hidden bg-amber-950/5 shadow-md shrink-0 relative group">
                    <img 
                      src={currentCharacter.avatar} 
                      alt={currentCharacter.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="text-center sm:text-left space-y-1 flex-1">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5">
                      <span className="text-[9px] bg-amber-900/10 text-amber-900 border border-amber-900/15 px-1.5 py-0.2 rounded font-sans uppercase font-black">
                        PROFILE_{currentCharacter.id.toUpperCase()}
                      </span>
                      {currentCharacter.category === 'divine' && <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-bounce" />}
                    </div>
                    <h4 className="text-lg font-bold text-[#3e2723] font-serif-kr">
                      {currentCharacter.name}
                    </h4>
                    <p className="text-xs text-[#8b7355] italic font-serif-kr">
                      "{currentCharacter.role}"
                    </p>
                  </div>
                </div>

                {/* Profile Grid Data */}
                <div className="space-y-2.5 pt-1 text-xs text-[#5c3e21] font-serif-kr">
                  <div>
                    <span className="font-bold text-stone-800 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-[#8b7355]" /> 비주얼
                    </span>
                    <p className="mt-0.5 text-[#5c3e21] pl-4 leading-normal text-justify">{currentCharacter.visualVibe}</p>
                  </div>
                  
                  <div>
                    <span className="font-bold text-stone-800 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-[#8b7355]" /> 특기
                    </span>
                    <p className="mt-0.5 text-[#5c3e21] pl-4 leading-normal text-justify">{currentCharacter.specialty}</p>
                  </div>

                  <div>
                    <span className="font-bold text-stone-800 flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-[#8b7355]" /> 성격
                    </span>
                    <p className="mt-0.5 text-[#5c3e21] pl-4 leading-normal text-justify">{currentCharacter.temperament}</p>
                  </div>

                  {/* Core biography description */}
                  <div className="bg-[#fcf8f2]/90 border border-[#8b7355]/15 p-3 rounded mt-2.5 leading-relaxed">
                    <p className="text-[11.5px] font-serif-kr text-justify font-light text-stone-700">{currentCharacter.description}</p>
                    <p className="text-[10.5px] font-serif-kr text-justify mt-2 text-stone-500 italic pl-2 border-l border-[#8b7355]/30">
                      * 비하인드: {currentCharacter.additionalLore}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#8b7355]/10 text-[9.5px] font-mono text-[#8b7355]/80 text-right">
                CHRONICLE_DOSSIER // CONFIDENTIAL_YUTUS
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
