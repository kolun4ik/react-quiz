import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswerList from './ActiveList/AnswersList'

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>2.</strong>&nbsp;
                { props.question }
            </span>
            <small>4 из 12</small>
        </p>
        <AnswerList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
);

export default ActiveQuiz;