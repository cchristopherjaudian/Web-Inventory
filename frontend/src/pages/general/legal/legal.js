import './style.css';

import logo from 'assets/images/oxiaire.png';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Legal = () => {
  const navigate = useNavigate();
  return (
    <div className="app">
      <img src={logo} className="logo center" alt="" style={{ width: '400px', height: '300' }} />
      <h2>Terms and Condition</h2>
      <p>
        <b>Introduction</b> - Welcome to our e-commerce website. These terms and conditions govern your use of the website and the purchase
        of products from our online store. By accessing or using our website, you agree to be bound by these terms and conditions.
      </p>
      <p>
        <b>Intellectual Property</b> - All content, including but not limited to text, images, graphics, logos, and trademarks, displayed on
        our website are the intellectual property of our company and protected by applicable copyright and trademark laws. You may not use,
        reproduce, or modify any of the content without our prior written consent.
      </p>
      <p>
        <b>Product Information and Pricing</b> - We strive to provide accurate product descriptions, pricing, and availability information
        on our website. However, we do not guarantee the accuracy or completeness of such information. We reserve the right to modify or
        update product information, pricing, and availability without prior notice. In the event of a pricing error, we reserve the right to
        cancel or refuse any orders placed for the affected products.
      </p>
      <p>
        <b>Order Placement</b> - When placing an order, you must provide accurate and complete information, including your name, shipping
        address, contact details, and payment information. You are responsible for ensuring the accuracy of this information.
      </p>
      <p>
        <b>Shipping and Delivery</b> - We strive to process and ship orders promptly. However, delivery times may vary depending on the
        shipping method and your location. We shall not be held responsible for any delays or damages caused during shipping.{' '}
      </p>
      <p>
        <b>Privacy and Data Protection</b> - We are committed to protecting your privacy and handling your personal information in
        accordance with applicable privacy laws. Please refer to our Privacy Policy for detailed information on how we collect, use, and
        protect your personal data.
      </p>
      <p>
        <b>Limitation of Liability</b> - To the fullest extent permitted by law, we shall not be liable for any indirect, incidental,
        special, or consequential damages arising out of or in connection with your use of our website or the purchase of products from our
        online store.
      </p>
      <p>
        <b>Governing Law and Jurisdiction</b> - These terms and conditions shall be governed by and construed in accordance with the laws of
        [Jurisdiction]. Any disputes arising out of or in connection with these terms and conditions shall be subject to the exclusive
        jurisdiction of the courts of [Jurisdiction].
      </p>
      <p>
        <b>Amendments and Updates</b> - We reserve the right to modify or update these terms and conditions at any time without prior
        notice. It is your responsibility to review these terms and conditions periodically for any changes. Your continued use of our
        website after any modifications signifies your acceptance of the updated terms and conditions.
      </p>

      <h2>Privacy Policy</h2>
      <p>
        <b>Introduction</b> - We respect your privacy and are committed to protecting your personal information. This privacy policy governs
        the collection, use, and disclosure of personal data when you use our e-commerce website. By accessing or using our website, you
        consent to the practices described in this policy.
      </p>
      <p>
        <b>Information Collected</b> - We may collect various types of personal information from you, including but not limited to your
        name, contact details, payment information, and browsing behavior on our website. We collect this information when you provide it
        voluntarily or when it is necessary for the fulfillment of our contractual obligations.
      </p>
      <p>
        <b>Use of Personal Information</b> - We may use your personal information for the following purposes:
      </p>
      <p> • Processing and fulfilling your orders and providing customer support</p>
      <p> • Communicating with you about your purchases, updates, and promotions</p>
      <p> • Personalizing your experience on our website</p>
      <p> • Improving our products and services based on your feedback</p>
      <p> • Complying with legal obligations and preventing fraudulent activities</p>
      <p>
        <b>Data Retention</b> - We will retain your personal information for as long as necessary to fulfill the purposes outlined in this
        privacy policy, unless a longer retention period is required or permitted by law. When your personal information is no longer
        needed, we will securely dispose of it. Sharing of Personal Information We may share your personal information with third parties in
        the following circumstances:
      </p>
      <p>
        <b>Service Providers:</b> We may engage trusted third-party service providers to assist us in operating our website and providing
        services to you. These providers have access to your personal information only to perform specific tasks on our behalf and are
        obligated to keep it confidential.
      </p>
      <p>
        <b>Legal Compliance:</b> We may disclose your personal information if required by law or in response to valid legal requests or
        governmental investigations.
      </p>
      <p>
        <b>Business Transfers:</b> In the event of a merger, acquisition, or sale of our business, your personal information may be
        transferred to the new owners or their advisors.
      </p>
      <p>
        <b>Cookies and Tracking Technologies</b> - We use cookies and similar tracking technologies to enhance your browsing experience,
        analyze website traffic, and personalize content. You can manage your preferences regarding cookies through your browser settings.
        However, disabling certain cookies may impact your ability to access or use certain features of our website.
      </p>
      <p>
        <b>Data Security</b> - We implement reasonable security measures to protect your personal information from unauthorized access, use,
        or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot
        guarantee absolute security.
      </p>
      <p>
        <b>Your Rights</b> - You have the right to access, update, or delete your personal information held by us. You may also have the
        right to restrict or object to certain processing activities. To exercise these rights, please contact us using the information
        provided below.
      </p>
      <p>
        <b>Children&apos;s Privacy</b> - Our website is not intended for children under the age of 13. We do not knowingly collect personal
        information from children. If we become aware that we have inadvertently collected personal information from a child, we will take
        reasonable steps to delete it.
      </p>
      <p>
        <b>Changes to the Privacy Policy</b> - We reserve the right to update or modify this privacy policy at any time. Any changes will be
        effective immediately upon posting the revised policy on our website. We encourage you to review this policy periodically for any
        updates.
      </p>
      <p>
        <b>Contact Information</b> - If you have any questions, concerns, or requests regarding this privacy policy, please contact us at
        [contact information].
      </p>

      <div className="btn-holder">
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Legal;
