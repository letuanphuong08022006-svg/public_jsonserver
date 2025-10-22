const API = "http://localhost:3000/users";
const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // Tạo user mới
  const newUser = {
    id: Date.now().toString(),
    username,
    email,
    password
  };

  // Gửi lên server
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  });

  if (res.ok) {
    alert("Đăng ký thành công!");
    window.location.href = "index.html";
  } else {
    alert("Đăng ký thất bại!");
  }
});
