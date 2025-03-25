import styles from './terms.module.scss';

export default function TermsAndConditions() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Terms and Conditions Agreement</h1>
        
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to our Cooking Management System. By accessing and using this system, 
            you agree to the following terms and conditions.
          </p>
        </section>

        <section>
          <h2>2. Registration and Account Security</h2>
          <p>
            To access the services, users must register an account. You agree to provide 
            accurate and complete information during the registration process and maintain 
            the security of your account credentials.
          </p>
        </section>

        <section>
          <h2>3. Login and Access</h2>
          <p>
            After registration, users must log in to access the platform. You are responsible 
            for maintaining the confidentiality of your login details and agree to notify us 
            immediately if you suspect any unauthorized use of your account.
          </p>
        </section>

        <section>
          <h2>4. Cuisine and Recipe Selection</h2>
          <p>
            Users can browse and select from various cuisines such as Italian, Indian, Chinese, 
            Thai, etc. Clicking on a cuisine will display a list of recipes related to that cuisine. 
            We do not guarantee the availability of all recipes at all times.
          </p>
        </section>

        <section>
          <h2>5. Chef Details and Availability</h2>
          <p>
            Upon selecting a recipe, users will see a list of chefs who specialize in preparing it, 
            along with their available time slots. Chef availability is subject to change, and we 
            are not responsible for any discrepancies or unavailability.
          </p>
        </section>

        <section>
          <h2>6. Ratings and Reviews</h2>
          <p>
            Users can view ratings and reviews left by previous customers for each chef. These 
            reviews reflect the experiences of others but do not guarantee future service quality. 
            Users are encouraged to leave honest feedback.
          </p>
        </section>

        <section>
          <h2>7. Booking and Scheduling</h2>
          <p>
            Users can book a chef based on availability. It is the user's responsibility to ensure 
            that the booking details, including time slots, are correct. Changes or cancellations 
            must be made in accordance with the system's policies.
          </p>
        </section>

        <section>
          <h2>8. User Responsibilities</h2>
          <p>
            Users agree to use the platform in a lawful manner and not engage in any fraudulent 
            or harmful activities. Any misuse of the system may result in the suspension or 
            termination of your account.
          </p>
        </section>

        <section>
          <h2>9. Limitation of Liability</h2>
          <p>
            We are not liable for any damages or losses that may arise from using the platform 
            or any issues related to chef services, recipe availability, or scheduling conflicts.
          </p>
        </section>

        <section>
          <h2>10. Changes to Terms</h2>
          <p>
            By using the system, you acknowledge and accept these terms and conditions. We 
            reserve the right to update or modify these terms at any time, and your continued 
            use of the system constitutes your acceptance of those changes.
          </p>
        </section>

        <section>
          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us
            at support@cookeasy.com
          </p>
        </section>
      </div>
    </div>
  );
} 