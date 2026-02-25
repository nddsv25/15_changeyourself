const daysData = [
    { day: 1, title: "Lấy số đo & Dọn tủ lạnh", task: "Chụp 3 bức ảnh. Đo eo, đùi. Bỏ bim bim, đồ ngọt.", instruction: "Lý do: Để theo dõi thay đổi và bỏ cám dỗ.", advice: "Dọn rác tủ lạnh cũng là dọn rác tâm trí!" },
    { day: 2, title: "Đánh thức tim mạch", task: "15p Cardio (nhảy dây, Jumping Jacks).", instruction: "Hướng dẫn: Tập 45s, nghỉ 15s x 3 vòng.", advice: "Hơi thở gấp gáp là mỡ đang khóc nhè đó!" },
    { day: 3, title: "Siết vùng trung tâm", task: "Plank 3 hiệp.", instruction: "Hiệp 1: 30s. Hiệp 2: 45s. Hiệp 3: 1 phút.", advice: "Cơ bụng số 11 đang vẫy gọi!" },
    { day: 4, title: "Giải phóng vai gáy", task: "15p giãn cơ.", instruction: "Xoay vai, gập người chạm mũi chân.", advice: "Giãn cơ giúp bớt nhức mỏi sau khi ngồi học." },
    { day: 5, title: "Ngày Detox nhẹ", task: "Làm sạch hệ tiêu hóa.", instruction: "Sáng 1 ly chanh ấm. Ăn nhiều rau, giảm cơm.", advice: "Cảm nhận bụng nhẹ tênh vào cuối ngày nhé!" },
    { day: 6, title: "Xây dựng thân dưới", task: "Tập Squat và Lunge.", instruction: "3 hiệp Squat, 3 hiệp Lunge. Dồn lực vào gót.", advice: "Đau cơ đùi ngày mai là tín hiệu cực tốt." },
    { day: 7, title: "Nghỉ ngơi chủ động", task: "Vận động nhẹ nhàng.", instruction: "Đi bộ hoặc làm việc nhà 30p.", advice: "Cho cơ bắp một ngày nghỉ ngơi." },
    { day: 8, title: "Ngày của Protein", task: "Nạp đủ đạm.", instruction: "Ăn đủ ức gà, trứng, đậu phụ.", advice: "Ăn đúng chất quan trọng bằng việc tập!" },
    { day: 9, title: "Tăng tốc đốt mỡ", task: "15p HIIT.", instruction: "Mở video HIIT YouTube và tập theo.", advice: "15p cường độ cao bằng 1 tiếng đi bộ!" },
    { day: 10, title: "Điêu khắc thân trên", task: "Tập Push-up.", instruction: "3 hiệp, 10-12 cái. Có thể chống gối.", advice: "Bắp tay thon gọn mặc áo phông cực đẹp." },
    { day: 11, title: "Siết bụng vòng 2", task: "Nâng hạ chân và đạp xe.", instruction: "Nâng chân 15 cái x 3; Đạp xe 20 cái x 3.", advice: "Mỡ bụng dưới cứng đầu sắp biến mất!" },
    { day: 12, title: "Bữa tối Xanh", task: "Ăn tối cực nhẹ.", instruction: "Thay tinh bột bằng salad và trứng.", advice: "Sáng mai thức dậy bụng sẽ xẹp trông thấy!" },
    { day: 13, title: "Thử thách sức bền", task: "Mạch tập liên hoàn.", instruction: "20 Jumping Jacks -> 15 Squat -> 10 Pushup -> Plank 45s x 3.", advice: "Ngày mệt nhất cũng đốt calo nhiều nhất!" },
    { day: 14, title: "Lắng nghe cơ thể", task: "Massage thư giãn.", instruction: "Tắm nước ấm, tự massage bắp chân đùi.", advice: "Cảm ơn cơ thể vì đã đồng hành 14 ngày qua." },
    { day: 15, title: "Chạm đích", task: "Nghiệm thu kết quả.", instruction: "Mặc bộ đồ ngày 1, chụp ảnh đo eo.", advice: "Sự nhẹ nhàng lúc này là phần thưởng vô giá! ✨" }
];

