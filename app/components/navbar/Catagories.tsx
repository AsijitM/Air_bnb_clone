'use client';

import Container from '../Container';
import { TbBeach } from 'react-icons/tb';
import { GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import CatagoryBox from '../CatagoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

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
  //add a way so that the catagory button can read from thr URL query string and show selected option
  const params = useSearchParams();
  //extract the catagories
  const catagory = params?.get('catagory');
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
            selected={catagory === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Catagories;
