export function Header(){
  if(!document.querySelector('header')){
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

        <!-- Search -->
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
          <a href="login.html" class="text-gray-600 hover:text-orange-500 font-semibold transition">Đăng nhập</a>
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
          <li><a href="product.html?category=1" data-category-id="1" class="block px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition">Điện thoại</a></li>
          <li><a href="product.html?category=2" data-category-id="2" class="block px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition">Laptop</a></li>
          <li><a href="product.html?category=3" data-category-id="3" class="block px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition">Phụ kiện</a></li>
          <li><a href="#" class="block px-4 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition">Liên hệ</a></li>
        </ul>
      </nav>
    </header>
    `;
    document.body.prepend(header);
  }
}