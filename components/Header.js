'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setUser } from 'lib/actions/globalActions';
import { useGlobalValue } from 'lib/state';

export default function Header() {
    const router = useRouter();
    const [{ user }, dispatch] = useGlobalValue();

    const logout = async () => {
        await axios.post('/api/expire');
        dispatch(setUser({}));
        router.push('/'); // Attempt to go home after removing token.
    };

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
