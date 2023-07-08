import React from "react";
import Layout from '../components/layout/layout'

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacypolicy.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>Our eCommerce website takes the privacy and security of your personal information seriously. 
            We collect and store the necessary data you provide during the purchasing process, such as 
            your name, contact details, and payment information, solely for order processing and customer 
            support purposes. We do not share your personal information with third parties unless required 
            by law or for order fulfillment purposes. Our website may utilize cookies to enhance your 
            browsing experience and analyze website traffic. By using our website, you consent to the 
            collection, storage, and use of your personal information as outlined in our Privacy Policy. 
            We take appropriate measures to protect your data and ensure its confidentiality.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;