

//class sản phẩm
class Product {
  constructor(id, name, price, image, category, hot, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.category = category;
    this.hot = hot;
    this.description = description;
  }
render() {
  return `
  <div 
    class="bg-white p-5 rounded-xl shadow hover:shadow-lg transition group cursor-pointer relative overflow-hidden"
    data-product-id="${this.id}"
  >
    ${this.hot ? `
      <span class="absolute top-3 right-3 z-10 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
        Hot
      </span>
    ` : ""}
    
    <div class="relative w-full h-48 flex items-center justify-center">
      <img 
        src="${this.image}" 
        alt="${this.name}" 
        class="w-full h-48 object-contain mb-4 group-hover:scale-105 transition-transform duration-300 ease-in-out z-0"
      />
    </div>

    <h3 class="font-semibold text-gray-800 mb-2 truncate mt-2">${this.name}</h3>
    <p class="text-orange-500 font-bold text-lg mb-3">${this.price.toLocaleString()}₫</p>
    
    <div class="flex gap-2">
      <button 
        class="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition addCartBtn"
        data-product-id="${this.id}">
        <i class="fa-solid fa-cart-plus mr-1"></i> Thêm vào giỏ
      </button>
      
      <a 
        href="detail.html?id=${this.id}" 
        class="flex-1 border border-orange-500 text-orange-500 py-2 rounded-lg text-sm font-semibold text-center hover:bg-orange-500 hover:text-white transition"
      >
        Xem
      </a>
    </div>
  </div>
  `;
}
 renderDetail() {
  return `
    <div class="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      
      <div class="relative flex items-center justify-center">
        ${this.hot ? `
          <span class="absolute top-3 right-3 z-10 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            Hot
          </span>
        ` : ""}
        <img 
          src="${this.image}" 
          alt="${this.name}" 
          class="w-full max-h-96 object-contain rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>

      <div class="space-y-4">
        <h2 class="text-3xl font-bold text-gray-800">${this.name}</h2>
        <p class="text-orange-500 text-2xl font-semibold">
          ${this.price.toLocaleString()}₫
        </p>
        <p class="text-gray-600"><span class="font-semibold text-gray-800">Danh mục:</span> ${this.category}</p>
        <p class="text-gray-700 leading-relaxed"><span class="font-semibold text-gray-800">Mô tả:</span> ${this.description}</p>

        <div class="flex gap-3 mt-6">
          <button 
            class="flex-1 bg-orange-500 text-white py-3 rounded-xl text-base font-semibold hover:bg-orange-600 transition addCartBtn"
            data-product-id="${this.id}">
            <i class="fa-solid fa-cart-shopping mr-2"></i> Mua ngay
          </button>

          <a href="index.html" 
            class="flex-1 border border-orange-500 text-orange-500 py-3 rounded-xl text-base font-semibold text-center hover:bg-orange-500 hover:text-white transition">
            Quay lại
          </a>
        </div>
      </div>

    </div>
  `;
}
}

//Show trang chủ
const productHot = document.getElementById('product-hot');
const productPhone = document.getElementById('product-phone');
const productLaptop = document.getElementById('product-laptop');
if (productHot) {
  fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      //Show mảng data vào trong thẻ content
      const dataHot = data.filter(p => p.hot == true);
      const dataLaptop = data.filter(p => p.category === "laptop");
      const dataPhone = data.filter(p => p.category === "điện thoại");
      // Show sản phẩm nổi bật
      let html = "";
      dataHot.forEach((item) => {
        const product = new Product(
          item.id,
          item.name,
          item.price,
          item.image,
          item.category,
          item.hot,
          item.description
        )
        html += product.render();
      })
      productHot.innerHTML = html;
      // Show sản phẩm laptop
      html = "";
      dataLaptop.forEach((item) => {
        const product = new Product(
          item.id,
          item.name,
          item.price,
          item.image,
          item.category,
          item.hot,
          item.description
        )
        html += product.render();
      })
      productLaptop.innerHTML = html;
      // show sản phẩm điện thoại
      html = "";
      dataPhone.forEach((item) => {
        const product = new Product(
          item.id,
          item.name,
          item.price,
          item.image,
          item.category,
          item.hot,
          item.description
        )
        html += product.render();
      })
      productPhone.innerHTML = html;
    })
}

