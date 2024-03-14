import React, { useState } from 'react';

function Products() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', category: 'Category A', price: 10.99, stockQuantity: 30 },
    { id: 2, name: 'Product 2', category: 'Category B', price: 15.99, stockQuantity: 25 },
    { id: 3, name: 'Product 3', category: 'Category C', price: 20.99, stockQuantity: 10 },
    { id: 4, name: 'Product 4', category: 'Category d', price: 10.99, stockQuantity: 20 },
    { id: 5, name: 'Product 5', category: 'Category e', price: 15.99, stockQuantity: 15 },
    { id: 6, name: 'Product 6', category: 'Category f', price: 20.99, stockQuantity: 10 },
    { id: 7, name: 'Product 7', category: 'Category A', price: 10.99, stockQuantity: 20 },
    { id: 8, name: 'Product 8', category: 'Category B', price: 15.99, stockQuantity: 15 },
    { id: 9, name: 'Product 9', category: 'Category c', price: 20.99, stockQuantity: 10 },
    { id: 10, name: 'Product 10', category: 'Category d', price: 10.99, stockQuantity: 20 }
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stockQuantity: '' });
  const [editProductId, setEditProductId] = useState(null);
  const [showInputFields, setShowInputFields] = useState(false);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stockQuantity) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedProducts = [...products, { ...newProduct, id: Date.now() }];
    setProducts(updatedProducts);
    setNewProduct({ name: '', category: '', price: '', stockQuantity: '' });
    setShowInputFields(false);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  const handleEditProduct = (product) => {
    setEditProductId(product.id);
    setNewProduct({ ...product });
    setShowInputFields(true);
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map((product) =>
      product.id === editProductId ? { ...newProduct } : product
    );
    setProducts(updatedProducts);
    setNewProduct({ name: '', category: '', price: '', stockQuantity: '' });
    setEditProductId(null);
    setShowInputFields(false);
  };

  return (
    <div className="container mt-2 mb-2 p-4">
      <h2 className="title mb-4">PRODUCTS</h2>

      <div className="mb-4">
        <h3 className="mb-3">Add New Product</h3>
        {showInputFields && (
          <div className="row border p-3 rounded-3 mb-3">
            <div className="col">
              <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="form-control mb-3 mt-3"
              />
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="form-control mb-3"
              />
              <input
                type="text"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="form-control mb-3"
              />
              <input
                type="text"
                placeholder="Stock Quantity"
                value={newProduct.stockQuantity}
                onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                className="form-control mb-3"
              />
            </div>
          </div>
        )}
        <button onClick={() => setShowInputFields(true)} className="btn btn-primary mb-2">Add Product</button>
        {showInputFields && <button onClick={handleAddProduct} className="btn btn-success mx-2 mb-2">Save</button>}
      </div>

      <div className="table-product">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  {editProductId === product.id ? (
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editProductId === product.id ? (
                    <input
                      type="text"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td>
                  {editProductId === product.id ? (
                    <input
                      type="text"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td>
                  {editProductId === product.id ? (
                    <input
                      type="text"
                      value={newProduct.stockQuantity}
                      onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    product.stockQuantity
                  )}
                </td>
                <td>
                  {editProductId === product.id ? (
                    <button className="btn btn-success" onClick={handleUpdateProduct}>Save</button>
                  ) : (
                    <button className="btn btn-info" onClick={() => handleEditProduct(product)}>Edit</button>
                  )}
                  <button className="btn btn-danger mx-2" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
