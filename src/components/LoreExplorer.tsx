/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoreItem } from '../types';
import { BookOpen, Map, Sparkles, UserCheck, ShieldAlert, Scroll } from 'lucide-react';

export default function LoreExplorer() {
  const [activeTab, setActiveTab] = useState<string>('yutus-continent');

  const loreData: LoreItem[] = [
    {
      id: 'yutus-continent',
      title: '평화롭고 고전적인 이세계, 유투스(Yutus)',
      subtitle: '검과 마법, 그리고 기름진 밀밭의 중세 대륙',
      content: '유투스는 사계절이 뚜렷하고 풍요로운 대지를 품은 중세 판타지 세계관입니다. 엘프나 마법학회가 세운 상아탑이 있으나 기본적으로 영주들이 자치권을 행사하고 백성들이 농경을 하는 전형적인 봉건 유럽 양식입니다.\n\n최근 100년 동안 마왕의 휴면기로 인해 군사보다는 평화로운 치안 유지에 힘을 쏟아왔기에, 대다수의 시골 사람들은 평온한 농사꾼의 마인드를 유지하고 있습니다. 당신이 소환된 곳은 이 대륙 최서단 변방에 위치한 소도시 신전으로, 평온하다 못해 파리가 날리는 한적함이 지배하고 있습니다.',
      tags: ['중세 유럽풍', '영주 지배령', '성당 자치구']
    },
    {
      id: 'summon-accident',
      title: '마법 의회 역사상 최대의 배달 사고',
      subtitle: '용사 옆자리에 달라붙은 무허가 이계인',
      content: '마왕 루시페르의 부활이 임박하자 왕립 마법 의회와 교단은 고대 금서의 "차원 강림 소환술"을 거행했습니다. 대상 좌표는 기가 막히게도 축구, 검술, 수학, 인성까지 완벽한 지구의 천재 고교생 "랜슬롯"의 방이었습니다.\n\n하지만 강림 술식이 기하학적 고위 연산을 계산하던 중, 마법진의 반경이 너무 넓게 설정되는 연산 오류가 발생했습니다. 하필이면 그 시각 랜슬롯의 아랫집 침대에서 라면을 먹으며 텍스트 RPG를 하던 평범한 지구인 당신의 영혼마저 랜슬롯의 전설급 오라에 공명해 함께 소환당하고 말았습니다.\n\n교단은 "어머나, 용사가 한 명 더 딸려왔어요!"라며 놀랐지만 스탯창 측정 후, 힘 6에 마력 1인 당신을 보고 조용히 먼지를 털어 구석방에 버려두기로 타협했습니다.',
      tags: ['연산 오류', '스탯 미달', '비밀 서약']
    },
    {
      id: 'real-hero',
      title: '진짜 용사 "랜슬롯"의 소식',
      subtitle: '황궁에서 연회를 즐기며 검기를 날리는 엄친아',
      content: '진짜 선택받은 용사인 랜슬롯은 소환되자마자 전신에서 뿜어져 나오는 성스러운 백금빛 광채로 대제사장을 기립시켰습니다. 황실 기사단의 호위를 받으며 수도 황궁으로 압송(?)되었고, 황제가 직접 전설의 대검 "갈라틴"을 하사했다고 합니다.\n\n현재 랜슬롯은 백은색 성검을 가볍게 휘두르는 것만으로도 마왕군 침투조 3개 분대를 화려하게 제압해 대륙 전역에 신드롬을 일으키고 있습니다. 그가 움직이는 길목마다 제과점에서 그의 시그니처 빵이 구워지고 있다는 소문이 있습니다. 당신에게는 사인을 받기 위한 팬심 어린 퀘스트가 주어지기도 합니다.',
      tags: ['진짜 용사', '빛의 인도자', '대륙의 슈퍼스타']
    },
    {
      id: 'demon-king',
      title: '마왕 "루시페르"와 그의 심복들',
      subtitle: '서류와 전략적 피해망상에 찌든 관료 마왕',
      content: '봉인에서 풀려난 100년 만의 절대 악, 루시페르. 힘은 최강이지만 의외로 치밀한 이성적 지략가이자 관공서 급의 서류 결재를 신조로 하는 꼼꼼한 지배자입니다.\n\n현재 마왕은 진짜 용사 랜슬롯의 무서운 명성보다도, 소환 오류 당시 흘러 들어간 당신의 지구제 문물(예: 뜯어진 불닭볶음면 봉지, 빈 캔콜라, 한글 소설책)의 흔적을 첩보부로 입수하여 밤잠을 설치고 있습니다. 마왕은 이것을 "용사 세력이 고안한 최고 비밀 기하학 고대 오컬트 수호 문양"이라 규정하고, 해독법을 알아내기 전까지 전 마왕군의 기습 작전을 대기시키는 엄청난 경계망을 펼쳐 두었습니다.',
      tags: ['마왕 루시페르', '오버 테크놀로지 경계', '꼼꼼한 결재망']
    }
  ];

  const activeLore = loreData.find(item => item.id === activeTab) || loreData[0];

  return (
    <div className="bg-[#fcf8f2] border-2 border-[#8b7355]/40 rounded-xl p-5 shadow-[inset_0_0_30px_rgba(139,115,85,0.1),0_10px_20px_rgba(45,35,25,0.08)] flex flex-col h-full" id="world-lore-codex">
      {/* Title */}
      <div className="border-b-2 border-double border-[#8b7355]/30 pb-3 mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-[#8b7355]" />
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#8b7355] font-bold font-mono block">Yutus Chronicles</span>
          <h3 className="text-lg font-bold text-[#3e2723] font-serif-kr">이세계 유투스 대륙 연대기</h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4 border-b border-[#8b7355]/15 pb-3">
        {loreData.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-serif-kr font-bold transition-all border shrink-0 ${
              activeTab === item.id
                ? 'bg-[#5c3e21] text-[#f4efe2] border-[#3e2723] shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-300'
            }`}
          >
            {item.id === 'yutus-continent' && '🏰 유투스 대륙'}
            {item.id === 'summon-accident' && '🌀 소환 배달사고'}
            {item.id === 'real-hero' && '✨ 진짜 용사'}
            {item.id === 'demon-king' && '👿 서류파 마왕'}
          </button>
        ))}
      </div>

      {/* Main Parchment scroll Content */}
      <div className="flex-1 bg-[#f4efe2] border border-[#8b7355]/20 rounded-lg p-4 relative overflow-hidden flex flex-col justify-between shadow-inner">
        {/* Subtle decorative scroll line inside container */}
        <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-gradient-to-b from-[#8b7355]/0 via-[#8b7355]/10 to-[#8b7355]/0" />
        <div className="absolute right-2.5 top-2.5 bottom-2.5 w-0.5 bg-gradient-to-b from-[#8b7355]/0 via-[#8b7355]/10 to-[#8b7355]/0" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 z-10"
          >
            <div className="flex items-start gap-1.5">
              <Scroll className="w-4 h-4 text-[#8b7355] mt-0.5 shrink-0" />
              <div>
                <h4 className="text-base font-bold text-[#3e2723] font-serif-kr leading-tight">
                  {activeLore.title}
                </h4>
                <p className="text-xs text-[#8b7355] italic font-serif-kr mt-0.5">
                  {activeLore.subtitle}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#5c3e21] leading-relaxed font-serif-kr whitespace-pre-line text-justify pt-1 border-t border-[#8b7355]/10">
              {activeLore.content}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Tags at bottom */}
        <div className="mt-4 flex flex-wrap gap-1.5 z-10 border-t border-[#8b7355]/10 pt-2.5">
          {activeLore.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[9.5px] bg-[#3e2723]/5 text-[#5c3e21] border border-[#8b7355]/20 px-2 py-0.5 rounded-full font-serif-kr"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
