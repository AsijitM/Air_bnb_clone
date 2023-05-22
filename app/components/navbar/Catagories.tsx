'use client';

import Container from '../Container';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { BsSnow } from 'react-icons/bs';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import CatagoryBox from '../CatagoryBox';
import { usePathname, useSearchParams } from 'next/navigation';
import { IoDiamond } from 'react-icons/io5';

export const catagories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This Property is close to the Beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This Property is close to the Windmills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This Property is Modern!',
  },
  {
    label: 'CountrySide',
    icon: TbMountain,
    description: 'This Property is is the Countryside!',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This Property has a pool!',
  },
  {
    label: 'Isalnd',
    icon: GiIsland,
    description: 'This Property is on a island!',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This Property is close to a lake!',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This Property has Skiing Activities!',
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This Property is in a castle!',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This Property has camping activities!',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This Property has Arctic activities!',
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This Property is in a cave!',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This Property is in Desert!',
  },
  {
    label: 'Barn',
    icon: GiBarn,
    description: 'This Property is in the barn!',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This Property is luxerious!',
  },
];

const Catagories = () => {
  //add a way so that the catagory button can read from thr URL query string and show selected option
  const params = useSearchParams();
  //extract the catagories
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';
  //if we are not on main page we are not gonna return anything
  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div
        className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
            "
      >
        {catagories.map((item) => (
          <CatagoryBox
            key={item.label}
            label={item.label}
            //we will make sure a catagory is selected by checking if is is in the params
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Catagories;
