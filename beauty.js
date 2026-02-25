const daysData = [
    { day: 1, title: "Reset & Ghi nhận hiện tại", task: "Chụp 3 tấm ảnh. Giặt vỏ gối, chăn, cọ trang điểm.", instruction: "Lý do: Vỏ gối bẩn gây mụn ẩn.", advice: "Bước đầu tiên luôn quan trọng nhất!" },
    { day: 2, title: "Trút bỏ sừng chết", task: "Tẩy da chết mặt, môi, body.", instruction: "Hướng dẫn: Mặt BHA/AHA. Môi đường+mật ong.", advice: "Làn da mới đang ẩn giấu dưới tế bào chết!" },
    { day: 3, title: "Bơm nước cho da", task: "Đắp mặt nạ cấp ẩm.", instruction: "Hướng dẫn: Mặt nạ HA hoặc sữa chua + yến mạch 15p.", advice: "Da đủ nước là bí quyết cốt lõi để trẻ trung." },
    { day: 4, title: "Phục hồi Tóc", task: "Ủ tóc chuyên sâu.", instruction: "Hướng dẫn: Ủ tóc bằng dầu dừa/oliu 30p.", advice: "Mái tóc bồng bềnh sẽ nâng tầm nhan sắc!" },
    { day: 5, title: "Mở lỗ chân lông", task: "Xông hơi mặt.", instruction: "Hướng dẫn: Xông với sả, chanh 5-7p.", advice: "Da bạn đang được thở đấy!" },
    { day: 6, title: "Ngày không đường", task: "Cắt hoàn toàn đường.", instruction: "Lý do: Đường phá hủy collagen.", advice: "Làn da của bạn đang thầm cảm ơn bạn đó!" },
    { day: 7, title: "Massage thon gọn", task: "Massage hạch bạch huyết.", instruction: "Hướng dẫn: Vuốt từ cằm lên tai, vuốt xuống cổ.", advice: "Gương mặt sẽ sắc nét hơn rất nhiều." },
    { day: 8, title: "Cửa sổ tâm hồn", task: "Giảm thâm mắt, tỉa lông mày.", instruction: "Hướng dẫn: Đắp 2 túi trà lạnh lên mắt.", advice: "Chân mày gọn thay đổi toàn bộ ngũ quan!" },
    { day: 9, title: "Tỏa sáng nụ cười", task: "Chăm sóc răng miệng.", instruction: "Hướng dẫn: Dùng chỉ nha khoa, ngậm nước muối.", advice: "Nụ cười tự tin là trang sức lấp lánh nhất." },
    { day: 10, title: "Tẩy da chết vòng 2", task: "Lặp lại tẩy da chết như Ngày 2.", instruction: "Lý do: Duy trì bề mặt da láng mịn.", advice: "Routine làm đẹp đã thành thói quen rồi!" },
    { day: 11, title: "Nạp vitamin", task: "Uống nước ép/sinh tố.", instruction: "Hướng dẫn: Xay cà rốt + cà chua + táo.", advice: "Vẻ đẹp luôn bắt nguồn từ bên trong!" },
    { day: 12, title: "Chăm sóc tiểu tiết", task: "Cắt móng, dưỡng da tay chân.", instruction: "Hướng dẫn: Bôi kem dưỡng dày trước khi ngủ.", advice: "Người tinh tế chăm sóc những chi tiết nhỏ nhất." },
    { day: 13, title: "Combo Spa", task: "Xông hơi + Đắp mặt nạ.", instruction: "Hướng dẫn: Xông hơi xong đắp mặt nạ luôn.", advice: "Phần thưởng cho những nỗ lực của bạn!" },
    { day: 14, title: "Thư giãn thần thái", task: "Giải tỏa căng thẳng cơ mặt.", instruction: "Hướng dẫn: Dành 10p nhắm mắt, thả lỏng trán, hàm.", advice: "Gương mặt không căng thẳng là đẹp nhất." },
    { day: 15, title: "Chạm đích", task: "Chụp lại 3 bức ảnh.", instruction: "Hướng dẫn: Ghép ảnh lại và xem sự thay đổi!", advice: "Kỷ luật 15 ngày qua là điều đáng tự hào nhất! ✨" }
];

let currentDay = parseInt(localStorage.getItem('glowUpDay')) || 1;
let viewingDay = currentDay;

