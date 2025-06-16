

// import React, { useEffect, useState } from 'react';
// import api from '../api/api';

// const ManagerDashboard = () => {
//   const [items, setItems] = useState([]);
//   const [form, setForm] = useState({
//     name: '',
//     category: '',
//     price: '',
//     description: '',
//     rating: '',
//     quantity: ''
//   });
//   const [editId, setEditId] = useState(null); // <-- Track which item is being edited

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     const res = await api.get('/all_items');
//     setItems(res.data);
//   };

//   const addItem = async () => {
//     try {
//       await api.post('/items', form);
//       alert('Item added successfully!');
//       fetchItems();
//       setForm({ name: '', category: '', price: '', description: '', rating: '', quantity: '' });
//     } catch (error) {
//       console.error('Failed to add item:', error);
//       alert('Failed to add item. Please check your input and try again.');
//     }
//   };

//   const updateItem = async () => {
//     try {
//       await api.put(`/items${editId}`, form);
//       alert('Item updated successfully!');
//       fetchItems();
//       setForm({ name: '', category: '', price: '', description: '', rating: '', quantity: '' });
//       setEditId(null); // Clear edit mode
//     } catch (error) {
//       console.error('Failed to update item:', error);
//       alert('Failed to update item. Please check your input and try again.');
//     }
//   };

//   const deleteItem = async (id) => {
//     try {
//       await api.delete(`/items${id}`);
//       fetchItems();
//     } catch (error) {
//       console.error('Delete failed:', error);
//     }
//   };

//   const startEdit = (item) => {
//     setForm({
//       name: item.name,
//       category: item.category,
//       price: item.price,
//       description: item.description,
//       rating: item.rating,
//       quantity: item.quantity
//     });
//     setEditId(item.id); // Set ID to update
//   };

//   const cancelEdit = () => {
//     setForm({ name: '', category: '', price: '', description: '', rating: '', quantity: '' });
//     setEditId(null);
//   };

//   return (
//     <div>
//       <h2>Manage Items</h2>

//       <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
//       <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
//       <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
//       <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
//       <input placeholder="Rating" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} />
//       <input placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />

//       {editId ? (
//         <>
//           <button onClick={updateItem}>Update</button>
//           <button onClick={cancelEdit}>Cancel</button>
//         </>
//       ) : (
//         <button onClick={addItem}>Add</button>
//       )}

//       <ul>
//         {items.map((item) => (
//           <li key={item.id}>
//             {item.name} - {item.category} - {item.description} - {item.rating} - ${item.price}
//             <button onClick={() => startEdit(item)}>Edit</button>
//             <button onClick={() => deleteItem(item.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ManagerDashboard;


import React, { useEffect, useState } from 'react';
import api from '../api/api';

const ManagerDashboard = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    rating: '',
    quantity: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await api.get('/all_items');
    setItems(res.data);
  };

  const addItem = async () => {
    try {
      await api.post('/items', form);
      alert('Item added successfully!');
      fetchItems();
      resetForm();
    } catch (error) {
      console.error('Failed to add item:', error);
      alert('Failed to add item.');
    }
  };

  const updateItem = async () => {
    try {
      await api.put(`/items${editId}`, form);
      alert('Item updated successfully!');
      fetchItems();
      resetForm();
    } catch (error) {
      console.error('Failed to update item:', error);
      alert('Failed to update item.');
    }
  };

  const deleteItem = async (id) => {
    try {
      await api.delete(`/items${id}`);
      fetchItems();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const startEdit = (item) => {
    setForm({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      rating: item.rating,
      quantity: item.quantity
    });
    setEditId(item.id);
  };

  const cancelEdit = () => {
    resetForm();
  };

  const resetForm = () => {
    setForm({
      name: '',
      category: '',
      price: '',
      description: '',
      rating: '',
      quantity: ''
    });
    setEditId(null);
  };

  return (
    <div>
      <h2>Manage Items</h2>

      <div style={{ marginBottom: '20px' }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Rating" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} />
        <input placeholder="Quantity" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />

        {editId ? (
          <>
            <button onClick={updateItem}>Update</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={addItem}>Add</button>
        )}
      </div>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr><td colSpan="7" style={{ textAlign: 'center' }}>No items found.</td></tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.rating}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={() => startEdit(item)}>Edit</button>
                  <button onClick={() => deleteItem(item.id)} style={{ marginLeft: '10px' }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerDashboard;
