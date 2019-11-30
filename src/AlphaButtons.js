import React, { Component } from "react";

class AlphaButtons extends Component {
    render() {
        const buttons = this.props.letters.split("").map(ltr => (
          <button
            value={ltr}
            onClick={this.props.handleGuess}
            disabled={this.props.guessed.has(ltr)}
            key={ltr}
          >
            {ltr}
          </button>
        ));
    
    return (
        <div>
            {buttons}
        </div>
    );
    }
}

export default AlphaButtons;