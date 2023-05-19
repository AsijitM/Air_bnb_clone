import getListingById from '@/app/actions/getListingById'
import React from 'react'

const ListingPage = async() => {
  const listing =await getListingById()
  return (
    <div>My individual listing page!</div>
  )
}

export default ListingPage