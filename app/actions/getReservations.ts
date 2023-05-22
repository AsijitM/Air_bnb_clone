import prisma from '@/app/libs/prismadb';
import { id } from 'date-fns/locale';

//not only on reservations page but also on my reservations page we have to render it, so we need the listingId or userId
interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};
    //if we send listingid we can see all the resevations of that single listing
    if (listingId) {
      query.listingId = listingId;
    }

    //if we send the userid then we can see the reservations made by the user in his reservations tab
    if (userId) {
      query.userId = userId;
    }

    //if we send the authorId ,author can see the resvations made on his property by the users
    if (authorId) {
      query.authorId = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
