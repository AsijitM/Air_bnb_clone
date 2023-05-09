'use client';

import Container from '../Container';
import { TbBeach } from 'react-icons/tb';
import { GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import CatagoryBox from '../CatagoryBox';

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
];

const Catagories = () => {
    c
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
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Catagories;
