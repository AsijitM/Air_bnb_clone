import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';

import prisma from '@/app/libs/prismadb';

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string')
    throw new Error('Invalid ID');

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      //this ensures that the only people able to delete the reservations is the user who made it and the property owner or the one who put the property for listing
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
