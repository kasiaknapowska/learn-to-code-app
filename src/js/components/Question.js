import React, {useState, useEffect} from "react";
import classNames from "classnames";

export default function Question({id, question, answers, handleForm, count, correctAnswers, showCorrectAnswers}) {
const [singleCorrectAnswer, setSingleCorrectAnswer] = useState("")

    useEffect(() => {
        const values = Object.values(correctAnswers)
        const keys = Object.keys(correctAnswers)
        const index = keys.indexOf(String(id));

       if (showCorrectAnswers) {
            setSingleCorrectAnswer(values[index])
       }
       
    }, [showCorrectAnswers, correctAnswers, id])
  
    
    return (  
        <>
        <h2 className="question">{count}. {question}</h2>
            <label className={classNames({correct: singleCorrectAnswer === "answer_a_correct"})}><input type="radio" name={id} value="answer_a" onChange={handleForm}/><span className="radio_circle"></span>{answers.answer_a}</label>
            <label className={classNames({correct: singleCorrectAnswer === "answer_b_correct"})}><input type="radio" name={id} value="answer_b" onChange={handleForm}/><span className="radio_circle"></span>{answers.answer_b}</label>
            {answers.answer_c && <label className={classNames({correct: singleCorrectAnswer === "answer_c_correct"})}><input type="radio" name={id} value="answer_c" onChange={handleForm}/><span className="radio_circle"></span>{answers.answer_c}</label>}
            {answers.answer_d && <label className={classNames({correct: singleCorrectAnswer === "answer_d_correct"})}><input type="radio" name={id} value="answer_d" onChange={handleForm}/><span className="radio_circle"></span>{answers.answer_d}</label>}
            {answers.answer_e && <label className={classNames({correct: singleCorrectAnswer === "answer_e_correct"})}><input type="radio" name={id} value="answer_e" onChange={handleForm}/><span className="radio_circle"></span>{answers.answer_e}</label>}
            {answers.answer_f && <label className={classNames({correct: singleCorrectAnswer === "answer_f_correct"})}><input type="radio" name={id} value="answer_f" onChange={handleForm}/><span className="radio_circle"></span>{answers.answer_f}</label>}
        </>
    )
}