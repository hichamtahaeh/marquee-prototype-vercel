'use client';
import Header from 'components/Header';
import Sidebar from 'components/molecules/Sidebar';
import { useEffect, useState } from 'react';
import { useGlobalValue } from 'lib/state';
import { setUser } from 'lib/actions/globalActions';
import axios from 'axios';

export default function DashboardLayout({ children }) {
    const [loading, setLoading] = useState(false);
    const [, dispatch] = useGlobalValue();

    const fetchCurrentUser = async () => {
        setLoading(true);
        console.log('load current user data into global state');
        const currentUserResponse = await axios.get('/api/users/me');
        dispatch(setUser(currentUserResponse.pass ? currentUserResponse.data : {}));
        setLoading(false);
    };

    // Load global states, then display app dashboard.
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <main className={`page--marquee-dashboard`}>
            <Sidebar />
            <div className='marquee-dashboard flex-grow'>
                <Header />
                {children}
            </div>
        </main>
    );
}