// show trang sản phẩm
const productAll = document.getElementById('all-product');
const searchInput = document.getElementById('search-input');
const sortPrice = document.getElementById('sort-price');
let allProductsData = [];
if (productAll) {
  fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      renderProduct(data, productAll);
      allProductsData = data;
    });
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.toLowerCase();
      console.log(keyword);
      const filteredProducts = allProductsData.filter(p => p.name.toLowerCase().includes(keyword));
      renderProduct(filteredProducts, productAll);
    })
  };
  if (sortPrice) {
    sortPrice.addEventListener('change', (e) => {
      if (e.target.value === "asc") {
        allProductsData.sort((a, b) => a.price - b.price);
      } else if (e.target.value === "desc") {
        allProductsData.sort((a, b) => b.price - a.price);
      }
      renderProduct(allProductsData, productAll);
    })
  }
}

const renderProduct = (array, theDiv) => {
  let html = "";
  array.forEach((item) => {
    const product = new Product(
      item.id,
      item.name,
      item.price,
      item.image,
      item.category,
      item.hot,
      item.description
    )
    html += product.render();
  })
  theDiv.innerHTML = html;
}

const productDetailDiv = document.getElementById('product-detail');
if (productDetailDiv) {
  //lấy id từ url
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  console.log(id);
  fetch(`http://localhost:3000/products/${id}`)
    .then(response => response.json())
    .then(item => {
      console.log(item);
      const product = new Product(
        item.id,
        item.name,
        item.price,
        item.image,
        item.category,
        item.hot,
        item.description
      )
      productDetailDiv.innerHTML = product.renderDetail();
    });
}

// Giỏ hàng
// ---------------- Header ----------------
if (!document.querySelector('header')) {
  const header = document.createElement('header');
  header.innerHTML = `
  <header class="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 py-3 px-6">

      <!-- Logo -->
      <a href="index.html" class="flex items-center gap-2 text-2xl font-extrabold text-orange-500 uppercase tracking-wide">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h18v18H3V3z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h10v10H7V7z" />
  </svg>
        Happiness
      </a>

      <!-- Search (ẩn trên màn nhỏ) -->
      <div class="hidden md:flex flex-1 max-w-lg relative">
        <input
          id="header-search"
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          class="w-full border border-gray-200 rounded-full py-2.5 pl-5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
        />
        <i class="fa-solid fa-magnifying-glass absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <a href="#" class="text-gray-600 hover:text-orange-500 font-semibold transition">Đăng nhập</a>
        <a href="cart.html" class="flex items-center gap-2 border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition">
          <i class="fa-solid fa-cart-shopping"></i>
          Giỏ hàng <span id="cart-count" class="text-sm font-normal">(0)</span>
        </a>
      </div>
    </div>

    <!-- Nav -->
    <nav class="bg-gray-50 border-t border-gray-100">
      <ul class="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-start gap-1 py-2 px-6 text-sm font-semibold text-gray-700">
        <li><a href="index.html" class="block px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition">Trang chủ</a></li>
        <li><a href="#" class="block px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition">Điện thoại</a></li>
        <li><a href="#" class="block px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition">Laptop</a></li>
        <li><a href="#" class="block px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition">Phụ kiện</a></li>
        <li><a href="#" class="block px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition">Liên hệ</a></li>
      </ul>
    </nav>
  </header>
  `;
  document.body.prepend(header);
}

