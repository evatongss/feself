// 導航欄滾動效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        header.style.padding = '0.5rem 5%';
    } else {
        header.style.backgroundColor = '#2c3e50';
        header.style.padding = '1rem 5%';
    }
});

// 更多資訊按鈕點擊事件
document.querySelectorAll('.more-info').forEach(button => {
    button.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        alert(`更多關於 ${target} 的資訊將在此顯示。\n這是一個示例，實際應用中可以打開模態框或跳轉到詳細頁面。`);
    });
});

// 測驗互動功能
document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', function() {
        const questionDiv = this.closest('.quiz-question');
        const options = questionDiv.querySelectorAll('.quiz-option');
        
        // 移除所有選項的active類
        options.forEach(opt => {
            opt.classList.remove('correct', 'incorrect');
        });
        
        // 檢查答案
        if (this.classList.contains('correct')) {
            this.classList.add('correct');
            // 找到同一問題的其他選項並標記為不正確
            options.forEach(opt => {
                if (opt !== this && !opt.classList.contains('correct')) {
                    opt.classList.add('incorrect');
                }
            });
        } else {
            this.classList.add('incorrect');
            // 找到正確答案並標記
            questionDiv.querySelector('.correct').classList.add('correct');
        }
        
        // 計算分數
        updateQuizScore();
    });
});

function updateQuizScore() {
    const correctAnswers = document.querySelectorAll('.quiz-option.correct.correct');
    const totalQuestions = document.querySelectorAll('.quiz-question').length;
    document.getElementById('quiz-score').textContent = correctAnswers.length;
}

// 電子報表單提交
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    alert(`感謝您的訂閱！我們已將確認郵件發送至 ${email}`);
    this.reset();
});

// 圖片懶加載
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});