import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

import { randomWord } from './words.js';

//import AlphaButtons from './AlphaButtons';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.restartGame = this.restartGame.bind(this);   
    this.guessedWord = this.guessedWord.bind(this);      
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ));
  }
  
  restartGame() {
    this.setState((st) => {
      return {nWrong: 0, guessed: new Set(), answer: randomWord()}
    });
  }
  
  handleClick(evt) {
    this.restartGame();
  }

  /** render: render game */
  render() {
        
    let content = 
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} wrong guesses`} />
        <p className="Hangman-num-wrong">{`Number wrong: ${this.state.nWrong}`}</p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p className='Hangman-btns'>{this.generateButtons()}</p>
      </div>
      
      if(this.guessedWord().join('') === this.state.answer) {
        content = <p>You win!</p>
      }
      else if(this.state.nWrong >= this.props.maxWrong) {
        content =
          <div>
            <h1>{`Correct word: ${this.state.answer}`}</h1>
            <h2>You lose:(</h2>
          </div>        
      }
    
    return (
      <div>
       {content}
       <button className="Hangman-reset-button" onClick={this.handleClick}>Restart Game</button>
      </div>
    );
  }
}

export default Hangman;
