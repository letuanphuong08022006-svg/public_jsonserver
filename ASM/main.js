import { Product } from "./modelProduct.js";
import { Cart } from "./modelCart.js";
import { Header } from "./header.js";
import { Footer } from "./footer.js";
const API="http://localhost:3000/products"
const courseForm = document.getElementById('course-form');
const courseNameInput = document.getElementById('course-name');
const courseDescriptionInput = document.getElementById('course-description');
const courseModal = document.getElementById('course-modal');
const openAddCourseModal = document.getElementById('open-add-course-modal');
const courseList = document.getElementById("course-list"); // tbody chứa danh sách sản phẩm
//class sản phẩm
const urlParams = new URLSearchParams(window.location.search)

//Show trang chủ
const productHot = document.getElementById('product-hot');
const productPhone = document.getElementById('product-phone');
const productLaptop = document.getElementById('product-laptop');
if (productHot) {
  fetch(API)
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

const sortPrice = document.getElementById('sort-price');
let allProductsData = [];
if (productAll) {
  const category = urlParams.get("category");
  
  fetch(API)
    .then(response => response.json())
    .then(data => {
      let listData = data; // Mặc định hiển thị tất cả

      // 🔸 Lọc theo danh mục nếu có "category" trong URL
      if (category == 1) {
       listData = data.filter(i => i.category && i.category.toLowerCase() === "điện thoại");
      } 
      else if (category == 2) {
        listData = data.filter(i => i.category && i.category.toLowerCase()  === "laptop");
      } 
      else if (category == 3) {
        listData = data.filter(i => i.category && i.category.toLowerCase()  === "phụ kiện");
      }

      // Hiển thị danh sách sản phẩm ban đầu
      renderProduct(listData, productAll);
      
      // Lưu toàn bộ dữ liệu vào biến toàn cục để dùng lại khi tìm kiếm/sắp xếp
      allProductsData = listData;
    })
    .catch(error => console.error("Lỗi khi tải dữ liệu:", error));

  // 🔍 Tìm kiếm sản phẩm


  // 💸 Sắp xếp theo giá

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
  ;
  const id = urlParams.get('id');
  console.log(id);
  fetch(`${API}/${id}`)
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
Header()

// ---------------- Footer ----------------
Footer()

// ---------------- Cart ----------------
// ---------------- Cart ----------------

// Khởi tạo giỏ hàng
const cart = new Cart();
cart.render();
cart.updateCartCount();

// Event: thêm vào giỏ hàng
document.addEventListener('click', e => {
  const btn = e.target.closest('.addCartBtn');
  if (!btn) return;

  const productId = btn.dataset.productId;

  fetch(`${API}/${productId}`)
    .then(res => res.json())
    .then(product => {
      cart.addItem({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        hot: product.hot,
        description: product.description,
      });
      cart.render();
      cart.updateCartCount();
      alert(`🛒 Đã thêm "${product.name}" vào giỏ hàng!`);
    })
    .catch(err => console.error("Lỗi thêm sản phẩm:", err));
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

let editingCourseId = null;
// Class Course

// Hàm fetch và render sản phẩm
function fetchProducts() {
    if(courseList){
        fetch(API)
            .then(response => response.json())
            .then(courses => {
                let html = "";
                courses.forEach(item => {
                    const course = new Product(
                        item.id,
                        item.name,
                        item.price,
                        item.image,
                        item.category, 
                        item.hot,
                        item.description
                    );
                    html += course.renderAdmin();
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

  
if (courseList) {
    courseList.addEventListener('click', (e) => {
        if (e.target.closest('.delete-button')) {
            const id = e.target.closest('.delete-button').dataset.id;
            if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
                fetch(`${API}/${id}`, { method: 'DELETE' })
                  .then(() => {
                      alert("Xóa sản phẩm thành công!");
                      fetchProducts();
                  })
                  .catch(err => console.error("Lỗi xóa sản phẩm:", err));
            }
        }
    });
}

courseForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const courseData = {
    name: courseNameInput.value,
    price: document.getElementById('course-price').value,
    category: document.getElementById('course-category').value, 
    hot: document.getElementById('course-hot').checked,
    description: courseDescriptionInput.value
  };

  const fileInput = document.getElementById('course-image');
  const file = fileInput.files[0];

  // Nếu đang sửa sản phẩm
  if (editingCourseId) {
    if (file) {
      // Nếu có file mới, đọc Base64 rồi PUT
      const reader = new FileReader();
      reader.onload = function(e) {
        courseData.image = e.target.result;
        fetch(`${API}/${editingCourseId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
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
      };
      reader.readAsDataURL(file);
    } else {
      // Nếu không có file mới, giữ nguyên ảnh cũ
      courseData.image = fileInput.dataset.current || '';
      fetch(`${API}/${editingCourseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
    }
  }

  // Nếu thêm sản phẩm mới
  else {
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const newCourse = {
          ...courseData,
          image: e.target.result,
          id: Date.now().toString()
        };
        fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCourse)
        })
          .then(res => res.json())
          .then(() => {
            alert("Thêm sản phẩm thành công!");
            fetchProducts();
            closeCourseModal.click();
          })
          .catch(err => console.error("Lỗi thêm:", err));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Vui lòng chọn hình ảnh sản phẩm!");
    }
  }
});
// Khai báo biến trạng thái sửa

// Khi bấm nút Sửa
courseList.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit-button");
  if (!editBtn) return;

  const id = editBtn.dataset.id;
  editingCourseId = id;

  // 🔹 Hiện modal + hiệu ứng
  courseModal.classList.remove("hidden");
  const modalContent = courseModal.querySelector("div");
  setTimeout(() => {
    modalContent.classList.remove("scale-90", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 10);

  // 🔹 Lấy dữ liệu từ API và đổ vào form
  fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(course => {
      
      document.getElementById("course-id").value = course.id;
      document.getElementById("course-name").value = course.name;
      document.getElementById("course-price").value = course.price;
      document.getElementById("course-category").value = course.category;
      document.getElementById("course-hot").checked = course.hot;
      document.getElementById("course-description").value = course.description;

      // 🔹 Reset input file (vì không được set value ảnh)
      document.getElementById("course-image").value = "";
    })
    .catch(err => console.error("Lỗi tải dữ liệu sản phẩm:", err));
});
// Khi submit form, phân biệt thêm/sửa
// Khi submit form, phân biệt thêm/sửa
const openLogin=document.getElementById('open-login-modal')
const login_modal=document.getElementById('login-modal')
const close_login_modal=document.getElementById('close-login-modal')



// mo form
openLogin.addEventListener('click',()=>{
  login_modal.classList.remove('hidden')
 
})
 close_login_modal.addEventListener('click',()=>{
    login_modal.classList.add("hidden")
  })