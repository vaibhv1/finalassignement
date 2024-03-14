import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Assuming you use a library for calendar

const OrdersCalendarView = ({ orders }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ordersForSelectedDate, setOrdersForSelectedDate] = useState([]);

  // Function to handle date selection
  const handleDateChange = date => {
    setSelectedDate(date);
    if (orders && orders.length > 0) {
      const filteredOrders = orders.filter(order => {
        const deliveryDate = new Date(order.deliveryDate);
        return (
          deliveryDate.getDate() === date.getDate() &&
          deliveryDate.getMonth() === date.getMonth() &&
          deliveryDate.getFullYear() === date.getFullYear()
        );
      });
      setOrdersForSelectedDate(filteredOrders);
    } else {
      setOrdersForSelectedDate([]); // Reset orders if empty
    }
  };

  return (
    <div>
      <h2>Orders Calendar View</h2>
      <div>
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>
      <div>
        <h3>Orders for {selectedDate.toDateString()}</h3>
        <ul>
          {ordersForSelectedDate.map(order => (
            <li key={order.id}>
              Order ID: {order.id}, Delivery Date: {order.deliveryDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrdersCalendarView;