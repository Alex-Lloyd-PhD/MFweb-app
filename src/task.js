import React from 'react';
import Game from './game';
import Instructions from './instructions';
import Training from './training';
import Questions from './questions';

class Task extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      UserNo:1,
      num_training:1,
      slide: 1,
      transition:1,
      percentage_to_pass: 1, // percentage to pass the training and questions
      };

    this.nextTransition = this.nextTransition.bind(this);

    /* prevents page from going to the right/left when arrows are pressed .*/
    window.addEventListener('keydown', function(e) {
    if(e.keyCode === 37 && e.target === document.body) {
      e.preventDefault();
    }
    else if(e.keyCode === 39 && e.target === document.body) {
      e.preventDefault();
    }
    });
  }

  render(){

    console.log("slide", this.state.slide)

    if (this.state.transition === 1) {

      console.log("task: transition 1 - instructions")

      /* listens to keyboard presses.*/
      if (this.state.slide===22){
        document.removeEventListener("keydown", this._handleKeyDownArrows);
        document.addEventListener("keydown", this._handleKeyDownRightArrow);
      }

      else if (this.state.slide===0 || this.state.slide===1){
        document.removeEventListener("keydown", this._handleKeyDownArrows);
        document.addEventListener("keydown", this._handleKeyDownRightArrow);
      }

      else {
        document.removeEventListener("keydown", this._handleKeyDownRightArrow);
        document.addEventListener("keydown", this._handleKeyDownArrows);
        }

      return (
        <Instructions slide={this.state.slide}/>
      );
    }

    else if (this.state.transition === 2) {

      console.log("task: transition 2 - questions")

      document.removeEventListener("keydown", this._handleKeyDownArrows);

      return (
        <Questions UserNo={this.state.UserNo} questions_nb={5} nextTransition={this.nextTransition}/>
      );
    }

    if (this.state.transition === 3) {

      console.log("task: transition 3 - after questions instructions")

      document.addEventListener("keydown", this._handleKeyDownRightArrow);

      return (
        <Instructions slide={this.state.slide}/>
      );
    }

    else if (this.state.transition === 4) {

      console.log("task: transition 4 - training")

      document.removeEventListener("keydown", this._handleKeyDownArrows);

      return <Training UserNo={this.state.UserNo} num_training={this.state.num_training} nextTransition={this.nextTransition}/>
    }

    else if (this.state.transition === 5) {

      console.log("task: transition 5 - instructions")

      document.removeEventListener("keydown", this._handleKeyDownNumbers);
      document.removeEventListener("keydown", this._handleKeyDownEnter);
      document.removeEventListener("keydown", this._handleKeyDownArrows);
      document.addEventListener("keydown", this._handleKeyDownRightArrow);


      return (
        <Instructions slide={this.state.slide}/>
      );
    }

    else if (this.state.transition === 6) {

      console.log("task: transition 6 - start game")

      document.removeEventListener("keydown", this._handleKeyDownArrows);
      document.removeEventListener("keydown", this._handleKeyDownRightArrow);

      return <Game UserNo={this.state.UserNo} nextTransition={this.nextTransition}/>
    }

    else if (this.state.transition === 7) {

      console.log("task: transition 7")
      return null

    }
  }

  nextTransition(percentage_passed) {

    console.log("next_transition", "percentage_passed", percentage_passed)

    if (percentage_passed>=this.state.percentage_to_pass){
      this.setState({
        transition: this.state.transition+1,
      });
      }
      else {
      this.setState({
        transition: 1,
        slide: 0,
      });
      }
    }

  _handleKeyDownArrows = (event) => {

    switch( event.keyCode ) {

        /* arrow left.*/
        case 37:

            this.setState({slide: this.state.slide-1});

            break;

        /* arrow right.*/
        case 39:

            if(this.state.slide===21){
              this.setState({
                slide: this.state.slide+1,
                transition: this.state.transition+1,
              });
            }
            else {
              this.setState({slide: this.state.slide+1});
            }

            break;

        default:
      }
  }

  _handleKeyDownRightArrow = (event) => {

    switch( event.keyCode ) {

        /* arrow right.*/
        case 39:

            if(this.state.slide===22){
              this.setState({
                slide: this.state.slide+1,
                transition: this.state.transition+1,
              });
            }
            else if(this.state.slide===23){
              this.setState({
                transition: this.state.transition+1,
              });
            }
            else {
              this.setState({slide: this.state.slide+1});
            }

            break;

        default:
      }
  }

};

export default Task;
