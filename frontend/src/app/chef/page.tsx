'use client'
import { useState, useEffect } from "react";
import styles from "./chef.module.scss";
import { Chef } from "@/services/chefService";
import { getChefs } from "@/services/chefService";
import { getTimeSlots, TimeSlot } from "@/services/timeSlotService";
import { formatTimeLabel } from "@/utills";
import { useRouter } from "next/navigation";
import { Cuisine, getCuisines } from "@/services/cuisineService";
import { Booking, createBooking } from "@/services/bookingService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';

const ChefBooking = () => {
    const router = useRouter();
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);
  const [selectedDishes, setSelectedDishes] = useState<Cuisine[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [recipes,setRecipes] = useState<Cuisine[]>([]);


  const handleBookNow = () => {
    if (!selectedTimeSlot) {
      toast.error("Please select a time slot before booking.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
      
      if (selectedChef && selectedTimeSlot) {
        setIsModalOpen(true);
      }
  };

  const handleDishSelect = (dish: Cuisine) => {
    setSelectedDishes(prevDishes => {
      // If dish is already selected, remove it
      if (prevDishes.includes(dish)) {
        return prevDishes.filter(d => d !== dish);
      }
      // Otherwise add it to selection
      return [...prevDishes, dish];
    });
  };

  const totalPrice = selectedChef 
  ? selectedChef.price * selectedDishes.length
  : 0;


  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const data = await getChefs();
        const recipes = await getCuisines()
        setChefs(data);
        setRecipes(recipes);
      } catch (error) {
        toast.error("Error fetching chefs. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Error fetching chefs:", error);
      }
    };

    fetchChefs();
  }, [selectedTimeSlot]);

  const fetchTimeSlots = async (chefId: string, date: Date | null) => {
    try {
      const formattedDate = date ? date.toLocaleDateString("en-CA") : new Date().toLocaleDateString("en-CA");
      const response = await getTimeSlots(chefId, formattedDate);
      setTimeSlots(response);
    } catch (error) {
      toast.error("Error fetching time slots. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
      fetchTimeSlots(selectedChef?.id || '', date);
     
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Filter chefs based on cuisine search term
  const filteredChefs = chefs.filter((chef) =>
    chef.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChefClick = (chefId: string) => {
    router.push(`/chef/${chefId}`);

  };

  const filteredDishes = recipes.filter(dish => dish.cuisine === selectedChef?.cuisine);

  const user= JSON.parse(Cookies.get('user') || '{}');

  
  const handleConfirmBooking = async () => {
    if (!user.id) {
      toast.error("Please login to book a chef.", {
        position: "top-right",
        autoClose: 3000,
      });
      router.push('/auth/login');
      return;
    }

    const bookingData:Booking = {
        userId: user.id, 
        chefId: selectedChef?.id || '',
        totalPrice: totalPrice ,
        startTime: parseInt(selectedTimeSlot?.startTime || '0'),
        endTime: parseInt(selectedTimeSlot?.endTime || '0'),
        timeSlotId: selectedTimeSlot?.id || '',
        dishes: selectedDishes.map(dish => dish.name)
      };
    
      try {
        const response = await createBooking(bookingData)
          
        if (response) {
          toast.success("Booking confirmed! A confirmation email has been sent.", {
            position: "top-right",
            autoClose: 5000,
          });
          setIsModalOpen(false);
          setSelectedChef(null);
          setSelectedTimeSlot(null);
          fetchTimeSlots(selectedChef?.id || '', selectedDate);
        } 
        else {
          throw new Error("Failed to confirm booking. Please try again.");
        }
      } catch (error:any) {
        toast.error(error.message || "Error creating booking. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error(error);
      }
    }


  return (
    <> 
    <ToastContainer />
    <div style={{ display: 'flex' ,margin:'35px',gap:'10px', justifyContent:'center'}}>
    <input
          type="text"
          placeholder="Search by cuisine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
    
    
    <div className={styles.pageContainer}>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.cuisineGrid} >
            {filteredChefs.length > 0 ? filteredChefs.map((chef) => (
            <div key={chef.id} className={`${styles.cuisineCard} ${selectedChef?.id === chef.id ? styles.selectedCard : ''}`} onClick={() => {
              fetchTimeSlots(chef.id, selectedDate);
              setSelectedChef(chef);
            }}>
                <div className={styles.imageContainer}>
              <img src={chef.profileImage} alt={chef.name} className={styles.cuisineImage} />
              </div>
              <h2 style={{color:'#000',fontSize:'1.2rem',fontWeight:'bold',display:'flex',justifyContent:'end',margin:'10px'}}>Price: &#x20B9;{chef.price}/meal</h2>

              <div className={styles.cuisineInfo}>
                
              <h2>{chef.user.name}</h2>
              <p>{chef.cuisine} Cuisine</p>
              <p>⭐ {chef.rating} ({chef.totalReviews} reviews)</p>
              <p>{chef.bio}</p>
              <button className={styles.viewButton} onClick={() => handleChefClick(chef.id)}>View Profile</button>
            </div>
            </div>
          )
          ) : (
            <p style={{display:'flex',justifyContent:'center',alignItems:'center', textAlign:'center'}}>No chefs found</p>
          )}
          </div>

        </main>



        <aside className={styles.sidebar}>
        
        
          <div className={styles.filters}>
            <div className={styles.filterSection}>
            
              <h3 style={{color:'#000',fontSize:'1.2rem',fontWeight:'bold',display:'flex',justifyContent:'center',margin:'10px'}}>Time Slots</h3>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
               <h3 style={{color:'#000',fontSize:'1rem',fontWeight:'bold',display:'flex',justifyContent:'center',margin:'10px'}}>Select Date</h3>
                    <DatePicker
            selected={selectedDate}
            onChange={(date) => handleDateChange(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
            className={styles.datePicker}
            disabled={!selectedChef}
          />
                </div>
              { timeSlots.length > 0 ? timeSlots.map((slot) => (
            <label key={slot.id} className={styles.filterOption}>
              <input
                type="radio"
                name="timeSlot"
                value={slot.id}
                onChange={() => setSelectedTimeSlot(slot)}
                disabled={!slot.isAvailable}
              />

              {formatTimeLabel(slot.startTime)} - {formatTimeLabel(slot.endTime)}
              {slot.isAvailable ? <span className={styles.availableLabel}>Available</span> : <span className={styles.bookedLabel}>Booked</span>}
            </label>
          )
          ) : (
            <p style={{display:'flex',justifyContent:'center',alignItems:'center', textAlign:'center',height:'100%',width:'100%'}}>No time slots available for {selectedDate?.toLocaleDateString()}</p>
          )}    
            </div>
            {timeSlots.length > 0 &&
            <button className={styles.bookNow}  onClick={handleBookNow}>
            Book Now
          </button>
           }
            
          </div>
        </aside>


        {isModalOpen && (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <h2 className={styles.modalTitle}>Complete Your Booking</h2>
      
      <div className={styles.chefDetails}>
        <img 
          src={selectedChef?.profileImage} 
          alt={selectedChef?.user.name} 
          className={styles.chefImage} 
        />
        <div className={styles.chefInfo}>
          <p><strong>Chef Name</strong> {selectedChef?.user.name}</p>
          <p><strong>Speciality</strong> {selectedChef?.cuisine} Cuisine</p>
          <p><strong>Time Slot</strong> {formatTimeLabel(selectedTimeSlot?.startTime || '')} - {formatTimeLabel(selectedTimeSlot?.endTime || '')}</p>
          <p><strong>Rating</strong> ⭐ {selectedChef?.rating} ({selectedChef?.totalReviews} reviews)</p>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Select Your Dishes</h3>
      
      <div className={styles.dishContainer}>
        {filteredDishes.map((dish) => (
          <label key={dish.id} className={styles.dishItem}>
            <input
              type="checkbox"
              checked={selectedDishes.includes(dish)}
              onChange={() => handleDishSelect(dish)}
            />
            <img src={dish.image} alt={dish.name} className={styles.dishImage} />
            <span>{dish.name}</span>
            <strong>₹{selectedChef?.price}</strong>
          </label>
        ))}
      </div>

      <div className={styles.modalButtons}>
        <button 
          className={styles.closeButton} 
          onClick={() => setIsModalOpen(false)}
        >
          Cancel Booking
        </button>
        <div className={styles.totalAmount}>
          Total: ₹{totalPrice}
        </div>
        <button 
          className={styles.confirmButton}
          onClick={handleConfirmBooking}
          disabled={totalPrice === 0}
        >
          {totalPrice === 0 ? '⚠️ Select dishes to book' : '✨ Confirm Booking'}
        </button>
      </div>
    </div>
  </div>
)}

      </div></> 
     
    
  );
};

export default ChefBooking;



