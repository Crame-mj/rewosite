/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CharacterStatus {
  name: string;
  title: string;
  classType: string;
  level: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  stats: {
    strength: number;
    agility: number;
    intelligence: number;
    mana: number;
    luck: number;
  };
  skills: {
    name: string;
    description: string;
    cost: string;
  }[];
  inventory: {
    name: string;
    type: string;
    description: string;
    quantity: number;
  }[];
}

export interface CombatLog {
  id: string;
  type: 'system' | 'player' | 'enemy' | 'narration' | 'damage' | 'victory' | 'defeat';
  text: string;
}

export interface LoreItem {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
}

export interface Quest {
  id: string;
  title: string;
  difficulty: '하(下)' | '중(中)' | '상(上)' | '재앙(災殃)';
  reward: string;
  description: string;
  status: 'available' | 'ongoing' | 'completed' | 'failed';
  resultText?: string;
}
