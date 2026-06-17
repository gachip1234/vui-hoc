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
// 4. BỘ GIÁM SÁT KÍCH THƯỚC (RESIZE OBSERVER) - BẢN FIX KẸT LỚP MỜ BACKDROP
// ==========================================================================
const layoutObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const currentWidth = entry.contentRect.width;

    if (currentWidth >= 768 && dialogMenu.hasAttribute("open")) {
      // 👑 Sử dụng requestAnimationFrame để đồng bộ nhịp thở của JS với tốc độ dựng hình của CSS
      requestAnimationFrame(() => {
        closeNavbar();
      });
      console.log(
        "🛡️ Đã dọn sạch Dialog và Backdrop để trả lại giao diện Desktop!",
      );
    }
  }
});

layoutObserver.observe(document.documentElement);

// ==========================================================================
// 5. TÍNH NĂNG LIVE SEARCH FILTER (BẢN TOÀN DIỆN CÓ THÔNG BÁO)
// ==========================================================================
const searchInput = document.getElementById("searchCourse");
const courseCards = document.querySelectorAll(".courses__card");
const noResultMsg = document.getElementById("noResult"); // Tóm thằng thông báo ẩn

searchInput.addEventListener("input", (event) => {
  const keyword = event.target.value.trim().toLowerCase();

  // 👑 Biến đếm số lượng khóa học tìm thấy
  let countVisible = 0;

  courseCards.forEach((card) => {
    const cardAllText = card.textContent.toLowerCase();

    if (cardAllText.includes(keyword)) {
      card.style.display = "flex";
      countVisible++; // Thấy một ông khớp thì tăng biến đếm lên 1
    } else {
      card.style.display = "none";
    }
  });

  // 👑 Kiểm tra: Nếu biến đếm bằng 0 thì hiện thông báo lỗi, ngược lại thì ẩn đi
  if (countVisible === 0) {
    noResultMsg.style.display = "block";
  } else {
    noResultMsg.style.display = "none";
  }
});

// ==========================================================================
// 6. TÍNH NĂNG THÊM KHÓA HỌC MỚI (DYNAMIC ADD COMPONENT)
// ==========================================================================

// 1. Tóm các phần tử Form và vùng chứa danh sách khóa học
const addForm = document.getElementById("addCourseForm");
const coursesContainer = document.querySelector(".courses"); // Thẻ cha bọc các card

addForm.addEventListener("submit", (event) => {
  // 👑 Quan trọng: Chặn trình duyệt reload lại trang
  event.preventDefault();

  // 2. Lấy giá trị từ các ô nhập liệu
  const titleValue = document.getElementById("newCourseTitle").value.trim();
  const descValue = document.getElementById("newCourseDesc").value.trim();

  // 3. Dựng khung xương HTML cho card mới (Dùng ảnh mặc định tạm thời)
  const newCardHTML = `
    <article class="courses__card">
      <img
        class="courses__card-img"
        src="./src/img/course-01.png"
        alt="${titleValue}"
      />
      <h3 class="courses__card-title">${titleValue}</h3>
      <p class="courses__card-desc">${descValue}</p>
      <button class="courses__card-btn">Vào học ngay</button>
    </article>
  `;

  // 4. Bắn cái card mới này vào ĐẦU danh sách khóa học (ngay dưới chữ Khóa học nổi bật)
  // 'afterbegin' có nghĩa là chèn vào vị trí đầu tiên bên trong container
  coursesContainer.insertAdjacentHTML("afterbegin", newCardHTML);

  // 5. Xóa sạch chữ trong form sau khi thêm thành công
  addForm.reset();

  console.log(`🎉 Đã thêm thành công khóa học mới: ${titleValue}`);
});
