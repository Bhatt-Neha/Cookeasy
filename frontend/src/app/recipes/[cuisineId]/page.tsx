'use client';

import { Cuisine, getCuisine } from '@/services/cuisineService';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './cuisine.module.scss';

const RecipeDetail = () => {
  const { cuisineId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cuisine, setCuisine] = useState<Cuisine[] | null>(null);
 
  
  useEffect(() => {
    const fetchCuisine = async () => {
      try {
        setIsLoading(true);
        const data = await getCuisine(cuisineId as string);
        setCuisine(data);
        setError(null);
      } catch (err) {
        setError('Failed to load cuisine. Please try again later.');
        console.error('Error loading cuisine:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (cuisineId) {
      fetchCuisine();
    }
  }, [cuisineId]);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!cuisine) {
    return <div className={styles.error}>No cuisine data found.</div>;
  }

return (
    <div className= {styles.recipeDetail}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={cuisine[0]?.image} alt={cuisine[0]?.name} />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{cuisine[0]?.name}</h1>
          <div className={styles.rating}>
            <span>⭐ {cuisine[0]?.ratings}</span> | <span>{cuisine[0]?.totalReviews} Reviews</span>
          </div>
          <div className={styles.ingredients}>
            <h3>Ingredients:</h3>
            <ul>
              {cuisine[0]?.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className={styles.instructions}>
            <h3>Instructions:</h3>
            <p>{cuisine[0]?.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
