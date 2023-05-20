'use client'

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import { catagories } from '@/app/components/navbar/Catagories';
import { SafeListings, safeUser } from '@/app/types';

import { Listing, Reservation } from '@prisma/client';
import React, { FC, useMemo } from 'react';

interface ListingClientProps {
  reservations?: Reservation[];
  listing: SafeListings & {
    user: safeUser;
  };
  currentUser?: safeUser | null;
}

const ListingClient: FC<ListingClientProps> = ({ listing, currentUser }) => {
  //this will give back the icon and details by matching the label in the user preference
  const catagory = useMemo(() => {
    return catagories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
