'use client';

import { useEffect, useState } from 'react';

export default function Sidebar() {
  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/my-content', label: 'My Content' },
    { href: '/dashboard/learning', label: 'Learning' },
    { href: '/dashboard/funding', label: 'Funding' },
    { href: '/dashboard/community', label: 'Community' },
    { href: '/dashboard/support', label: 'Support' },
  ];

  const [currentPath, setCurrentPath] = useState('');
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className='marquee-sidebar'>
      <ul>
        {links.map((link, i) => (
          <li key={i}>
            <a className={currentPath === link.href ? 'active' : ''} href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
