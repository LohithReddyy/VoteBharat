import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Vote Bharat</h1>
      <p>
        Vote Bharat is an innovative online voting system designed to ensure privacy and authentication for all voters. Our mission is to provide a secure and accessible platform for citizens to cast their votes from anywhere, at any time.
      </p>
      <h2>Our Vision</h2>
      <p>
        We envision a future where every citizen can participate in the democratic process without any barriers. Our system leverages advanced technologies to protect voter privacy and ensure the integrity of the voting process.
      </p>
      <h2>Key Features</h2>
      <ul>
        <li>Secure Authentication: Multi-factor authentication to verify voter identity.</li>
        <li>Privacy Protection: End-to-end encryption to safeguard voter information.</li>
        <li>Accessibility: User-friendly interface accessible from any device.</li>
        <li>Transparency: Real-time monitoring and audit trails to ensure transparency.</li>
      </ul>
      <h2>Contact Us</h2>
      <p>
        For more information, please contact us at <a href="mailto:info@votebharat.com">info@votebharat.com</a>.
      </p>
    </div>
  );
};

export default AboutUs;
