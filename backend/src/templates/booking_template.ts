export const bookingEmailTemplate = (bookingDetails: any) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 80%;
          margin: 20px auto;
          background: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #ff5722;
          color: white;
          text-align: center;
          padding: 10px;
          font-size: 22px;
          font-weight: bold;
          border-radius: 8px 8px 0 0;
        }
        .content {
          padding: 20px;
          text-align: center;
        }
        .content p {
          font-size: 16px;
          color: #333;
          line-height: 1.5;
        }
        .content .details {
          background: #f9f9f9;
          padding: 15px;
          border-radius: 8px;
          margin-top: 10px;
          text-align: left;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
        .button {
          display: inline-block;
          background-color: #ff5722;
          color: white;
          padding: 10px 20px;
          margin-top: 15px;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Booking Confirmation</div>
        <div class="content">
          <p>Dear Customer,</p>
          <p>Your booking has been confirmed with Chef <strong>${bookingDetails.chefName}</strong> for <strong>${bookingDetails.cuisine} Cuisine</strong>.</p>
          <div class="details">
            <p><strong>Time Slot:</strong> ${(bookingDetails.startTime)} - ${(bookingDetails.endTime)}</p>
            <p><strong>Total Amount:</strong> ₹${bookingDetails.totalPrice}</p>
            <p><strong>Booking Status:</strong> ${bookingDetails.status}</p>
            <p><strong>Booking Date:</strong> ${bookingDetails.bookingDate}</p>
            <p><strong>Recipe Name:</strong> ${bookingDetails.dishes.join(', ')}</p>
          </div>
        </div>
        <div class="footer">
          Thank you for choosing our service!<br/>
          <small>Please visit our privacy policy and terms of service for more information.</small>
        </div>
      </div>
    </body>
    </html>
    `;
  };
  