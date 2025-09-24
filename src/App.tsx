import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Trophy, CheckCircle, XCircle } from 'lucide-react';

const quizData = [
  { q: "Q1. In the Confusion Matrix, what does the value 50 represent?", a: "Spam → Spam", b: "Ham → Spam", c: "Spam → Ham", d: "Ham → Ham", ans: "B" },
  { q: "Q2. Why is the TF-IDF score of 'the' so low?", a: "It is very rare", b: "It appears in almost every document", c: "It is a spam keyword", d: "It is punctuation", ans: "B" },
  { q: "Q3. In Bag of Words frequency, which word is most frequent?", a: "Free", b: "Offer", c: "Click", d: "Win", ans: "D" },
  { q: "Q4. Why do bigrams like 'win prize' help?", a: "They reduce dataset size", b: "They capture context", c: "They remove stop words", d: "They improve speed", ans: "B" },
  { q: "Q5. Ensemble Voting: if two models predict Spam and one predicts Ham, what will the ensemble predict?", a: "Ham", b: "Spam", c: "Random", d: "None", ans: "B" },
  { q: "Q6. What issue does the pie chart showing 4825 Ham vs 747 Spam indicate?", a: "Overfitting", b: "Class imbalance", c: "Underfitting", d: "Noise", ans: "B" },
  { q: "Q7. Model Accuracy: LR=0.96, NB=0.94, RF=0.95. Which model is best?", a: "LR", b: "NB", c: "RF", d: "All equal", ans: "A" },
  { q: "Q8. Why is precision important in spam detection?", a: "To avoid false positives", b: "To reduce training time", c: "To balance dataset", d: "To improve accuracy", ans: "A" },
  { q: "Q9. What does the ROC curve show?", a: "Dataset size", b: "Trade-off between TPR & FPR", c: "Accuracy", d: "Feature importance", ans: "B" },
  { q: "Q10. What problem is shown when training accuracy increases but validation accuracy drops?", a: "Overfitting", b: "Underfitting", c: "Class imbalance", d: "Noise", ans: "A" },
  { q: "Q11. Random Forest Feature Importance shows highest importance for which word?", a: "Offer", b: "Free", c: "Win", d: "Click", ans: "B" },
  { q: "Q12. Why use cross-validation?", a: "Faster training", b: "Reliable performance estimate", c: "Remove stop words", d: "Reduce noise", ans: "B" },
  { q: "Q13. Hyperparameter Tuning: Which C value gives best accuracy (0.01,0.1,1,10)?", a: "0.01", b: "0.1", c: "1", d: "10", ans: "C" },
  { q: "Q14. In the ML Pipeline, which step converts text into numeric features?", a: "Text", b: "TF-IDF", c: "Model", d: "Prediction", ans: "B" },
  { q: "Q15. In deep learning loss curves, what does decreasing validation loss mean?", a: "Overfitting", b: "Learning is improving", c: "Noise", d: "Imbalance", ans: "B" },
  { q: "Q16. Why do 'free' and 'prize' connect in transformer attention?", a: "Stop words", b: "Context relevance", c: "Random edges", d: "Same length", ans: "B" },
  { q: "Q17. In BERT tokenization, what does '##' mean?", a: "Start of sentence", b: "Subword continuation", c: "End of word", d: "Stop word", ans: "B" },
  { q: "Q18. Why is GPU faster than CPU for training?", a: "More RAM", b: "Parallel matrix computation", c: "Smaller model", d: "Less data", ans: "B" },
  { q: "Q19. What is the trade-off between ML and Deep Learning?", a: "ML is slower but better", b: "DL is simpler", c: "ML is faster, DL more powerful", d: "Both same", ans: "C" },
  { q: "Q20. In deployment pipeline, which step involves stop word removal?", a: "User Input", b: "Preprocessing", c: "Model", d: "Output", ans: "B" }
];

type QuizState = 'start' | 'quiz' | 'results';

interface UserAnswers {
  [key: number]: string;
}

function App() {
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleStartQuiz = () => {
    setQuizState('quiz');
    setStartTime(new Date());
    setCurrentQuestion(0);
    setUserAnswers({});
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishQuiz = () => {
    setEndTime(new Date());
    setQuizState('results');
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.forEach((question, index) => {
      if (userAnswers[index] === question.ans) {
        correct++;
      }
    });
    return correct;
  };

  const getTimeTaken = () => {
    if (startTime && endTime) {
      const timeDiff = endTime.getTime() - startTime.getTime();
      const minutes = Math.floor(timeDiff / 60000);
      const seconds = Math.floor((timeDiff % 60000) / 1000);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return '00:00';
  };

  const resetQuiz = () => {
    setQuizState('start');
    setCurrentQuestion(0);
    setUserAnswers({});
    setStartTime(null);
    setEndTime(null);
  };

  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  const score = calculateScore();
  const scorePercentage = (score / quizData.length) * 100;

  if (quizState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">ML/NLP Quiz</h1>
          <p className="text-gray-600 mb-6">
            Test your knowledge of Machine Learning and Natural Language Processing concepts with 20 carefully crafted questions.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Questions: 20</span>
              <span>Time: No limit</span>
            </div>
          </div>
          <button
            onClick={handleStartQuiz}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizState === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                <div className="text-2xl font-bold">{score}/{quizData.length}</div>
                <div className="text-blue-100">Correct Answers</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                <div className="text-2xl font-bold">{scorePercentage.toFixed(1)}%</div>
                <div className="text-purple-100">Accuracy</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                <div className="text-2xl font-bold">{getTimeTaken()}</div>
                <div className="text-green-100">Time Taken</div>
              </div>
            </div>
            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </button>
          </div>

          {/* Detailed Results */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Results</h3>
            <div className="space-y-6">
              {quizData.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.ans;
                const options = { A: question.a, B: question.b, C: question.c, D: question.d };
                
                return (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">{question.q}</h4>
                        <div className="space-y-1 text-sm">
                          <div className={`p-2 rounded ${userAnswer === question.ans ? 'bg-green-100 text-green-800' : userAnswer ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>
                            Your answer: {userAnswer ? `${userAnswer}) ${options[userAnswer as keyof typeof options]}` : 'Not answered'}
                          </div>
                          {userAnswer !== question.ans && (
                            <div className="p-2 rounded bg-green-100 text-green-800">
                              Correct answer: {question.ans}) {options[question.ans as keyof typeof options]}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizData[currentQuestion];
  const answeredQuestions = Object.keys(userAnswers).length;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {quizData.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              Answered: {answeredQuestions}/{quizData.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
            {currentQ.q}
          </h2>
          
          <div className="space-y-3">
            {[
              { key: 'A', value: currentQ.a },
              { key: 'B', value: currentQ.b },
              { key: 'C', value: currentQ.c },
              { key: 'D', value: currentQ.d }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => handleAnswerSelect(currentQuestion, option.key)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                  userAnswers[currentQuestion] === option.key
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <span className="font-semibold mr-3 text-gray-500">{option.key})</span>
                {option.value}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="text-sm text-gray-500">
            {userAnswers[currentQuestion] && (
              <span className="text-green-600 font-medium">✓ Answered</span>
            )}
          </div>

          {currentQuestion === quizData.length - 1 ? (
            <button
              onClick={handleFinishQuiz}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Finish Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;