let currentDay = parseInt(localStorage.getItem('fitnessDay')) || 1; 
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
    document.getElementById('progress-text').innerText = `${percent}% hoàn thành`;
}

// HÀM RESET DẤU TÍCH
function loadChecklist() {
    const checkboxes = document.querySelectorAll('.task-cb');
    let savedState = JSON.parse(localStorage.getItem(`fitnessChecklist_Day${viewingDay}`));
    
    // Nếu là ngày mới, trả về mảng chưa tích
    if (!savedState) {
        savedState = [false, false, false, false];
    }
    
    checkboxes.forEach((cb, index) => {
        cb.checked = savedState[index]; 
        
        cb.onchange = () => {
            savedState[index] = cb.checked;
            localStorage.setItem(`fitnessChecklist_Day${viewingDay}`, JSON.stringify(savedState));
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
    if (viewingDay === currentDay) {
        const checkboxes = document.querySelectorAll('.task-cb');
        let allChecked = true;
        checkboxes.forEach(cb => { if (!cb.checked) allChecked = false; });
        
        if (!allChecked) {
            alert("⚠️ Cảnh báo lười biếng: Bạn phải tích (✔️) đủ 4 quy tắc cơ bản trước khi qua ngày mới!");
            return;
        }

        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        dayCompleteSound.currentTime = 0;
        dayCompleteSound.play().catch(e => console.log(e));

        currentDay++;
        localStorage.setItem('fitnessDay', currentDay);

        if (currentDay === 6) {
            showBadge("🏅", "Tân Binh Độ Dáng", "Bạn đã sống sót qua 5 ngày đầu đau nhức. Tiếp tục nào!");
            tadaSound.currentTime = 0; tadaSound.play();
        } else if (currentDay === 11) {
            showBadge("🏋️", "Cỗ Máy Đốt Mỡ", "10 ngày kiên trì! Cơ thể bạn đang thay đổi rõ rệt!");
            tadaSound.currentTime = 0; tadaSound.play();
        } else if (currentDay === 16) {
            showBadge("🔥", "Chiến Thần Kỷ Luật", "15 ngày xuất sắc! Hãy nhìn vào gương và tự hào đi!");
            tadaSound.currentTime = 0; tadaSound.play();
        }
    }
    
    setTimeout(() => {
        // XÓA SẠCH DẤU TÍCH TRƯỚC KHI CHUYỂN NGÀY
        document.querySelectorAll('.task-cb').forEach(cb => cb.checked = false);
        viewingDay++;
        loadDayContent();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
}

function showBadge(icon, title, desc) {
    document.getElementById('badge-icon').innerText = icon;
    document.getElementById('badge-title').innerText = title;
    document.getElementById('badge-desc').innerText = desc;
    document.getElementById('badge-modal').classList.remove('hidden');
}

function closeModal() { document.getElementById('badge-modal').classList.add('hidden'); }

function resetProgress() {
    if(confirm("Xóa toàn bộ tiến trình độ dáng?")) {
        currentDay = 1; viewingDay = 1;
        Object.keys(localStorage).forEach(key => {
            if (key.includes('fitness')) localStorage.removeItem(key);
        });
        document.getElementById('daily-card').classList.remove('hidden');
        document.getElementById('congrats-message').classList.add('hidden');
        loadDayContent();
    }
}
window.onload = loadDayContent;

// --- TÍNH NĂNG CHIA SẺ MẠNG XÃ HỘI (CƠ THỂ) ---
function shareAchievement() {
    const shareData = {
        title: '15 Ngày Thay Đổi Bản Thân',
        text: '🔥 Mình vừa hoàn thành xuất sắc thử thách 15 Ngày Độ Dáng & Kỷ Luật! Quá tự hào về bản thân. Cùng tập với mình nhé! 💪',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData).catch(console.error);
    } else {
        navigator.clipboard.writeText(shareData.text + " " + shareData.url);
        alert("Đã copy nội dung! Bạn có thể dán (Ctrl+V) để khoe lên Facebook/Zalo nhé.");
    }
}

function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}