// ---------------- Footer ----------------
if (!document.querySelector('footer')) {
  const footer = document.createElement('footer');
  footer.innerHTML = `
  <footer class="bg-gray-900 text-gray-300 mt-16 pt-12 pb-6">
    <div class="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div>
        <h4 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <i class="fa-solid fa-info-circle text-orange-400"></i> Về chúng tôi
        </h4>
        <ul class="space-y-2 text-sm">
          <li><a href="#" class="hover:text-orange-400 transition">Giới thiệu</a></li>
          <li><a href="#" class="hover:text-orange-400 transition">Tuyển dụng</a></li>
          <li><a href="#" class="hover:text-orange-400 transition">Hệ thống cửa hàng</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <i class="fa-solid fa-life-ring text-orange-400"></i> Hỗ trợ
        </h4>
        <ul class="space-y-2 text-sm">
          <li><a href="#" class="hover:text-orange-400 transition">Chính sách bảo hành</a></li>
          <li><a href="#" class="hover:text-orange-400 transition">Chính sách đổi trả</a></li>
          <li><a href="#" class="hover:text-orange-400 transition">Hướng dẫn mua hàng</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <i class="fa-solid fa-address-book text-orange-400"></i> Liên hệ
        </h4>
        <ul class="space-y-2 text-sm">
          <li><i class="fa-solid fa-phone text-orange-400"></i> 1800 1234</li>
          <li><i class="fa-solid fa-envelope text-orange-400"></i> support@example.com</li>
          <li><i class="fa-brands fa-facebook text-orange-400"></i> Facebook Fanpage</li>
        </ul>
      </div>
      <div>
        <h4 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <i class="fa-solid fa-headset text-orange-400"></i> Tổng đài hỗ trợ
        </h4>
        <ul class="space-y-2 text-sm">
          <li>Gọi mua: 19001081</li>
          <li>Khiếu nại: 18000166</li>
          <li>Bảo hành: 19001111</li>
        </ul>
      </div>
    </div>
    <div class="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
      © 2025 My Store. All rights reserved.
    </div>
  </footer>
  `;
  document.body.appendChild(footer);
}

// ---------------- Cart ----------------
// ---------------- Cart ----------------
class Cart {
  constructor() {
    // Lấy dữ liệu từ localStorage
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
    this.updateCartCount();
  }

  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.updateCartCount();
  }

  updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalQty = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalQty;
    }
}

 addItem(product) {
    const id = product.id.toString(); // đảm bảo id là string
    const existing = this.items.find(i => i.id.toString() === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        this.items.push({ ...product, id: id, quantity: 1 });
    }
    this.save();
}

  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
    this.render();
  }

  updateQuantity(id, qty) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.quantity = qty > 0 ? qty : 1;
      this.save();
      this.render();
    }
  }

  getTotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  render() {
    const tbody = document.getElementById('cart-table');
    const totalDiv = document.getElementById('cart-total');
    if (!tbody || !totalDiv) return;

    if (this.items.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="py-6 text-gray-500">Giỏ hàng trống</td></tr>`;
      totalDiv.classList.add('hidden');
      return;
    }

    tbody.innerHTML = this.items.map(item => `
      <tr class="border-b border-gray-200">
        <td><img src="${item.image}" class="w-20 h-20 object-cover rounded-lg"></td>
        <td>${item.name}</td>
        <td>${item.price.toLocaleString()} đ</td>
        <td>
          <input type="number" class="qty-input w-16 border rounded-md text-center" min="1" value="${item.quantity}" data-id="${item.id}">
        </td>
        <td>${(item.price * item.quantity).toLocaleString()} đ</td>
        <td>
          <button class="remove-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md" data-id="${item.id}">Xóa</button>
        </td>
      </tr>
    `).join('');

    totalDiv.innerHTML = `
      <h3 class="text-xl font-bold text-gray-800">
        Tổng đơn hàng: <span class="text-orange-500">${this.getTotal().toLocaleString()} đ</span>
      </h3>
      <button class="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg">
        Thanh toán
      </button>
    `;
    totalDiv.classList.remove('hidden');
  }
}
// Khởi tạo giỏ hàng
const cart = new Cart();
cart.render();
cart.updateCartCount();

// Event: thêm vào giỏ hàng
document.addEventListener('click', e => {
  // Nếu click nút thêm vào giỏ
  if (e.target.closest('.addCartBtn')) {
    const btn = e.target.closest('.addCartBtn');
    const productId = btn.dataset.productId;

    // Lấy sản phẩm từ server
    fetch(`http://localhost:3000/products/${productId}`)
      .then(res => res.json())
      .then(product => {
        cart.addItem({
          id: product.id.toString(), // đảm bảo id là string
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          hot: product.hot,
          description: product.description,
        });
        cart.render();
        alert(`🛒 Đã thêm "${product.name}" vào giỏ hàng!`);
      })
      .catch(err => console.error("Lỗi thêm sản phẩm:", err));
  }
});

