'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from 'components/atoms/Loader';
import Button from 'components/atoms/Button';
// import { queryDataset } from 'lib/sanityAxios';

export default function Dashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simple method to fetch data from cms.
  const getListings = async (handleLoading = true) => {
    handleLoading && setLoading(true);

    // Using edge function.
    const response = await axios.get('/api/listings');
    console.log('response', response);
    setListings(response.data.pass ? response.data.data : []); // Set state.

    // Using axios direct alternative.
    // const response = await queryDataset({ q: '*[_type == "listing" && organization._ref == "83706b90-c9e5-41bd-8d11-0ba2820b7c19"]' });
    // console.log('response axios', response);
    // setListings(response.pass ? response.data.result : []);
    handleLoading && setLoading(false);
  };

  const createListing = async () => {
    setLoading(true);
    const response = await axios.post('/api/listings', listings[0]);
    console.log('response', response);
    await getListings(false);
    setLoading(false);
  };

  const removeListing = async (_id) => {
    setLoading(true);
    const response = await axios.delete(`/api/listings/${_id}`);
    console.log('response', response);
    await getListings(false);
    setLoading(false);
  };

  // First load, fetch listings for this user.
  useEffect(() => {
    getListings();
  }, []);

  return (
    <div className='marquee-dashboard-summary relative'>
      <div className={`py-16 px-8 ${loading ? ' marquee-loader-container' : ''}`}>
        <h1 className='text-4xl font-bold mb-8'>Dashboard</h1>
        <h3 className='text-xl font-bold mb-2'>View all listings below</h3>
        <div className='marquee-listings'>
          {listings.map((listing, i) => (
            <div key={i} className='mt-4'>
              <h4 className='flex justify-between mb-1'>
                <span>
                  {i + 1}. {listing.name}
                </span>
                <span className='text-sm'>Last Updated: {listing._updatedAt}</span>
              </h4>
              <div className='flex justify-between items-center gap-4'>
                <p>{listing.description}</p>
                {i !== 0 && (
                  <Button
                    label='Remove'
                    mode='red'
                    onClick={() => {
                      removeListing(listing._id);
                    }}
                  ></Button>
                )}
              </div>
            </div>
          ))}
          {listings.length < 1 && <div>There are currently no listings for this user's organization.</div>}
        </div>
        <div className='flex gap-4 mt-4'>
          <Button label='Refresh Listings' onClick={getListings}></Button>
          {listings.length > 0 ? <Button label='Create Listing' onClick={createListing}></Button> : null}
        </div>
      </div>
      <Loader loading={loading} />
    </div>
  );
}
