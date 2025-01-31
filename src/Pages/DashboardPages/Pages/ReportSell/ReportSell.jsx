import usePaymentDetails from '../../../../Hooks/usePaymentDetails';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";

const ReportSell = () => {
  const [payments] = usePaymentDetails();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredPayments, setFilteredPayments] = useState(payments);

  useEffect(() => {
    setFilteredPayments(payments);
  }, [payments]);
  const handleFilter = () => {
    if (!startDate || !endDate) {
      console.log('Start Date or End Date is not set correctly');
      return;
    }

    console.log('Filtering payments between:', startDate, 'and', endDate);

    const start = new Date(startDate);
    const end = new Date(endDate);

    const filteredData = payments.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate >= start && paymentDate <= end;
    });

    console.log('Filtered Payments:', filteredData);
    setFilteredPayments(filteredData);
  };

  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
    },
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: '#000',
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableColHeader: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: '#000',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      backgroundColor: '#f2f2f2',
      padding: 5,
      textAlign: 'center',
    },
    tableCol: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: '#000',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 5,
      textAlign: 'center',
    },
    tableColPrice: {
      width: "20%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: '#000',
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 5,
      textAlign: 'center',
    },
    tableCellHeader: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    tableCell: {
      fontSize: 10,
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Manage All Categories</title>
      </Helmet>
      <div className="text-center py-7 lg:py-14">
        <h1 className=" text-3xl lg:text-5xl">SALES REPORT</h1>
      </div>
 <div className=' max-w-[1300px] mx-auto'>
 <div className="flex flex-col lg:flex-row items-center my-5 space-x-3">
        <div className="flex items-center">
          <span className="mx-3">Start Date:</span>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="border p-2 rounded"
          />
        </div>
        <div className="flex items-center">
          <span className="mx-3">End Date:</span>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="End Date"
            className="border p-2 rounded"
          />
        </div>
        <button onClick={handleFilter} className="btn bg-blue-500 text-white">
          Filter
        </button>
      </div>

      <div className="overflow-x-auto my-10 mx-3">
        <table className="table">
          <thead>
            <tr className=' bg-custom-custom text-white'>
              <th className=' lg:text-xl'>Medicine Name</th>
              <th className=' lg:text-xl'>Seller Email</th>
              <th className=' lg:text-xl'>Buyer Email</th>
              <th className=' lg:text-xl'>Date</th>
              <th className=' lg:text-xl'>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over filteredPayments to display each payment */}
            {filteredPayments.map((paymentData, index) => (
              <tr key={index}>
                {/* Display first medicine name from array */}
                <td className=' text-sm lg:text-lg'>{paymentData.medicineName && paymentData.medicineName.length > 0 ? paymentData.medicineName[0] : ''}</td>
                <td className=' text-sm lg:text-lg'>{paymentData.sellerEmail && paymentData.sellerEmail.length > 0 ? paymentData.sellerEmail[0] : ''}</td>
                <td className=' text-sm lg:text-lg'>{paymentData.email}</td>
                <td className=' text-sm lg:text-lg'>{paymentData.date}</td>
                <td className=' text-sm lg:text-lg'> ${paymentData.amount /100}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-10">
        <PDFDownloadLink
          className="btn bg-green-400 text-white font-bold py-2 px-4 rounded"
          document={
            <Document>
              <Page style={styles.page}>
                <Text style={styles.title}>Sales Report</Text>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Medicine Name</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Seller Email</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Buyer Email</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Date</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                      <Text style={styles.tableCellHeader}>Total Price</Text>
                    </View>
                  </View>
                  {/* Map over filteredPayments for PDF content */}
                  {filteredPayments.map((paymentData, index) => (
                    <View key={index} style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{paymentData.medicineName && paymentData.medicineName.length > 0 ? paymentData.medicineName[0] : ''}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{paymentData.sellerEmail && paymentData.sellerEmail.length > 0 ? paymentData.sellerEmail[0] : ''}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{paymentData.email}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{paymentData.date}</Text>
                      </View>
                      <View style={styles.tableColPrice}>
                        <Text style={styles.tableCell}>${paymentData.amount /100}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </Page>
            </Document>
          }
          fileName="sales_report.pdf"
        >
          {({ loading }) =>
            loading ? 'Preparing PDF...' : 'Download PDF'
          }
        </PDFDownloadLink>
      </div>
 </div>
    </div>
  );
};

export default ReportSell;
