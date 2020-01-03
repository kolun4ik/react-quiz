import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';


class Quiz extends Component{

    state = {
        quiz: [
            {
                question: 'Сколько стоит килограмм гвоздей?',
                rightAnswerId: 2,
                answers: [
                    {text: '300 рублей', id: 1},
                    {text: '400 рублей', id: 2},
                    {text: '500 рублей', id: 3},
                    {text: 'Не знаю', id: 4},
                ]
            }
        ],
    };

    onAnswerClickHandler = (answerId) => {
        console.log('-->', 'answer Id', answerId);
    };

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы!</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[0].answers}
                        question={this.state.quiz[0].question}
                        onAnswerClick={this.onAnswerClickHandler}
                    />
                </div>
            </div>
        );
    }
}
export default Quiz;