// Event: xóa sản phẩm
document.addEventListener('click', e => {
  if (e.target.closest('.remove-btn')) {
    const id = e.target.closest('.remove-btn').dataset.id;
    cart.removeItem(id);
  }
});

// Event: cập nhật số lượng
document.addEventListener('input', e => {
  if (e.target.classList.contains('qty-input')) {
    const id = e.target.dataset.id;
    const qty = parseInt(e.target.value);
    cart.updateQuantity(id, qty);
  }
});
// Render giỏ hàng khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  cart.render();
});

// DOM elements
const courseForm = document.getElementById('course-form');
const courseNameInput = document.getElementById('course-name');
const courseDescriptionInput = document.getElementById('course-description');
const courseModal = document.getElementById('course-modal');
const openAddCourseModal = document.getElementById('open-add-course-modal');
const courseList = document.getElementById('course-list'); // tbody chứa danh sách sản phẩm

// Class Course
class Course {
    constructor(id, name, price, image, hot, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.hot = hot;
        this.description = description;
    }

    render() {
        return `
        <tr class="bg-white hover:bg-orange-50 transition-all duration-200 shadow-sm rounded-lg">
            <td class="py-3 px-4 font-medium text-gray-700">${this.id}</td>
            <td class="py-3 px-4 font-semibold text-gray-800">${this.name}</td>
            <td class="py-3 px-4 text-orange-500 font-bold">${this.price.toLocaleString()}₫</td>
            <td class="py-3 px-4">
                <img src="${this.image}" alt="${this.name}" class="w-16 h-16 object-cover rounded-lg shadow-sm">
            </td>
            <td class="py-3 px-4">
                ${this.hot ? `<span class="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Hot</span>` : ''}
            </td>
            <td class="py-3 px-4 text-gray-600 truncate max-w-xs">${this.description}</td>
            <td class="py-3 px-4 flex gap-2 justify-center">
                <button class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition shadow-md edit-button" data-id="${this.id}" title="Sửa">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition shadow-md delete-button" data-id="${this.id}" title="Xóa">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        </tr>
        `;
    }
}

// Hàm fetch và render sản phẩm
function fetchProducts() {
    if(courseList){
        fetch(`http://localhost:3000/products/`)
            .then(response => response.json())
            .then(courses => {
                let html = "";
                courses.forEach(item => {
                    const course = new Course(
                        item.id,
                        item.name,
                        item.price,
                        item.image,
                        item.hot,
                        item.description
                    );
                    html += course.render();
                });
                courseList.innerHTML = html;
            })
            .catch(err => console.error("Lỗi tải sản phẩm:", err));
    }
}

// Gọi lần đầu
fetchProducts();

