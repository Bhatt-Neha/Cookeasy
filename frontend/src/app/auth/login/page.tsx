'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './login.module.scss';
import Link from 'next/link';
import { SessionProvider, useSession } from 'next-auth/react';
import { login} from '@/services/authService';
import Cookies from 'js-cookie';
interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
 

  useEffect(() => {
    // Show success message if redirected from registration
    if (searchParams.get('registered') === 'true') {
      setSuccess('Registration successful! Please log in.');
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(formData)

      if (!response.token) {
        throw new Error('Invalid Credentials');
      }

      // Store the token in localStorage
      Cookies.set('token', response.token);

      // Redirect based on user type
     router.push('/recipes');
    } catch (err:any) {
      setError(err instanceof Error ? err.message : 'Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SessionProvider>
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Welcome Back</h1>
        {success && <div className={styles.success}>{success}</div>}
        {error && <div className={styles.error}>{error}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <p className={styles.registerLink}>
          Don't have an account? <Link href="/auth/register">Register</Link>
        </p>
      </div>
    </div>
    </SessionProvider>
  );
} 