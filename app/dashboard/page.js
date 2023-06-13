'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Loader from 'components/Loader';

export default function Protected() {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simple method to fetch data from cms.
  const getListings = async () => {
    setLoading(true);
    const response = await axios.get('/api/listings');
    setListings(response.data.pass ? response.data.data : []); // Set state.
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await axios.post('/api/expire');
    router.push('/'); // Attempt to go home after removing token.
    setLoading(false);
  };

  // First load, fetch listings for this user.
  useEffect(() => {
    getListings();
  }, []);

  return (
    <main className={`main${loading ? ' loading' : ''}`}>
      <div className='marquee-dashboard relative'>
        <h1 className='text-4xl font-bold mb-8'>Dashboard</h1>
        <h3 className='text-xl font-bold mb-2'>View all listings below</h3>
        <div className='description'>
          {listings.map((listing, i) => (
            <div key={i} className='mt-4'>
              {i + 1}. {listing.name}
              <br />
              {listing.description}
            </div>
          ))}
          {listings.length < 1 && <div>There are currently no listings for this user's organization.</div>}
        </div>
        <div className='flex gap-4 mt-4'>
          <button onClick={getListings} className='marquee-button'>
            Refresh Listings
          </button>
          <button className='marquee-button' onClick={logout}>
            Remove cookie and Reload
          </button>
        </div>
        <Loader loading={loading} />
      </div>
    </main>
  );
}
