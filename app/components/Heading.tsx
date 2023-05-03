'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: string;
}

import React, { FC } from 'react';

const Heading: FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className=" text-2xl font-bold ">
        {title}
        <div className="font-light text-neutral-500 mt-2 ">{subtitle}</div>
      </div>
    </div>
  );
};

export default Heading;
