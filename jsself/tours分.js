document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.quiz-question');
    const options = document.querySelectorAll('.quiz-option');
    const scoreDisplay = document.getElementById('quiz-score');
    const progressBar = document.querySelector('.progress');
    const restartBtn = document.getElementById('restart-quiz');
    let currentQuestion = 0;
    let score = 0;
    const totalQuestions = questions.length;
    
    // 初始化測驗
    function initQuiz() {
        currentQuestion = 0;
        score = 0;
        scoreDisplay.textContent = score;
        progressBar.style.width = '0%';
        
        questions.forEach((question, index) => {
            question.classList.remove('active');
            if(index === 0) question.classList.add('active');
            
            const feedback = question.querySelector('.feedback');
            feedback.style.display = 'none';
            
            const options = question.querySelectorAll('.quiz-option');
            options.forEach(option => {
                option.classList.remove('correct-selected', 'incorrect-selected');
            });
        });
        
        document.querySelector('.quiz-result').style.display = 'none';
    }
    
    // 顯示當前問題
    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.toggle('active', i === index);
        });
    }
    
    // 處理選項點擊
    options.forEach(option => {
        option.addEventListener('click', function() {
            const question = this.closest('.quiz-question');
            const options = question.querySelectorAll('.quiz-option');
            const feedback = question.querySelector('.feedback');
            const isCorrect = this.getAttribute('data-correct') === 'true';
            
            // 禁用所有選項
            options.forEach(opt => {
                opt.style.pointerEvents = 'none';
            });
            
            // 標記選擇的選項
            if(isCorrect) {
                this.classList.add('correct-selected');
                score++;
                scoreDisplay.textContent = score;
                question.querySelector('.correct-feedback').style.display = 'block';
            } else {
                this.classList.add('incorrect-selected');
                // 標記正確答案
                const correctOption = question.querySelector('[data-correct="true"]');
                correctOption.classList.add('correct-selected');
                question.querySelector('.incorrect-feedback').style.display = 'block';
            }
            
            // 更新進度條
            progressBar.style.width = `${(score / totalQuestions) * 100}%`;
            
            // 顯示反饋
            feedback.style.display = 'block';
            
            // 延遲後進入下一題或顯示結果
            setTimeout(() => {
                currentQuestion++;
                if(currentQuestion < totalQuestions) {
                    showQuestion(currentQuestion);
                } else {
                    showResult();
                }
            }, 1500);
        });
    });
    
    // 顯示結果
    function showResult() {
        document.querySelector('.quiz-result').style.display = 'block';
    }
    
    // 重新開始測驗
    restartBtn.addEventListener('click', initQuiz);
    
    // 初始化測驗
    initQuiz();
});