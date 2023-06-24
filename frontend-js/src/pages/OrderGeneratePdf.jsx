import React from 'react';
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersAsync } from '../redux/order';

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderCollapse: 'collapse',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    width: '16.66%',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 4,
  },
});

export default function OrderGeneratePdf() {
  const dispatch = useDispatch();

  const order = useSelector((state) => state.order);

  const { loading, error, orders } = order;

  useEffect(() => {
    dispatch(fetchOrdersAsync());
  }, [dispatch]);

  return (
    <PDFViewer width="100%" height={600}>
      <Document>
        <Page style={styles.page}>
          <Text style={styles.title}>Order Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>Order ID</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Email</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Postal Code</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Country Code</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Total Product</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Total Price</Text>
              </View>
            </View>
            {orders.map((order) => (
              <View key={order.order_id} style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>{order.order_id}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{order.email}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{order.postal_code}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{order.country_code}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{order.total_product}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{order.total_price}</Text>
                </View>
              </View>
            ))}
          </View>
          <Text>{new Date().toString()}</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
}
