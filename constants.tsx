
import { Crystal } from './types';

export const INITIAL_CRYSTALS: Crystal[] = [
  {
    id: '1',
    name: 'Amethyst',
    color: ['Purple', 'Violet'],
    healingProperties: ['Clarity', 'Peace', 'Protection'],
    description: 'A purple variety of quartz often used in jewelry and for its purported healing properties.',
    imageUrl: 'https://picsum.photos/seed/amethyst/600/400',
    chakra: ['Third Eye', 'Crown'],
    hardness: '7'
  },
  {
    id: '2',
    name: 'Rose Quartz',
    color: ['Pink'],
    healingProperties: ['Love', 'Compassion', 'Emotional Healing'],
    description: 'The stone of universal love. It restores trust and harmony in relationships.',
    imageUrl: 'https://picsum.photos/seed/rosequartz/600/400',
    chakra: ['Heart'],
    hardness: '7'
  },
  {
    id: '3',
    name: 'Citrine',
    color: ['Yellow', 'Gold'],
    healingProperties: ['Abundance', 'Joy', 'Manifestation'],
    description: 'Energizing and life-giving, Citrine is the stone of the summer.',
    imageUrl: 'https://picsum.photos/seed/citrine/600/400',
    chakra: ['Solar Plexus', 'Sacral'],
    hardness: '7'
  },
  {
    id: '4',
    name: 'Clear Quartz',
    color: ['Clear', 'White'],
    healingProperties: ['Master Healer', 'Energy Amplification'],
    description: 'Known as the "master healer," it will amplify energy and thought.',
    imageUrl: 'https://picsum.photos/seed/clearquartz/600/400',
    chakra: ['All'],
    hardness: '7'
  },
  {
    id: '5',
    name: 'Black Tourmaline',
    color: ['Black'],
    healingProperties: ['Protection', 'Grounding', 'Stress Relief'],
    description: 'A powerful grounding stone, providing a connection between Earth and the human spirit.',
    imageUrl: 'https://picsum.photos/seed/blacktourmaline/600/400',
    chakra: ['Root'],
    hardness: '7-7.5'
  },
  {
    id: '6',
    name: 'Lapis Lazuli',
    color: ['Deep Blue'],
    healingProperties: ['Wisdom', 'Truth', 'Intuition'],
    description: 'A deep-blue metamorphic rock used as a semi-precious stone that has been prized since antiquity.',
    imageUrl: 'https://picsum.photos/seed/lapis/600/400',
    chakra: ['Third Eye', 'Throat'],
    hardness: '5-5.5'
  }
];
