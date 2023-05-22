'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons';
import { useCallback } from 'react';
import qs from 'query-string';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}
//icon:Icon we are using so that we can use that as an alias and can use it as a component
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  //for query we use useSearchParams
  const params = useSearchParams();

  //handleClick will handle the Catagory icons
  const handleClick = useCallback(() => {
    //define empty query
    let currentQuery = {};

    //check id params are there at all
    if (params) {
      //we are gonna craete object out of all of our current parameters
      //Parse a query string into an object
      currentQuery = qs.parse(params.toString());
    }

    //this will combine them together and add a new catagory to that using label
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // the catagory is already selected we remove the catagory from the query, it will only remove the catagory
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

      //pass the new query which we manupulated
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label,params,router]);
  return (
      <div
          onClick={handleClick}
      className={`
      flex
      flex-col
      items-center
      justify-center
      gap-2
      p-3
      border-b-2
      hover:text-neutral-800
      transition
      cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
              `}
    >
      {/* Now we can use it as a component */}
      <Icon size={26} />
      <div
        className="
          font-medium text-sm
          "
      >
        {label}
      </div>
    </div>
  );
};

export default CategoryBox;
