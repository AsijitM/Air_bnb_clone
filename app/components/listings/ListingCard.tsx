'use client'

import { safeUser } from '@/app/types';

import { Listing, Reservation } from '@prisma/client';

import { useRouter } from 'next/navigation';
import React, { FC } from 'react';



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
  actionId,
  currentUser,
}) => {
  const router = useRouter();
  return <div>ListingCard</div>;
};

export default ListingCard;
