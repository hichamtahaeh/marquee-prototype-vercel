'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from 'components/Loader';

export default function Dashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simple method to wait a specified amount of milliseconds before continuing execution thread.
  // const waitMs = async (ms = 1000) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(true);
  //     }, ms);
  //   });
  // };

  // Simple method to fetch data from cms.
  const getListings = async (handleLoading = true) => {
    handleLoading && setLoading(true);
    const response = await axios.get('/api/listings');
    setListings(response.data.pass ? response.data.data : []); // Set state.
    handleLoading && setLoading(false);
  };

  const createListing = async () => {
    setLoading(true);
    const response = await axios.post('/api/listings', listings[0]);
    console.log('response', response);
    // await waitMs(1000);
    // await getListings(false);
    setLoading(false);
  };

  const removeListing = async (_id) => {
    setLoading(true);
    const response = await axios.delete(`/api/listings/${_id}`);
    console.log('response', response);
    // await waitMs(1000);
    // await getListings(false);
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
                  <button
                    onClick={() => {
                      removeListing(listing._id);
                    }}
                    className='marquee-button marquee-button--red'
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          {listings.length < 1 && <div>There are currently no listings for this user's organization.</div>}
        </div>
        <div className='flex gap-4 mt-4'>
          <button onClick={getListings} className='marquee-button'>
            Refresh Listings
          </button>
          {listings.length > 0 ? (
            <button onClick={createListing} className='marquee-button'>
              Create Listing
            </button>
          ) : null}
        </div>
      </div>
      <Loader loading={loading} />
    </div>
  );
}
