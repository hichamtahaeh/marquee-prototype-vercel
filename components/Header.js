'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
    const router = useRouter();
    const [user, setUser] = useState({});

    const logout = async () => {
        await axios.post('/api/expire');
        router.push('/'); // Attempt to go home after removing token.
        localStorage.removeItem('user');
    };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    return (
        <div className='marquee-dashboard-header flex justify-between gap-4'>
            <h4>
                Welcome, {user?.name || ''}
                {'email' in user ? `(${user.email})` : ''}
            </h4>
            <a className='marquee-link' onClick={logout}>
                Logout
            </a>
        </div>
    );
}
