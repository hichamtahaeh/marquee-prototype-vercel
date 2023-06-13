'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from 'components/Loader';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', {
        email,
        candidatePassword: password,
      });
      setNotification(response.data.pass ? '' : response.data.data);
      if (response.data.pass) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.log(err);
      setNotification('issue while communicating with edge servers.');
    }
    setLoading(false);
  };

  return (
    <main className={`main${loading ? ' loading' : ''} 3xl:py-4`}>
      <div className='marquee-login flex flex-col relative'>
        <h1 className='text-4xl font-bold mb-8'>Sign in to Marquee</h1>
        <label>Email</label>
        <input
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          className='marquee-input marquee-input--text mb-6'
          type='text'
        />
        <label>Password</label>
        <input
          value={password}
          type='password'
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className='marquee-input marquee-input--text mb-8'
        />
        <button onClick={login} className='marquee-button mb-2'>
          Sign In
        </button>
        {notification !== '' && <p className='text-red-500'>{notification}</p>}
        <Loader loading={loading} />
      </div>
      {/* <a
        className='card'
        onClick={() => {
          fetch('/api/auth', { method: 'POST' }).then(() => {
            router.push('/dashboard');
          });
        }}
      >
        Set the {USER_TOKEN} cookie and login <span>-&gt;</span>
      </a> */}
    </main>
  );
}
