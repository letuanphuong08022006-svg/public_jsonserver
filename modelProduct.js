export class Product {
  constructor(id, name, price, image, category, hot, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.category = category;
    this.hot = hot;
    this.description = description;
  }
  renderAdmin() {
      return `
<tr class="bg-white hover:bg-orange-50 transition-all duration-200 shadow-sm rounded-lg">
    <td class="py-3 px-4 font-medium text-gray-700">${this.id}</td>
    <td class="py-3 px-4 font-semibold text-gray-800">${this.name}</td>
    <td class="py-3 px-4 text-orange-500 font-bold">${this.price.toLocaleString()}₫</td>
    <td class="py-3 px-4">
        <img src="${this.image}" alt="${this.name}" class="w-16 h-16 object-cover rounded-lg shadow-sm">
    </td>
    <td class="py-3 px-4">
        ${this.category || ''} <!-- 🔹 Thêm danh mục -->
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