const tickSound = document.getElementById('tick-sound');
const tadaSound = document.getElementById('tada-sound');
const dayCompleteSound = document.getElementById('day-complete-sound');

const themeToggleBtn = document.getElementById('theme-toggle');
let currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
themeToggleBtn.innerText = currentTheme === 'dark' ? '☀️' : '🌙';

themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    themeToggleBtn.innerText = currentTheme === 'dark' ? '☀️' : '🌙';
});

function loadDayContent() {
    // 1. Nếu đã qua ngày 15 -> Ẩn thẻ ngày, ẩn việc cố định, hiện thông báo chúc mừng
    if (viewingDay > 15) {
        document.getElementById('daily-card').classList.add('hidden');
        document.getElementById('congrats-message').classList.remove('hidden');
        
        // Cố gắng tìm và ẩn thẻ Việc cố định (có check an toàn để không bị lỗi trắng trang)
        let fixedTasksNode = document.getElementById('fixed-tasks');
        if (fixedTasksNode) {
            fixedTasksNode.classList.add('hidden');
        }
        
        updateProgressBar(15);
        return;
    }

    // 2. Nếu đang ở ngày 1 -> 15: Đảm bảo hiện lại mọi thứ bình thường
    let fixedTasksNode = document.getElementById('fixed-tasks');
    if (fixedTasksNode) {
        fixedTasksNode.classList.remove('hidden');
    }
    document.getElementById('daily-card').classList.remove('hidden');
    document.getElementById('congrats-message').classList.add('hidden');

    // 3. Tải dữ liệu của ngày hiện tại vào các thẻ HTML
    const data = daysData[viewingDay - 1];
    document.getElementById('day-number').innerText = `Ngày ${data.day}/15`;
    document.getElementById('day-title').innerText = data.title;
    document.getElementById('day-task').innerText = data.task;
    document.getElementById('day-instruction').innerText = data.instruction;
    document.getElementById('day-advice').innerText = `“${data.advice}”`;

    // 4. Cập nhật các thành phần khác
    updateButtons();
    updateProgressBar(viewingDay - 1);
    loadChecklist(); 
}

function updateProgressBar(daysCompleted) {
    const percent = Math.round((daysCompleted / 15) * 100);
    document.getElementById('progress-bar').style.width = percent + '%';
    document.getElementById('progress-text').innerText = `${percent}% hoàn thành lộ trình`;
}

// HÀM RESET DẤU TÍCH VÀ LƯU TRỮ CHUẨN XÁC
function loadChecklist() {
    const checkboxes = document.querySelectorAll('.task-cb');
    
    // BƯỚC 1: Dọn sạch sẽ trạng thái cũ trên màn hình trước khi làm gì khác
    checkboxes.forEach(cb => {
        cb.checked = false;
        cb.onchange = null; // Xóa sạch sự kiện cũ để tránh lỗi lưu chồng chéo
    });

    // BƯỚC 2: Lấy dữ liệu của đúng ngày đang xem từ LocalStorage
    let savedState = JSON.parse(localStorage.getItem(`beautyChecklist_Day${viewingDay}`));
    
    // Nếu chưa có dữ liệu (chuyển sang ngày mới), tạo mảng 4 ô trắng tinh
    if (!savedState || savedState.length !== 4) {
        savedState = [false, false, false, false];
    }
    
    // BƯỚC 3: Gán trạng thái và gắn lại âm thanh
    checkboxes.forEach((cb, index) => {
        cb.checked = savedState[index]; 
        
        cb.onchange = () => {
            savedState[index] = cb.checked;
            localStorage.setItem(`beautyChecklist_Day${viewingDay}`, JSON.stringify(savedState));
            if(cb.checked) {
                tickSound.currentTime = 0;
                tickSound.play().catch(e => console.log(e));
            }
        };
    });
}

function updateButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentBtn = document.getElementById('current-btn');

    if (viewingDay === 1) prevBtn.classList.add('hidden');
    else prevBtn.classList.remove('hidden');

    if (viewingDay < currentDay) {
        currentBtn.classList.remove('hidden');
        nextBtn.innerText = "Xem ngày tiếp theo ➡";
        nextBtn.style.background = "var(--border-color)";
        nextBtn.style.color = "var(--text-main)";
    } else {
        currentBtn.classList.add('hidden');
        nextBtn.innerText = "Xong! Tiếp theo 🚀";
        nextBtn.style.background = "linear-gradient(135deg, var(--primary), var(--accent))";
        nextBtn.style.color = "white";
    }
}

