import prisma from '@/app/libs/prismadb';

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    //this will filter everything with less roomcount
    if (roomCount) {
      query.roomCount = {
        //gte = greater than or equal
        gte: +roomCount,
      };
    }
    if (guestCount) {
      query.guestCount = {
        //gte = greater than or equal
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        //gte = greater than or equal
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }
    //date filter
    if (startDate && endDate) {
      //reverse Filter
      //generally query will get you all the listings within this range, NOT will just do the opposite
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              //if we have only a single day left we will neglect that because that cant be reserved
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma?.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const SafeListings = listings?.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return SafeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
