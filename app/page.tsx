import { Inter } from 'next/font/google';
import Container from './components/Container';
import EmptyState from './components/EmptyState';

export default function Home() {
  const isEmpty = true;

  if (isEmpty) {
    return (
      <EmptyState showReset/>
    )
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
        2xl:grid-cols-5
        gap-8
        "
      >
        <div>My furture listings</div>
      </div>
    </Container>
  );
}
