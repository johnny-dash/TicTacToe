import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import minMaxAgent from './MinMaxAgent';


class Square extends React.Component {
	constructor() {
		super();
		this.state = {
			value: null,
		};
		
	}

	render() {
		let stroke;
		if(this.props.value === 'X')
			stroke = <img className='stroke' src='x.png' alt="X" />;
		else if (this.props.value === 'O')
			stroke = <img className='stroke' src='o.png' alt="O" />;
		else 
			stroke = null;

		return(
			<button className="square" onClick={() => this.props.onClick()}>
				{stroke}
			</button>
		);
	}
}

class Board extends React.Component {
	renderSquare(i) {
		return <Square 
			key= {i}
			value={this.props.squares[i]}
			onClick={() => this.props.onClick(i)}
			/>;
	}

	render() {
		let squares = [];
		let row 	= [];

		//init board by nested loop and set length by 3
		for(var i=0;i<3;i++){
			row = [];
			for(var j=0;j<3;j++){
				row.push(this.renderSquare(i*3+j));
			}
			squares.push(<div key={i} className='board-row'>{row}</div>)
		}

		return (
			<div>
				{squares}
			</div>
		);
	}
}

class Game extends React.Component {
	constructor() {
		super();
		this.agent = new minMaxAgent();
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		}
	}

	handleClick (i){
		//The slice() method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if(calculateWinner(squares) || squares[i]){
			return;
		}
		this.agent.minMax(current);
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}

	jumpTo(step) {
		console.log(step);
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner  = calculateWinner(current.squares);

		const moves   = history.map((step, move) => {
			const desc = move ? 'Move #' + move : 'Game start';
			return (
				<li key={move}>
					<a href= '#' onClick={() => this.jumpTo(move)}>{desc}</a>
				</li>
			);
		});


		let status;
		if(winner){
			status    = 'Winner: ' + winner;

		} else {
			status    = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return(
			<div className='game'>
				<div className='game-board'>
					<Board 
						squares = {current.squares}
						onClick = {(i) => this.handleClick(i)}
					/>
				</div>
				<div className='game-info'>
					<div>{ status }</div>
					<ol>{ moves }</ol>
				</div>
				<div className='title'>
					<span>Tic Tac Toe</span>
				</div>
			</div>
		);
	}
}



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);