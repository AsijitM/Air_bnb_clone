import Container from './components/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/listings/ListingCard';

import getListings, { IListingsParams } from './actions/getLisitngs';
import getCurrentUser from './actions/getCurrentUser';

interface HomeProps {
  searchParams: IListingsParams;
}

export const dynamic = 'force-dynamic';

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  const isEmpty = true;


  if (listings?.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div
        className="
        grid
        pt-24
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        "
      >
        {listings?.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};
export default Home;
