export function Footer(){
  if(!document.querySelector('footer')){
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
}