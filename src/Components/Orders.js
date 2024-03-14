import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from 'react-bootstrap';


const initialOrders = [
  { id: 1, orderId: 'ORD001', customerName: 'K Yogita', orderDate: '2024-03-15', status: 'Pending' },
  { id: 2, orderId: 'ORD002', customerName: 'Gaurav Smith', orderDate: '2024-03-16', status: 'Processing' },
  { id: 3, orderId: 'ORD003', customerName: 'Rohit Singh', orderDate: '2024-03-17', status: 'Delivered' },
];

function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState('');

  const generateRandomDate = () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 10);
    return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (!date) {
      setSelectedOrders(orders);
      setSelectedDeliveryStatus('');
      return;
    }
    setSelectedOrders([]);
    setSelectedDeliveryStatus('In Progress');
    setSelectedOrders(orders.filter(order => {
      const expectedDeliveryDate = new Date(order.expectedDeliveryDate);
      return (
        expectedDeliveryDate.getDate() === date.getDate() &&
        expectedDeliveryDate.getMonth() === date.getMonth() &&
        expectedDeliveryDate.getFullYear() === date.getFullYear()
      );
    }));
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder({
      ...order,
      shippingDate: generateRandomDate(),
      expectedDeliveryDate: generateRandomDate()
    });
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.orderId === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.orderId !== orderId);
    setOrders(updatedOrders);
  };

  return (
    <div className="container mt-2 mb-2 p-4">
      <h2 className="title mb-4">ORDERS</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="order-list">
            {orders.map(order => (
              <div key={order.id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Order ID: {order.orderId}</h5>
                  <p className="card-text">Customer Name: {order.customerName}</p>
                  <p className="card-text">Order Date: {order.orderDate}</p>
                  <p className="card-text">Status: {order.status}</p>
                  <Button variant="warning" className="mx-1 mb-1" onClick={() => handleViewOrderDetails(order)}>View Details</Button>
                  <Button variant="success" className="mx-2 mb-1" onClick={() => handleUpdateOrderStatus(order.orderId, 'Shipped')}>Ship</Button>
                  <Button variant="danger" className="mx-1 mb-1" onClick={() => handleDeleteOrder(order.orderId)}>Delete</Button>
                  {selectedOrder && selectedOrder.id === order.id && (
                    <div className="mt-3">
                      <p><b>Shipping Date:</b> {selectedOrder.shippingDate.toDateString()}</p>
                      <p><b>Expected Delivery Date:</b> {selectedOrder.expectedDeliveryDate.toDateString()}</p>
                      <button onClick={() => setSelectedOrder(null)} className="close-details-button btn btn-info">Close Details</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <div className="calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
            />
          </div>
          <div className="selected-orders mt-4">
            <h3>Orders for {selectedDate.toDateString()}</h3>
            <ul>
              {selectedOrders.map(order => (
                <li key={order.id}>{order.customerName}</li>
              ))}
            </ul>
            {selectedDeliveryStatus && (
              <p><b>Delivery Status:</b> {selectedDeliveryStatus}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
