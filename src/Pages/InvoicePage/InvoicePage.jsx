/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import navLogo from '../../assets/navLogo.png';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  logo: {
    marginBottom: 20,
    width: 200,
    height: 50,
    alignSelf: 'center',
  },
  userInfo: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '50%',
  },
  purchaseInfo: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '50%',
  },
});

// Create Document Component
// eslint-disable-next-line react/prop-types
const InvoiceDocument = ({ paymentIntent, logo, user }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image src={logo} style={styles.logo} />
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={styles.userInfo}>
            <Text style={styles.title}>User Information:</Text>
            <Text>{user.displayName}</Text>
            <Text>{user.email}</Text>
          </View>
          <View style={styles.purchaseInfo}>
            <Text style={styles.title}>Purchase Information:</Text>
            <Text style={styles.title}>Invoice #{paymentIntent.id}</Text>
            <Text style={styles.text}>Status: {paymentIntent.status}</Text>
            <Text style={styles.text}>
              Amount: {(paymentIntent.amount / 100).toFixed(2)} {paymentIntent.currency.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

const InvoicePage = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { paymentIntent } = location.state || {};
  
  if (!user) {
    return <div className=' min-h-screen flex justify-center items-center'>
        <span className="loading loading-bars loading-lg"></span>
    </div>;
  }


  if (!paymentIntent) {
    return <div>No payment information found.</div>;
  }

  return (
    <div className="max-w-4xl mt-6 mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Invoice</title>
      </Helmet>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <img className="w-[200px] mx-auto mt-6" src={navLogo} alt="Logo" />
        <div className="px-4 py-5 sm:px-6">
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.userInfo}>
              <h1 className="mb-2 text-2xl">User Information:</h1>
              <h1 className="text-lg">{user.displayName}</h1>
              <h1 className="text-lg">{user.email}</h1>
            </View>
            <View style={styles.purchaseInfo}>
              <h1 className="mb-2 text-2xl">Purchase Information:</h1>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Invoice #{paymentIntent.id}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Status: {paymentIntent.status}
              </p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Amount: {(paymentIntent.amount / 100).toFixed(2)} {paymentIntent.currency.toUpperCase()}
              </p>
            </View>
          </View>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <PDFDownloadLink
          document={<InvoiceDocument paymentIntent={paymentIntent} logo={navLogo} user={user} />}
          fileName={`invoice_${paymentIntent.id}.pdf`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download Invoice
        </PDFDownloadLink>
        
      </div>
      <Link className='underline' to={"/"} >Go Home</Link>
    </div>
  );
};

export default InvoicePage;
