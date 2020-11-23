import React from 'react';
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';
import './Table.css';
import {orderData} from './DummyData'
 

let orders = orderData;
 
const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};
 
const getSorter = (data) => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);
 
  if (data.field === 'id') {
    sorter = data.direction === 'ascending' ?
      SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter = data.direction === 'ascending' ?
      SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
  }
 
  return sorter;
};
 

let count = orders.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(orders);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (order) => {
    count += 1;
    orders.push({
      ...order,
      id: count,
    });
    return Promise.resolve(order);
  },
  update: (data) => {
    const orderIndex = orders.findIndex(t => t.id === data.id);
    orders[orderIndex] = data;
    return Promise.resolve(orders[orderIndex]);
  },
  delete: (data) => {
    const order = orders.find(t => t.id === data.id);
    orders = orders.filter(t => t.id !== order.id);
    return Promise.resolve(order);
  },
};


 
const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};
 
const Table = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Your orders"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field
          
          name="id"
          label="Id"
          hideInCreateForm
        />
        <Field
          
          name="customer_name"
          label="Customer Name"
          placeholder="Customer Name"
        />
        <Field
          
          name="customer_email"
          label="Customer Email"
          placeholder="Customer Email"
        />
        <Field
        
        name="product"
        label="Product"
        placeholder="Product Number"
      />
     <Field
          
          name="quantity"
          label="quantity"
          placeholder="quantity"
        />
      </Fields>

      <CreateForm      
        title="Create Order"
        message="Create a new Order!"
        trigger="Create Order"
        onSubmit={order => service.create(order)}
        submitText="Create"
        validate={(values) => {
          const errors = {};
          
          if (!values.customer_name) {
            errors.customer_name = 'Please, provide Customer\'s Name';
          }
 
          if (!values.customer_email) {
            errors.customer_email = 'Please, provide Customer\'s Email ';
          }

          if (!values.product) {
            errors.product = 'Please, provide order\'s description';
          }

          if (!values.quantity) {
            errors.quantity = 'Please, provide order\'s Quantity';
          }     
          return errors;
        }}
      />
 
      <UpdateForm
        
        title="Update orders"
        message="Update Order"
        trigger="Update"
        onSubmit={order => service.update(order)}
        submitText="Update"
        validate={(values) => {
          const errors = {};
 
          if (!values.id) {
            errors.id = 'Please, provide id';
          }
 
          if (!values.customer_name) {
            errors.customer_name = 'Please, provide Customer\'s Name';
          }
 
          if (!values.customer_email) {
            errors.customer_email = 'Please, provide Customer\'s Email ';
          }

          if (!values.quantity) {
            errors.quantity = 'Please, provide order\'s Quantity';
          }
          return errors;
        }}
      />
 
      <DeleteForm
        
        title="Order Delete Process"
        message="Are you sure you want to delete the order?"
        trigger="Delete"
        onSubmit={order => service.delete(order)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values.id) {
            errors.id = 'Please, provide id';
          }
          return errors;
        }}
      />
        
    </CRUDTable>
  </div>
);

export default Table
 
