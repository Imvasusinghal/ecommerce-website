import React from "react";
import Layout from '../components/layout/layout'

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Welcome to our ecommerce website! We are dedicated to delivering an exceptional online
          shopping experience. Our mission is to provide a diverse range of high-quality products,
           competitive prices, and reliable delivery. With a commitment to customer satisfaction, 
           our friendly support team is always ready to assist you. We prioritize your privacy and 
           security, ensuring that your personal information is protected during secure transactions. 
           We strive for fast and reliable delivery, aiming to process and dispatch orders promptly. 
           Through community engagement, we actively contribute to local charities and organizations. 
           Thank you for choosing us—we're excited to serve you and provide an enjoyable shopping journey.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;