// Hiển thị modal thêm sản phẩm với transition
if(openAddCourseModal){
    openAddCourseModal.addEventListener('click', () => {
        courseModal.classList.remove('hidden');
        const modalContent = courseModal.querySelector('div');
        setTimeout(() => {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
    });
}

// Đóng modal khi click nút & reset form
const closeCourseModal = document.getElementById('close-course-modal');
if(closeCourseModal){
    closeCourseModal.addEventListener('click', () => {
        const modalContent = courseModal.querySelector('div');
        modalContent.classList.remove('scale-100','opacity-100');
        modalContent.classList.add('scale-95','opacity-0');
        setTimeout(()=> courseModal.classList.add('hidden'), 200);
        courseForm.reset();
    });
}

// Thêm sản phẩm mới
if (courseForm) {
    courseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Lấy dữ liệu từ form
        const courseData = {
            name: document.getElementById('course-name').value,
            price: Number(document.getElementById('course-price').value),
            image: document.getElementById('course-image').value,
            category: document.getElementById('course-category').value,
            hot: document.getElementById('course-hot').checked,
            description: document.getElementById('course-description').value
        };

        const courseId = document.getElementById('course-id').value;

        if (courseId) {
            // Sửa sản phẩm
            fetch(`http://localhost:3000/products/${courseId}`, {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(courseData)
            })
            .then(res => res.json())
            .then(data => {
                alert("Cập nhật sản phẩm thành công!");

                // Đóng modal
                const modalContent = courseModal.querySelector('div');
                modalContent.classList.remove('scale-100','opacity-100');
                modalContent.classList.add('scale-90','opacity-0');
                setTimeout(() => courseModal.classList.add('hidden'), 200);

                // Reset form
                courseForm.reset();

                // Tải lại danh sách sản phẩm
                fetchProducts();
            })
            .catch(err => console.error("Lỗi cập nhật sản phẩm:", err));
        } else {
            // Thêm sản phẩm mới
            const newCourse = {...courseData, id: Date.now().toString()};

            fetch(`http://localhost:3000/products`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(newCourse)
            })
            .then(res => res.json())
            .then(data => {
                alert("Thêm sản phẩm thành công!");

                // Đóng modal
                const modalContent = courseModal.querySelector('div');
                modalContent.classList.remove('scale-100','opacity-100');
                modalContent.classList.add('scale-90','opacity-0');
                setTimeout(() => courseModal.classList.add('hidden'), 200);

                // Reset form
                courseForm.reset();

                // Tải lại danh sách sản phẩm
                fetchProducts();
            })
            .catch(err => console.error("Lỗi thêm sản phẩm:", err));
        }
    });
}
// Xóa sản phẩm
courseList.addEventListener('click', (e) => {
    if (e.target.closest('.delete-button')) {
        const id = e.target.closest('.delete-button').dataset.id;
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            fetch(`http://localhost:3000/products/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                alert("Xóa sản phẩm thành công!");
                fetchProducts();
            })
            .catch(err => console.error("Lỗi xóa sản phẩm:", err));
        }
    }
});
// Khai báo biến trạng thái sửa
let editingCourseId = null;
courseList.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.edit-button');
    if (!editBtn) return;

    const id = editBtn.dataset.id;
    editingCourseId = id; // ✅ Gán ID sản phẩm đang sửa

    fetch(`http://localhost:3000/products/${id}`)
        .then(res => res.json())
        .then(course => {
            document.getElementById('course-id').value = course.id;
            document.getElementById('course-name').value = course.name;
            document.getElementById('course-price').value = course.price;
            document.getElementById('course-image').value = course.image;
            document.getElementById('course-category').value = course.category;
            document.getElementById('course-hot').checked = course.hot;
            document.getElementById('course-description').value = course.description;

            courseModal.classList.remove('hidden');
            const modalContent = courseModal.querySelector('div');
            setTimeout(() => {
                modalContent.classList.remove('scale-90','opacity-0');
                modalContent.classList.add('scale-100','opacity-100');
            }, 10);
        })
        .catch(err => console.error("Lỗi tải dữ liệu sản phẩm:", err));
});
// Khi submit form, phân biệt thêm/sửa
courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const courseData = {
        name: courseNameInput.value,
        price: document.getElementById('course-price').value,
        image:  document.getElementById('course-image').value,
        hot: document.getElementById('course-hot').checked,
        description: courseDescriptionInput.value
    };

    if (editingCourseId) {
        // Cập nhật sản phẩm
        fetch(`http://localhost:3000/products/${editingCourseId}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(courseData)
        })
        .then(res => res.json())
        .then(() => {
            alert("Cập nhật sản phẩm thành công!");
            fetchProducts();
            editingCourseId = null;
            closeCourseModal.click();
        })
        .catch(err => console.error("Lỗi cập nhật:", err));
    } else {
        // Thêm sản phẩm mới
        const newCourse = {...courseData, id: Date.now().toString()};
        fetch(`http://localhost:3000/products`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newCourse)
        })
        .then(res => res.json())
        .then(() => {
            alert("Thêm sản phẩm thành công!");
            fetchProducts();
            closeCourseModal.click();
        })
        .catch(err => console.error("Lỗi thêm:", err));
    }
});