// ==========================================================================
// 1. TÓM CÁC PHẦN TỬ ĐIỀU KHIỂN MENU (DOM SELECTION)
// ==========================================================================
const dialogMenu = document.getElementById("mobileDialog");
const openMenuBtn = document.querySelector(".header__burger-btn");
const closeMenuBtn = document.querySelector(".mobile-menu__close-btn");

// ==========================================================================
// 2. CÁC HÀM XỬ LÝ ĐÓNG / MỞ (FUNCTIONS)
// ==========================================================================

// Hàm mở menu mượt mà
openMenuBtn.addEventListener("click", () => {
  dialogMenu.showModal();
});

// Hàm đóng menu chuẩn xác
const closeNavbar = () => {
  // 👑 TỐI ƯU: Chỉ chạy lệnh đóng nếu dialog THỰC SỰ đang mở (Chống xung đột hiệu ứng)
  if (dialogMenu.hasAttribute("open")) {
    dialogMenu.close();
  }
};

closeMenuBtn.addEventListener("click", closeNavbar);

// ==========================================================================
// 3. TÍNH NĂNG THÔNG MINH: CLICK BACKDROP TỰ ĐỘNG ĐÓNG
// ==========================================================================
dialogMenu.addEventListener("click", (event) => {
  const rect = dialogMenu.getBoundingClientRect();

  const isClickOutside =
    event.clientX < rect.left || // Click lệch về bên trái của hộp
    event.clientX > rect.right || // Click lệch về bên phải của hộp
    event.clientY < rect.top || // Click lệch lên trên của hộp
    event.clientY > rect.bottom; // Click lệch xuống dưới của hộp

  if (isClickOutside) {
    closeNavbar();
  }
});

// ==========================================================================
// 4. BỘ GIÁM SÁT KÍCH THƯỚC (RESIZE OBSERVER) - PHIÊN BẢN SIÊU NHẸ TIẾT KIỆM PIN
// ==========================================================================
const layoutObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    // Lấy chiều rộng vùng nhìn thấy của trình duyệt (Viewport Width)
    const currentWidth = entry.contentRect.width;

    // Nếu màn hình phình to ra Desktop và menu dọc vẫn đang mở thì mới đóng
    if (currentWidth >= 768 && dialogMenu.hasAttribute("open")) {
      setTimeout(() => {
        closeNavbar();
      }, 0);
    }
  }
});

// Tối ưu: Quan sát thẻ HTML (documentElement) thay vì thẻ body để tránh bị kích hoạt oan khi cuộn trang
layoutObserver.observe(document.documentElement);
