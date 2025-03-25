'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.scss';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser, logout } from '@/services/authService';

interface User {
  id: string;
  email: string;
  name: string;
  isChef: boolean;
}

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(getCurrentUser());

  // Check for user data periodically
  useEffect(() => {
    const checkUser = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    };

    // Check every second
    const interval = setInterval(checkUser, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    try {
      setIsLoading(true);
      logout();
      // Redirect is handled in the logout function
    } catch (error) {
      console.error('Error logging out:', error);
      setIsLoading(false);
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span className={styles.icon}>🍳</span>
        <span className={styles.brandName}>CookEasy</span>
      </div>
      <div className={styles.navLinks}>
        <Link 
          href="/" 
          className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
        >
          Home
        </Link>
        <Link 
          href="/recipes" 
          className={`${styles.navLink} ${pathname === '/recipes' ? styles.active : ''}`}
        >
          Browse Recipes
        </Link>
        <Link 
          href="/chef" 
          className={`${styles.navLink} ${pathname === '/chef' ? styles.active : ''}`}
        >
          Book Chef
        </Link>

        <div className={styles.userSection}>
          {user ? (
            <>
              <span className={styles.userName}>
                Welcome, {user.name}
              </span>
              <button 
                onClick={handleLogout}
                disabled={isLoading}
                className={styles.logoutButton}
              >
                {isLoading ? 'Logging out...' : 'Logout'}
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
} 