export class Cart {
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