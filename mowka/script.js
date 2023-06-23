const firebaseUrl = 'https://project-4117005869626741712-default-rtdb.europe-west1.firebasedatabase.app/';


const addProduct = async (name, price, description, image) => {
  try {
    const response = await fetch(`${firebaseUrl}/products.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        price,
        description,
        image
      })
    });

    if (response.ok) {
      alert('Product added successfully!');
    } else {
      alert('Failed to add product.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};


const removeProduct = async (productId) => {
  try {
    const response = await fetch(`${firebaseUrl}/products/${productId}.json`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Product removed successfully!');
    } else {
      alert('Failed to remove product.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};


const loadProducts = async () => {
  try {
    const response = await fetch(`${firebaseUrl}/products.json`);
    const data = await response.json();

    if (response.ok) {
      renderProductList(data);
    } else {
      alert('Failed to load products.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};


const renderProductList = (products) => {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  for (const productId in products) {
    const product = products[productId];

    const li = document.createElement('li');
    li.innerHTML = `
      <div class="product">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <p>${product.description}</p>
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-actions">
          <button class="btn btn-primary" onclick="editProductForm('${productId}', '${product.name}', '${product.price}', '${product.description}', '${product.image}')">Edit</button>
          <button class="btn btn-danger" onclick="removeProduct('${productId}')">Delete</button>
        </div>
      </div>
    `;

    productList.appendChild(li);
  }
};


const submitAddProductForm = async (event) => {
  event.preventDefault();

  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;
  const productDescription = document.getElementById('productDescription').value;
  const productImage = document.getElementById('productImage').value;

  await addProduct(productName, productPrice, productDescription, productImage);

  await loadProducts();


  document.getElementById('addProductForm').reset();
};


const editProduct = async (productId, name, price, description, image) => {
  try {
    const response = await fetch(`${firebaseUrl}/products/${productId}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        price,
        description,
        image
      })
    });

    if (response.ok) {
      alert('Product updated successfully!');
    } else {
      alert('Failed to update product.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};


const editProductForm = (productId, productName, productPrice, productDescription, productImage) => {
  const editForm = document.createElement('form');
  editForm.innerHTML = `
    <h2>Edit Product</h2>
    <label for="editProductName">Product Name:</label>
    <input type="text" id="editProductName" value="${productName}" required><br>
    <label for="editProductPrice">Price:</label>
    <input type="number" id="editProductPrice" value="${productPrice}" required><br>
    <label for="editProductDescription">Description:</label>
    <textarea id="editProductDescription" required>${productDescription}</textarea><br>
    <label for="editProductImage">Image URL:</label>
    <input type="text" id="editProductImage" value="${productImage}" required><br>
    <button onclick="saveProduct('${productId}')">Save</button>
  `;

  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  productList.appendChild(editForm);
};

const saveProduct = async (productId) => {
  const editProductName = document.getElementById('editProductName').value;
  const editProductPrice = document.getElementById('editProductPrice').value;
  const editProductDescription = document.getElementById('editProductDescription').value;
  const editProductImage = document.getElementById('editProductImage').value;

  await editProduct(
    productId,
    editProductName,
    editProductPrice,
    editProductDescription,
    editProductImage
  );

  await loadProducts();
};

loadProducts();

document.getElementById('addProductForm').addEventListener('submit', submitAddProductForm);
