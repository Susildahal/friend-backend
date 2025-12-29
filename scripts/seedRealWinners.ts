import dotenv from 'dotenv';
import client from '../src/config/sanity.js';

dotenv.config();

const realWinnersData = [
  {
    icon: 'TiHome',
    title: 'To Buy or Rent a Home',
    description:
      'Making housing accessible and affordable for all Australians through effective reforms and policies.',
  },
  {
    icon: 'FaCartShopping',
    title: 'Groceries',
    description:
      'Reducing everyday grocery costs to ensure families can afford nutritious food without financial strain.',
  },
  {
    icon: 'FaPrescriptionBottle',
    title: 'Healthcare and Prescribed Medication',
    description:
      'Providing affordable healthcare and prescription medicines to all citizens through policy interventions.',
  },
  {
    icon: 'MdElectricBolt',
    title: 'Utilities Services',
    description:
      'Lowering costs of electricity, gas, water, internet, and other essential utility services for households.',
  },
  {
    icon: 'FaGasPump',
    title: 'Petrol',
    description:
      'Ensuring fair pricing and accessibility for petrol and other fuels to support transportation needs.',
  },
  {
    icon: 'FaBus',
    title: 'Public Transport and Road Tolls',
    description:
      'Improving affordability and accessibility of public transport and reducing the burden of road tolls.',
  },
  {
    icon: 'FaBook',
    title: 'School Fees, Uniforms, and Books',
    description:
      'Making education more affordable by easing the financial load on families for school expenses.',
  },
  {
    icon: 'FaBeer',
    title: 'Enjoy a Beer or a Cigarette',
    description:
      'Allowing Australians to enjoy small pleasures without exorbitant taxation or financial strain.',
  },
  {
    icon: 'FaWater',
    title: 'Council and Water Rates',
    description:
      'Reducing ongoing council and water rates to ease household financial pressure.',
  },
  {
    icon: 'GiCigarette',
    title: 'Other Ongoing Necessities',
    description:
      'Addressing costs of other essential items needed for everyday life, ensuring affordability for all.',
  },
];

function makeArrayItem(item: { icon: string; title: string; description: string }, i: number) {
  return {
    _key: `${i}-${Date.now()}`,
    icon: item.icon,
    title: item.title,
    description: item.description,
  };
}

async function seed() {
  try {
    const doc = {
      _id: 'realWinnersSingleton',
      _type: 'realWinners',
      sectionTitle: 'Real Winners',
      sectionDescription: 'List of areas where real Australians need relief and support.',
      winnersList: realWinnersData.map(makeArrayItem),
    } as const;

    const result = await client.createOrReplace(doc as any);
    console.log('Seed successful:', result._id);
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
