import logo from 'assets/images/oxiaire.png';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Legal = () => {
  const navigate = useNavigate();
  return (
    <Grid container style={{ backgroundColor: 'rgb(239, 252, 252)' }} sx={{ p: 10 }}>
      <Grid container xs={12} md={12} justifyContent="center">
        <img src={logo} className="logo center" alt="" style={{ width: '400px', height: '300' }} />
      </Grid>
      <Grid container justifyContent="start" alignContent="center">
        <h2>Terms and Condition</h2>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Introduction</b> - Welcome to our e-commerce website. These terms and conditions govern your use of the website and the
          purchase of products from our online store. By accessing or using our website, you agree to be bound by these terms and
          conditions.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Intellectual Property</b> - All content, including but not limited to text, images, graphics, logos, and trademarks, displayed
          on our website are the intellectual property of our company and protected by applicable copyright and trademark laws. You may not
          use, reproduce, or modify any of the content without our prior written consent.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Product Information and Pricing</b> - We strive to provide accurate product descriptions, pricing, and availability information
          on our website. However, we do not guarantee the accuracy or completeness of such information. We reserve the right to modify or
          update product information, pricing, and availability without prior notice. In the event of a pricing error, we reserve the right
          to cancel or refuse any orders placed for the affected products.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Order Placement</b> - When placing an order, you must provide accurate and complete information, including your name, shipping
          address, contact details, and payment information. You are responsible for ensuring the accuracy of this information.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Shipping and Delivery</b> - We strive to process and ship orders promptly. However, delivery times may vary depending on the
          shipping method and your location. We shall not be held responsible for any delays or damages caused during shipping.{' '}
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Privacy and Data Protection</b> - We are committed to protecting your privacy and handling your personal information in
          accordance with applicable privacy laws. Please refer to our Privacy Policy for detailed information on how we collect, use, and
          protect your personal data.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Limitation of Liability</b> - To the fullest extent permitted by law, we shall not be liable for any indirect, incidental,
          special, or consequential damages arising out of or in connection with your use of our website or the purchase of products from
          our online store.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Governing Law and Jurisdiction</b> - These terms and conditions shall be governed by and construed in accordance with the laws
          of [Jurisdiction]. Any disputes arising out of or in connection with these terms and conditions shall be subject to the exclusive
          jurisdiction of the courts of [Jurisdiction].
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Amendments and Updates</b> - We reserve the right to modify or update these terms and conditions at any time without prior
          notice. It is your responsibility to review these terms and conditions periodically for any changes. Your continued use of our
          website after any modifications signifies your acceptance of the updated terms and conditions.
        </p>

        <h2>Privacy Policy</h2>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Introduction</b> - We respect your privacy and are committed to protecting your personal information. This privacy policy
          governs the collection, use, and disclosure of personal data when you use our e-commerce website. By accessing or using our
          website, you consent to the practices described in this policy.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Information Collected</b> - We may collect various types of personal information from you, including but not limited to your
          name, contact details, payment information, and browsing behavior on our website. We collect this information when you provide it
          voluntarily or when it is necessary for the fulfillment of our contractual obligations.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Use of Personal Information</b> - We may use your personal information for the following purposes:
        </p>
        <p style={{ fontSize: '1.3rem' }}> • Processing and fulfilling your orders and providing customer support</p>
        <p style={{ fontSize: '1.3rem' }}> • Communicating with you about your purchases, updates, and promotions</p>
        <p style={{ fontSize: '1.3rem' }}> • Personalizing your experience on our website</p>
        <p style={{ fontSize: '1.3rem' }}> • Improving our products and services based on your feedback</p>
        <p style={{ fontSize: '1.3rem' }}> • Complying with legal obligations and preventing fraudulent activities</p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Data Retention</b> - We will retain your personal information for as long as necessary to fulfill the purposes outlined in this
          privacy policy, unless a longer retention period is required or permitted by law. When your personal information is no longer
          needed, we will securely dispose of it. Sharing of Personal Information We may share your personal information with third parties
          in the following circumstances:
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Service Providers:</b> We may engage trusted third-party service providers to assist us in operating our website and providing
          services to you. These providers have access to your personal information only to perform specific tasks on our behalf and are
          obligated to keep it confidential.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Legal Compliance:</b> We may disclose your personal information if required by law or in response to valid legal requests or
          governmental investigations.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Business Transfers:</b> In the event of a merger, acquisition, or sale of our business, your personal information may be
          transferred to the new owners or their advisors.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Cookies and Tracking Technologies</b> - We use cookies and similar tracking technologies to enhance your browsing experience,
          analyze website traffic, and personalize content. You can manage your preferences regarding cookies through your browser settings.
          However, disabling certain cookies may impact your ability to access or use certain features of our website.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Data Security</b> - We implement reasonable security measures to protect your personal information from unauthorized access,
          use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot
          guarantee absolute security.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Your Rights</b> - You have the right to access, update, or delete your personal information held by us. You may also have the
          right to restrict or object to certain processing activities. To exercise these rights, please contact us using the information
          provided below.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Children&apos;s Privacy</b> - Our website is not intended for children under the age of 13. We do not knowingly collect
          personal information from children. If we become aware that we have inadvertently collected personal information from a child, we
          will take reasonable steps to delete it.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Changes to the Privacy Policy</b> - We reserve the right to update or modify this privacy policy at any time. Any changes will
          be effective immediately upon posting the revised policy on our website. We encourage you to review this policy periodically for
          any updates.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Contact Information</b> - If you have any questions, concerns, or requests regarding this privacy policy, please contact us at
          oxiairecapstone2023@gmail.com.
        </p>

        <p style={{ fontSize: '1.3rem' }}>
          <b>Payment Terms Statement</b> - Thank you for choosing Oxiaire Gas Enterprises. We appreciate your business. To ensure a smooth
          transaction process, please be aware of our payment terms outlined below:
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Payment Period</b> - The establishment is required to settle the balance within 30 days of the invoice date.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Payment Extension</b> - In the event of unforeseen circumstances, an extension of an additional 15 days may be granted upon
          request.
        </p>

        <p style={{ fontSize: '1.3rem' }}>
          <b>Consequences of Non-Payment</b> - Failure to make payment within the stipulated terms, including any approved extensions, may
          result in the following actions:
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>First Reminder:</b> A courtesy reminder will be sent.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Second Reminder:</b> - If payment is still not received after the initial reminder, a second reminder will be issued.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          <b>Order Blocking:</b> Failure to settle the outstanding balance after the second reminder will lead to the temporary blocking of
          the establishment&apos;s ability to place new orders until the account is brought up to date.
        </p>
        <p style={{ fontSize: '1.3rem' }}>
          We value your business and hope for a prompt settlement of invoices. If you have any questions or concerns regarding the payment
          terms, please contact our finance department at 09126424026.
        </p>
        <p style={{ fontSize: '1.3rem' }}>Thank you for your understanding and cooperation.</p>
        <p style={{ fontSize: '1.3rem' }}>
          Sincerely,
          <br /> Oxiaire Gas Enterprises.
        </p>
      </Grid>
      <Grid container justifyContent="center" alignContent="center">
        <Button variant="outlined" size="large" onClick={() => navigate(-1)} sx={{ mr: 2 }} style={{ fontWeight: 700, fontSize: '1.1rem' }}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default Legal;
