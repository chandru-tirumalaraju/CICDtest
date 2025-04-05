// Quiz data
const quizData = [
    {
        name: "Chandu",
        questions: [
            {
                id: 1,
                text: "What is the one thing Chandu Likes to do",
                options: ["Working", "Learning", "Movie"],
                correctAnswer: "Movie"
            },
            {
                id: 2,
                text: "Which profession does Chandu likes most",
                options: ["Engineer", "Writer", "Teacher"],
                correctAnswer: "Teacher"
            }
        ]
    }
];

class QuizApp {
    constructor() {
        this.app = document.getElementById('app');
        this.selectedPerson = null;
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.init();
    }

    init() {
        this.showPersonSelection();
    }

    showPersonSelection() {
        this.app.innerHTML = `
            <svg class="trophy-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
            <h1 class="title">Choose a Quiz</h1>
            <div id="person-buttons"></div>
        `;

        const buttonsContainer = document.getElementById('person-buttons');
        quizData.forEach(person => {
            const button = document.createElement('button');
            button.className = 'button';
            button.textContent = `${person.name}'s Quiz`;
            button.onclick = () => this.selectPerson(person.name);
            buttonsContainer.appendChild(button);
        });
    }

    selectPerson(name) {
        this.selectedPerson = name;
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.showQuestion();
    }

    showQuestion() {
        const currentQuiz = quizData.find(quiz => quiz.name === this.selectedPerson);
        const question = currentQuiz.questions[this.currentQuestionIndex];

        this.app.innerHTML = `
            <h1 class="title">${this.selectedPerson}'s Quiz</h1>
            <h2 class="question">Question ${this.currentQuestionIndex + 1}</h2>
            <p>${question.text}</p>
            <div id="options"></div>
        `;

        const optionsContainer = document.getElementById('options');
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'button';
            button.textContent = option;
            button.onclick = () => this.handleAnswer(option);
            optionsContainer.appendChild(button);
        });
    }

    handleAnswer(answer) {
        const currentQuiz = quizData.find(quiz => quiz.name === this.selectedPerson);
        const isCorrect = answer === currentQuiz.questions[this.currentQuestionIndex].correctAnswer;

        if (isCorrect) {
            this.correctAnswers++;
        }

        if (this.currentQuestionIndex < currentQuiz.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showQuestion();
        } else {
            this.showResults();
        }
    }

    getRewardImage() {
        const rewardImages = {
            Chandu: {
                2: "https://maheshwari-staticwebsite.s3.ap-south-1.amazonaws.com/Chandu1.jpeg", // Professional woman
                1: "https://maheshwari-staticwebsite.s3.ap-south-1.amazonaws.com/Chandu2.JPG"  // Casual portrait
            }
        };

        return rewardImages[this.selectedPerson]?.[this.correctAnswers] || null;
    }

    showResults() {
        const rewardImage = this.getRewardImage();
        this.app.innerHTML = `
            <h2 class="title">Quiz Completed!</h2>
            <div class="result">
                <p>You got ${this.correctAnswers} correct answers!</p>
                ${rewardImage ? `<img src="${rewardImage}" alt="Reward" class="reward-image">` : ''}
                <button class="button" onclick="quiz.showPersonSelection()">Try Another Quiz</button>
            </div>
        `;
    }
}

// Initialize the quiz
const quiz = new QuizApp();