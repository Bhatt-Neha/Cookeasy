'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './recipes.module.scss';
import { addRecipe, deleteRecipe, getCuisines, getImageUrl, type Cuisine } from '@/services/cuisineService';
import { Chef, getChefs } from '@/services/chefService';

export default function Recipes() {
  const router = useRouter();
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [showAddRecipeModal, setShowAddRecipeModal] = useState<boolean>(false);
  const [newRecipe, setNewRecipe] = useState<Cuisine>({
    name: '',
    ingredients: [],
    totalReviews: 0,
    instructions: [],
    chefId: '',
    description: '',
    prepTime: 0,
    cookTime: 0,
    servings: 0,
    image: '',
  });

  const [chef, setChef] = useState<Chef[]>([]);
  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        setIsLoading(true);
        const data = await getCuisines();
        const chefs = await getChefs();
        setCuisines(data);
        setChef(chefs);
        setError(null);
      } catch (err) {
        setError('Failed to load cuisines. Please try again later.');
        console.error('Error loading cuisines:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCuisines();
  }, []);

const handleCuisineFilter = (cuisine: string) => {
    setSelectedCuisine(cuisine === selectedCuisine ? '' : cuisine);
  };

  const handleViewRecipes = (cuisineId: string) => {
    router.push(`/recipes/${cuisineId}`);
  };


  const handleAddRecipeClick = () => {
    setShowAddRecipeModal(true);
  };

  const handleCloseModal = () => {
    setShowAddRecipeModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {  value } = e.target;
    setNewRecipe(prevState => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewRecipe(prevState => ({
      ...prevState,
      chefId: e.target.value, // Update chef ID when a chef is selected
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecipe(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecipe(prevState => ({
      ...prevState,
      [name]: [value],
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await addRecipe(newRecipe);
      if (!response) {
        throw new Error('Failed to add recipe');
      }

      // After successful submission, close modal and reload cuisines list
      setShowAddRecipeModal(false);
      setNewRecipe({
        name: newRecipe.name,
        ingredients: newRecipe.ingredients,
        totalReviews: newRecipe.totalReviews,
        instructions: newRecipe.instructions,
        chefId: '',
        description: newRecipe.description,
        id: '',
        prepTime: newRecipe.prepTime,
        cookTime: newRecipe.cookTime,
        servings: newRecipe.servings,
        image: newRecipe.image,
      });
      setCuisines((prevCuisines) => [...prevCuisines, newRecipe]);
     
     
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    try {
      await deleteRecipe(recipeId);
      setCuisines((prevCuisines) => prevCuisines.filter(cuisine => cuisine.id !==   recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const uniqueCuisines = Array.from(
    new Set(cuisines.map((recipe) => recipe.cuisine)) // Ensure uniqueness based on cuisine name
  ).map((cuisineName) => {
    return cuisines.find((recipe) => recipe.cuisine === cuisineName); // Find the full recipe data for that unique cuisine
  });

  
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading cuisines...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setNewRecipe((prevRecipe) => ({
        ...prevRecipe,
        image: file,
      }));
    } else {
      alert('Please upload a valid image (JPEG or PNG).');
    }
  };

  return (
    <>  
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px', flexDirection: 'row' ,margin:'30px'}}>
      <button
        className={styles.addRecipeButton}
        onClick={handleAddRecipeClick}
      >
        + Add Recipe
      </button>
    </div>
   
    <div className={styles.pageContainer}>
        {/* Left Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.filters}>
            <h2>Filters</h2>
            <div className={styles.filterSection}>
              <h3>Cuisine Type</h3>
              {uniqueCuisines.map((recipe) => (
        <label key={recipe?.id} className={styles.filterOption}>
          <input
            type="checkbox"
            checked={selectedCuisine === recipe?.cuisine}
            onChange={() => handleCuisineFilter(recipe?.cuisine || '')}
          />
          <span>{recipe?.cuisine}</span>
        </label>
      ))}
            </div>
          </div>
        </aside>


        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.cuisineGrid}>
            {cuisines.filter((recipe) => selectedCuisine === '' || recipe.cuisine === selectedCuisine).map((cuisine) => (
              <div key={cuisine?.id} className={styles.cuisineCard}>
                <div className={styles.imageContainer}>
                  
                  <Image
                    src={cuisine?.image || null}
                    alt={cuisine?.name}
                    className={styles.cuisineImage}
                    width={400}
                    height={300}
                    style={{ objectFit: 'cover' }} />
                    
                </div>
                <Image src="/svg/trash.svg" alt="delete" width={20} height={20} className={styles.deleteIcon} onClick={() => handleDeleteRecipe(cuisine?.id || '')} />

                <div className={styles.cuisineInfo}>
                  <h2>{cuisine?.name}</h2>
                  <p>{cuisine?.description}</p>
                  <button
                    className={styles.viewButton}
                    onClick={() => handleViewRecipes(cuisine?.id || '')}
                  >
                    View Recipes
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for Adding Recipe */}
          {showAddRecipeModal && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <h2 style={{textAlign:'center'}}>Add a New Recipe</h2>
                <div className={styles.modalForm}>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newRecipe.name}
                    onChange={handleInputChange} />
                    <label>Description:</label>
                  <textarea
                    name="description"
                    value={newRecipe.description}
                    onChange={handleTextareaChange} />

                    <label>Image:</label>
                    <input
                      type="file"
                      name="image"
                      accept=".jpeg,.png"
                      onChange={handleImageChange} />

                    {/* New Cuisine Text Field */}
                    <label>Cuisine:</label>
                    <input
                      type="text"
                      name="cuisine"
                      value={newRecipe.cuisine}
                      onChange={handleInputChange} />
                              <label>Ingredients:</label>
                              <textarea
                                name="ingredients"
                                value={newRecipe.ingredients}
                                onChange={handleTextFieldChange} />
                                <label>Chef:</label>
                            <select
                              name="chefId"
                              value={newRecipe.chefId}
                              onChange={handleSelectChange}
                              style={{height:'30px'}}
                            >
                              <option value="">Select a Chef</option>
                              {chef.map(chef => (
                                <option key={chef.id} value={chef.user.name}>
                                  {chef.user.name}
                                </option>
                              ))}
                            </select>
                  <label>Prep Time:</label>
                  <input
                    type="number"
                    name="prepTime"
                    value={newRecipe.prepTime}
                    onChange={handleInputChange} />
                    <label>Cook Time:</label>
                    <input
                    type="number"
                    name="cookTime"
                    value={newRecipe.cookTime}
                    onChange={handleInputChange} />
                    <label>Servings:</label>
                    <input
                    type="number"
                    name="servings"
                    value={newRecipe.servings}
                    onChange={handleInputChange} />
                    
                  <label>Instructions:</label>
                  <textarea
                    name="instructions"
                    value={newRecipe.instructions}
                    onChange={handleTextFieldChange} />
                  <div className={styles.modalButtons}>
                    
                    <button onClick={handleCloseModal}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      </>
  );
}