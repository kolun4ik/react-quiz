import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';


class Quiz extends Component{

    state = {
        results: {}, // {[id]: 'success' or 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { [id]: 'success' or 'error'}
        quiz: [
            {
                id: 1,
                question: 'Сколько стоит килограмм гвоздей?',
                rightAnswerId: 2,
                answers: [
                    {text: '300 рублей', id: 1},
                    {text: '400 рублей', id: 2},
                    {text: '500 рублей', id: 3},
                    {text: 'Не знаю', id: 4},
                ]
            },
            {
                id: 2,
                question: 'Где купить кранбуксу',
                rightAnswerId: 4,
                answers: [
                    {text: 'На рынке', id: 1},
                    {text: 'В хозяйственном магазине', id: 2},
                    {text: 'В аптеке', id: 3},
                    {text: 'Не знаю', id: 4},
                ]
            }
        ],
    };

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState){
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if ( question.rightAnswerId === answerId ) {
            if (!results[question.id]) {
                results[question] = 'success';
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results,
            });
            const timeout = window.setTimeout(() => {
                if( this.isQuizFinished() ) {
                    this.setState({
                        isFinished: true,
                    });
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        activeState: null,
                    });
                }

                window.clearTimeout(timeout);
            }, 1000)

        }else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results,
            })
        }
    };

    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {},
        })
    };

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы!</h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                             />
                            :  <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[0].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLenght={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        );
    }
}
export default Quiz;