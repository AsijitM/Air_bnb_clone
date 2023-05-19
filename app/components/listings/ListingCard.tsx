'use client';

import useCountries from '@/app/hooks/useCountries';
import { SafeListings, safeUser } from '@/app/types';

import { Listing, Reservation } from '@prisma/client';

import { useRouter } from 'next/navigation';
import React, { FC, MouseEvent, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps {
  data: SafeListings;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: safeUser | null;
}
const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  //get loaction details from db
  const locaiton = getByValue(data.locationValue);
  //handlecancel used in trip reservation, and listing modifications
  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
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
      onClick={() => router.push(`/listings/${data.id}`)}
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
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {locaiton?.region}, {locaiton?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            {/* this is the price we declared before totalPrice or price */}$
            {price}
          </div>
          {!reservation && <div className="font-light"> night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
