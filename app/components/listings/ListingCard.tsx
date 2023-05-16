'use client';

import useCountries from '@/app/hooks/useCountries';
import { safeUser } from '@/app/types';

import { Listing, Reservation } from '@prisma/client';

import { useRouter } from 'next/navigation';
import React, { FC, MouseEvent, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionId?: string;
  currentUser?: safeUser | null;
}
const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  //get loaction details from db
  const locaiton = getByValue(data.locationValue);
  //handlecancel used in trip reservation, and listing modifications
  const handleCancel = useCallback(
    (e: MouseEvent<HTMLBodyElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, disabled, actionId]
  );
  const price = useMemo(() => {
    // if we have reservation we use the reservation price
    if (reservation) {
      return reservation.totalPrice;
    }
    //else we will return the data.price
    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    //if no reservation then return null

    if (!reservation) return null;

    //else return the dates
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    // format comes from date-fns 3rd march to 5th march
    return `${format(start, 'PP')}- ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listing/${data.id}`)}
      className="
      col-span-1
      cursor-pointer
      group
      "
    >
      <div className=" flex flex-col gap-2 w-full">
        <div
          className="
          aspect-square
          w-full
          relative
          overflow-hidden
          rounded-xl
    "
        >
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="
             object-cover
             h-full
             w-full
             group-hover:scale-110
             transition
            "
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={data.id} c
              urrentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
