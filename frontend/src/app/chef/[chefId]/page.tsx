'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './chefdetail.module.scss';
import { Chef, getChefById } from '@/services/chefService';
import { commentResponse, createComment, getChefComments } from '@/services/commentService';
import { ToastContainer, toast } from 'react-toastify';

const ChefDetail = () => {
  const { chefId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chef, setChef] = useState<Chef | null>(null);
  const [comments, setComments] = useState<commentResponse[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newRating,setNewRating] = useState(5)


  useEffect(() => {
    const fetchChef = async () => {
      try {
        setIsLoading(true);
        const data = await getChefById(chefId as string);
        const comment =await getChefComments(chefId as string)
        
        setChef(data);
        setComments(comment)
        setError(null);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        toast.error("Error fetching data. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    }



    if (chefId) {
      fetchChef(); 
     
    }
    
  
  }, [chefId]);

  
  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!chef) {
    return <div className={styles.error}>No chef found.</div>;
  }

  const handleAddComment = async () => {
   

    const commentData = {
      chefId: chef.id,
      content:newComment.trim(),
      rating: newRating
    };

    try {
      const commentResponse = await createComment(commentData);
      if (commentResponse){
        setNewComment(commentResponse.content) 
        setError(null)
        toast.success("comment added successfully" ,{
          position: "top-right",
          autoClose: 5000
        });
      }
      else{
        throw new Error('Failded to add comment,Please try again')
      }
     
    }
    catch (err){
    setError('Failed to add comment,please try again')
    console.error('Error adding comments',err)
    toast.error( "Error creating comment. Please try again.", {
    position: "top-right",
    autoClose: 3000,
  });

    }
  };


  return (
    <><ToastContainer />
    <div className={styles.recipeDetail}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src={chef.profileImage} alt={chef.name} />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{chef?.user?.name}</h1>
          <div className={styles.rating}>
            <span>⭐ {chef.rating}</span> | <span>{chef.totalReviews} Reviews</span>
          </div>
          <div className={styles.instructions}>
            <h3>Description:</h3>
            <p>{chef.bio}</p>
          </div>
          <div className={styles.ingredients}>
            <h3>Cuisine:</h3>
            <p>{chef.cuisine}</p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className={styles.commentsSection}>
        <h3>Comments</h3>
        <div className={styles.commentsList}>
        {comments.length > 0 ? (
    comments.map((comment) => (
      <div key={comment.id} className={styles.comment}>
        <div className={styles.commentHeader}>
          <img
            src={comment.user.profileImage || "/avtar.jpg"} 
            alt={comment.user.name}
            className={styles.userImage}
          />
          <strong>{comment.user.name}</strong>
        </div>
       
        <div className={styles.rating}>
          
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className={index < comment.rating ? styles.filledStar : styles.emptyStar}>
              ★
            </span>
          ))}
        </div>
        <p>{comment.content}</p>
      </div>
    ))
  ) : (
    <p>No comments yet. Be the first to comment!</p>
  )}
        </div>

        {/* Add Comment Form */}
        <div className={styles.addComment}>
        <h3 style={{marginTop:'15px'}}>Rate Chef</h3>
<div className={styles.rating}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < newRating ? styles.filledStar : styles.emptyStar}
          onClick={() => setNewRating(index + 1)} 
          style={{ cursor: "pointer" }} 
        >
          ★
        </span>
      ))}
    </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..." />

          <button onClick={handleAddComment}>Submit</button>
        </div>
        
      </div>
    </div></>
  )
};


export default ChefDetail;