function prevDay() { if (viewingDay > 1) { viewingDay--; loadDayContent(); } }
function goToCurrent() { viewingDay = currentDay; loadDayContent(); }

function nextDay() {
    const nextBtn = document.getElementById('next-btn');

    // Chỉ kiểm tra dấu tích nếu người dùng đang thực sự ở ngày hiện tại
    if (viewingDay === currentDay) {
        const checkboxes = document.querySelectorAll('.task-cb');
        let allChecked = true;
        
        checkboxes.forEach(cb => {
            if (!cb.checked) allChecked = false;
        });
        
        if (!allChecked) {
            alert("⚠️ Cảnh báo: Bạn phải tích (✔️) đủ 4 quy tắc cơ bản trước khi qua ngày mới nhé!");
            return; 
        }

        // Khóa tạm nút bấm để tránh người dùng click đúp 2 lần liên tục
        nextBtn.disabled = true;

        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        dayCompleteSound.currentTime = 0;
        dayCompleteSound.play().catch(e => console.log(e));

        currentDay++;
        localStorage.setItem('glowUpDay', currentDay);

        // Hiển thị huy hiệu
        if (currentDay === 6) { 
            showBadge("🥉", "Chiến Binh Khởi Đầu", "Chúc mừng bạn đã xuất sắc vượt qua 5 ngày đầu tiên!");
            tadaSound.currentTime = 0; tadaSound.play();
        } else if (currentDay === 11) { 
            showBadge("🥈", "Trùm Kỷ Luật", "10 ngày kiên trì! Bạn đang làm quá tuyệt vời!");
            tadaSound.currentTime = 0; tadaSound.play();
        } else if (currentDay === 16) { 
            showBadge("🏆", "Đỉnh Cao Nhan Sắc", "15 ngày kỷ luật đã biến bạn thành phiên bản rạng rỡ và tự tin nhất!");
            tadaSound.currentTime = 0; tadaSound.play();
        }
    } else {
        nextBtn.disabled = true;
    }
    
    // Đợi hiệu ứng xong mới chuyển ngày
    setTimeout(() => {
        viewingDay++;
        loadDayContent();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        nextBtn.disabled = false; // Mở khóa nút bấm lại
    }, 500);
}

function showBadge(icon, title, desc) {
    document.getElementById('badge-icon').innerText = icon;
    document.getElementById('badge-title').innerText = title;
    document.getElementById('badge-desc').innerText = desc;
    document.getElementById('badge-modal').classList.remove('hidden');
}
function closeModal() { document.getElementById('badge-modal').classList.add('hidden'); }

function resetProgress() {
    if(confirm("Bạn có chắc muốn xóa toàn bộ tiến trình Nhan Sắc không?")) {
        currentDay = 1; viewingDay = 1;
        Object.keys(localStorage).forEach(key => {
            if (key.includes('glowUp') || key.includes('beautyChecklist')) localStorage.removeItem(key);
        });
        document.getElementById('daily-card').classList.remove('hidden');
        document.getElementById('congrats-message').classList.add('hidden');
        loadDayContent();
    }
}
window.onload = loadDayContent;

// --- TÍNH NĂNG CHIA SẺ MẠNG XÃ HỘI (NHAN SẮC) ---
function shareAchievement() {
    const shareData = {
        title: '15 Ngày Thay Đổi Bản Thân',
        text: '🎉 Mình vừa hoàn thành xuất sắc thử thách 15 Ngày Lột Xác Nhan Sắc! Cùng tham gia với mình để trở thành phiên bản tự tin hơn nhé! ✨',
        url: window.location.href
    };
    
    // Nếu dùng trên điện thoại, sẽ mở menu share (Zalo, Insta, Mess...)
    if (navigator.share) {
        navigator.share(shareData).catch(console.error);
    } else {
        // Nếu dùng trên máy tính không hỗ trợ share, copy link thay thế
        navigator.clipboard.writeText(shareData.text + " " + shareData.url);
        alert("Đã copy nội dung! Bạn có thể dán (Ctrl+V) để khoe lên Facebook/Zalo nhé.");
    }
}

function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}