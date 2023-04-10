const { name } = require("ejs");

exports.html_file = (name, formattedDate, formattedTime, meetingObjective) => {
  const html_data = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <style>
    
    body, h1, h2, h3, h4, h5, h6, p, ul, ol, li, img, table, tr, td {
        margin: 0;
        padding: 0;
        border: none;
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 100%;
        font-weight: normal;
        line-height: 1.5;
        vertical-align: top;
        text-align: left;
      }
      
      /* Body styles */
      body {
        background-color: white;
        font-family: Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: black;
      }
      
      /* Wrapper styles */
      .wrapper {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      
    
      .header {
        border-bottom: 1px solid #444;
        padding-bottom: 10px;
        margin-bottom: 20px;
      }
      .header h1 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .header p {
        font-size: 16px;
        color: black;
      }
      
  
      .content {
        padding-bottom: 20px;
      }
      .content h2 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .content p {
        font-size: 16px;
        margin-bottom: 10px;
      }
      .content ul {
        list-style: disc;
        margin-left: 20px;
        margin-bottom: 10px;
      }
      .content li {
        font-size: 16px;
        margin-bottom: 5px;
      }
      
  
      .footer {
        border-top: 1px solid #444;
        padding-top: 10px;
        margin-top: 20px;
        font-size: 12px;
        color: black;
        text-align: center;
      }
    </style>
</head>
<body>
    <div class="wrapper">
      <div class="header">
        <h1>Booking Confirmed!</h1>
      </div>
      <div class="content">
        <h2>Hello ${name},</h2>
        <p>Your meeting has been confirmed on ${formattedDate} at ${formattedTime}.</p>
        <p>Your meeting agenda is ${meetingObjective}. We hope that this meeting would be productive and you would be able to achieve your goals.</p>
        <ul>
          <li>Please update meeting objective from App, if required!</li>
          <li>You may also lock/unlock meeting room door during you session.</li>
        </ul>
        <p>Let me know if you have any questions or feedback.</p>
      </div>
      <div class="footer">
        Best Regards! Orely
      </body>
</html>
      
    `;
  return html_data;
};

exports.html_file_delete_mail = (
  name,
  formattedDate,
  formattedTime,
  meetingObjective
) => {
  const html_data = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <style>
    
    body, h1, h2, h3, h4, h5, h6, p, ul, ol, li, img, table, tr, td {
        margin: 0;
        padding: 0;
        border: none;
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 100%;
        font-weight: normal;
        line-height: 1.5;
        vertical-align: top;
        text-align: left;
      }
      
      /* Body styles */
      body {
        background-color: white;
        font-family: Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: black;
      }
      
      /* Wrapper styles */
      .wrapper {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      
    
      .header {
        border-bottom: 1px solid #444;
        padding-bottom: 10px;
        margin-bottom: 20px;
      }
      .header h1 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .header p {
        font-size: 16px;
        color: black;
      }
      
  
      .content {
        padding-bottom: 20px;
      }
      .content h2 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .content p {
        font-size: 16px;
        margin-bottom: 10px;
      }
      .content ul {
        list-style: disc;
        margin-left: 20px;
        margin-bottom: 10px;
      }
      .content li {
        font-size: 16px;
        margin-bottom: 5px;
      }
      
  
      .footer {
        border-top: 1px solid #444;
        padding-top: 10px;
        margin-top: 20px;
        font-size: 12px;
        color: black;
        text-align: center;
      }
    </style>
</head>
<body>
    <div class="wrapper">
      <div class="header">
        <h1>Booking Cancelled!</h1>
      </div>
      <div class="content">
        <h2>Hello ${name},</h2>
        <p>Your meeting has been cancelled on ${formattedDate} at ${formattedTime}.</p>
        <p>Your meeting agenda was ${meetingObjective}.</p>
        <ul>
          <li>Please update meeting objective from App, if required!</li>
          <li>You may also lock/unlock meeting room door during you session.</li>
        </ul>
        <p>Let me know if you have any questions or feedback.</p>
      </div>
      <div class="footer">
        Best Regards! Orely
      </body>
</html>
      
    `;
  return html_data;
};
