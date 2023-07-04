'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from 'components/atoms/Loader';
import Button from 'components/atoms/Button';
import { setUser } from 'lib/actions/globalActions';
import { useGlobalValue } from 'lib/state';

export default function Home() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState('');
    const [loading, setLoading] = useState(false);
    // const [ { user }, dispatch ] = useGlobalValue();
    const [, dispatch] = useGlobalValue();

    const login = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', {
                email,
                candidatePassword: password,
            });
            setNotification(response.pass ? '' : response.data);
            if (response.pass) {
                dispatch(setUser(response.data));
                router.push('/dashboard');
            }
        } catch (err) {
            console.log(err);
            setNotification('issue while communicating with edge servers.');
        }
        setLoading(false);
    };

    return (
        <main className={`relative main 3xl:py-4 page--marquee-login`}>
            <div className={`marquee-login${loading ? ' marquee-loader-container' : ''}`}>
                <div className='marquee-login-form flex flex-col relative'>
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
                    <Button label='Sign In' classNames='mb-2' onClick={login}></Button>
                    {notification !== '' && <p className='text-red-500'>{notification}</p>}
                </div>
            </div>
            <Loader loading={loading} />
        </main>
    );
}
