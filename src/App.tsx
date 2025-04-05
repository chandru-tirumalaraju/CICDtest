import React, { useState } from 'react';
import { Trophy } from 'lucide-react';

// Define types for our quiz data
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

interface PersonQuiz {
  name: string;
  questions: Question[];
}

// Quiz data for each person
const quizData: PersonQuiz[] = [
  {
    name: "Alice",
    questions: [
      {
        id: 1,
        text: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correctAnswer: "Paris"
      },
      {
        id: 2,
        text: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
      }
    ]
  },
  {
    name: "Bob",
    questions: [
      {
        id: 1,
        text: "Which element has the symbol 'Au'?",
        options: ["Silver", "Gold", "Copper", "Iron"],
        correctAnswer: "Gold"
      },
      {
        id: 2,
        text: "What is the largest mammal?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
      }
    ]
  },
  {
    name: "Charlie",
    questions: [
      {
        id: 1,
        text: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
        correctAnswer: "Da Vinci"
      },
      {
        id: 2,
        text: "Which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: "1945"
      }
    ]
  }
];

function App() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const handlePersonSelect = (name: string) => {
    setSelectedPerson(name);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answer: string) => {
    const currentQuiz = quizData.find(quiz => quiz.name === selectedPerson);
    if (!currentQuiz) return;

    const isCorrect = answer === currentQuiz.questions[currentQuestionIndex].correctAnswer;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const getRewardImage = () => {
    if (correctAnswers === 2) {
      return "https://images.unsplash.com/photo-1601024445121-e294d33f47db?w=500&auto=format";
    } else if (correctAnswers === 1) {
      return "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?w=500&auto=format";
    }
    return null;
  };

  const renderQuiz = () => {
    const currentQuiz = quizData.find(quiz => quiz.name === selectedPerson);
    if (!currentQuiz) return null;

    if (quizCompleted) {
      const rewardImage = getRewardImage();
      return (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="mb-4">You got {correctAnswers} correct answers!</p>
          {rewardImage && (
            <img 
              src={rewardImage} 
              alt="Reward" 
              className="rounded-lg shadow-lg mx-auto max-w-md"
            />
          )}
          <button
            onClick={() => setSelectedPerson(null)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Another Quiz
          </button>
        </div>
      );
    }

    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Question {currentQuestionIndex + 1}</h2>
        <p className="mb-4">{currentQuestion.text}</p>
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className="w-full p-3 text-left rounded bg-white border border-gray-200 hover:bg-gray-50"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        {!selectedPerson ? (
          <div>
            <div className="flex justify-center mb-6">
              <Trophy size={48} className="text-yellow-500" />
            </div>
            <h1 className="text-2xl font-bold text-center mb-6">Choose a Quiz</h1>
            <div className="space-y-2">
              {quizData.map((quiz) => (
                <button
                  key={quiz.name}
                  onClick={() => handlePersonSelect(quiz.name)}
                  className="w-full p-4 text-left rounded bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  {quiz.name}'s Quiz
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6">{selectedPerson}'s Quiz</h1>
            {renderQuiz()}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;