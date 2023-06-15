class ProductManager {
  constructor() {
    this.productNameInput = document.getElementById('productName');
    this.productPriceInput = document.getElementById('productPrice');
    this.productCategoryInput = document.getElementById('productCategory');
    this.productDescriptionInput = document.getElementById('productDescription');
    this.addBtn = document.getElementById('addBtn');
    this.searchInput = document.getElementById('searchInput');
    this.inputs = document.getElementsByClassName('form-control');
    this.currentIndex = 0;
    this.products = [];

    if (JSON.parse(localStorage.getItem('productsList')) !== null) {
      this.products = JSON.parse(localStorage.getItem('productsList'));
      this.displayProducts();
    }

    this.addBtn.onclick = () => {
      if (!this.validateProductName()) {
        return; // Stop execution if validation fails
      }

      if (this.addBtn.innerHTML === 'Add product') {
        this.addProduct();
      } else {
        this.updateProduct();
      }

      this.displayProducts();
      this.clearData();
    };

    this.searchInput.onkeyup = () => {
      this.filterProducts();
    };
  }

  addProduct() {
    const product = {
      name: this.productNameInput.value,
      price: this.productPriceInput.value,
      category: this.productCategoryInput.value,
      description: this.productDescriptionInput.value,
    };

    this.products.push(product);
    this.products.sort((a, b) => a.name.localeCompare(b.name));

    localStorage.setItem('productsList', JSON.stringify(this.products));
  }

  displayProducts() {
    let cartona = '';
    for (let i = 0; i < this.products.length; i++) {
      cartona += `<tr>
        <td>${this.products[i].name}</td>
        <td>${this.products[i].price}</td>
        <td>${this.products[i].category}</td>
        <td>${this.products[i].description}</td>
        <td><button onclick="productManager.deleteProduct(${i})" class="btn btn bg-warning">Delete</button></td>
        <td><button onclick="productManager.getProductInfo(${i})" class="btn btn bg-info">Update</button></td>
      </tr>`;
    }
    document.getElementById('tableBody').innerHTML = cartona;
  }

  deleteProduct(index) {
    this.products.splice(index, 1);
    this.displayProducts();
    localStorage.setItem('productsList', JSON.stringify(this.products));
  }

  clearData() {
    for (let i = 0; i < this.inputs.length; i++) {
      this.inputs[i].value = '';
    }
  }

  filterProducts() {
    const searchTerm = this.searchInput.value.toLowerCase();
    let cartona = '';

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].name.toLowerCase().includes(searchTerm)) {
        cartona += `<tr>
          <td>${this.products[i].name}</td>
          <td>${this.products[i].price}</td>
          <td>${this.products[i].category}</td>
          <td>${this.products[i].description}</td>
          <td><button onclick="productManager.deleteProduct(${i})" class="btn btn bg-warning">Delete</button></td>
          <td><button class="btn btn bg-info">Update</button></td>
        </tr>`;
      }
    }
    document.getElementById('tableBody').innerHTML = cartona;
  }

  getProductInfo(index) {
    this.currentIndex = index;
    const currentProduct = this.products[index];

    this.productNameInput.value = currentProduct.name;
    this.productPriceInput.value = currentProduct.price;
    this.productCategoryInput.value = currentProduct.category;
    this.productDescriptionInput.value = currentProduct.description;
    this.addBtn.innerHTML = 'Update Product';
  }

  updateProduct() {
    const product = {
      name: this.productNameInput.value,
      price: this.productPriceInput.value,
      category: this.productCategoryInput.value,
      description: this.productDescriptionInput.value,
    };

    this.products[this.currentIndex] = product;
    localStorage.setItem('productsList', JSON.stringify(this.products));
    this.addBtn.innerHTML = 'Add Product';
  }

  validateProductName() {
    const productName = this.productNameInput.value.trim();
    if (productName === '') {
      alert('Product name is required');
      return false;
    }

    const existingProduct = this.products.find((product) =>
      product.name.toLowerCase() === productName.toLowerCase()
    );

    if (existingProduct) {
      alert('Product with the same name already exists');
      return false;
    }

    return true;
  }
}

// Create an instance of the ProductManager class
const productManager = new ProductManager();
