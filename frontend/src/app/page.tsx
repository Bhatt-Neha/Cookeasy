'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';
import Cookies from 'js-cookie';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by looking for a token or user data in local storage
    const user = Cookies.get('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <main className={styles.main}>
     

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.floatingText}>Welcome to CookEasy</h1>
        <div className={styles.buttons}>
          {!isLoggedIn && (
            <>
              <Link href="/auth/register" className={styles.registerBtn}>Register</Link>
              <Link href="/auth/login" className={styles.loginBtn}>Log In</Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featureCard}>
          <div className={styles.imageWrapper}>
            <Image
              src="/Cooking_chef2.jpg"
              alt="Chefs preparing various dishes"
              width={500}
              height={300}
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <p>Explore a variety of cuisines and discover new culinary delights.</p>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.imageWrapper}>
            <Image
              src="/chef.jpg"
              alt="Professional chef cooking"
              width={500}
              height={300}
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <p>Book a professional chef for a personalized cooking experience.</p>
        </div>
      </section>
    </main>
  );
};

export default HomePage; 