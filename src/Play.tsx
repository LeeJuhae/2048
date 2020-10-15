import React from 'react';
// import { RootState } from './store';

const Play = () => {
	// interface RootState {
	// 	board : Board
	// }
	// const board = (state: RootState) => state.board
	let board: Array<Array<number>> = [[0, 0, 0, 0],[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

	const initBoard = () => {
		board = createNewBlock(board);
	};
	const createNewBlock = (board: Array<Array<number>>) => {
		let random: Array<number> = [];
		let cnt: number = 0;
		for(let i = 0 ; cnt != 2 ; i++) {
			random.push(Math.floor(Math.random() * 4))
			if (i % 2 === 1) {
				if (board[random[i-1]][random[i]] === 0) {
					board[random[i-1]][random[i]] = 2;
					++cnt;
				}
			}
		}
		return board
	};
	const plus = (not_zero: Array<number>, r: number, c: number): Array<number> => {
		if (board[r][c] !== 0) {
			if ((not_zero[0] !== -1 || not_zero[1] !== -1)
			&& board[r][c] === board[not_zero[0]][not_zero[1]]) {
				board[not_zero[0]][not_zero[1]] *= 2;
				board[r][c] = 0;
				not_zero = [-1, -1];
			}
			else {
				not_zero = [r, c];
			}
		}
		return not_zero;
	};
	const isNotZero = (ele: number) => {
		return (ele !== 0)
	};
	const switchRowCol = (board : Array<Array<number>>): Array<Array<number>> => {
		let temp: Array<Array<number>> = [[], [], [], []];
		for (let i = 0 ; i < 4 ; i++) {
			for (let j = 0 ; j < 4 ; j++) {
				temp[j].push(board[i][j])
			}
		}
		return temp
	};
	const moveUp = (board: Array<Array<number>>): Array<Array<number>> => {
		let r: number = 0;
		let c: number = 0;
		let not_zero: Array<number>;
		let new_board: Array<Array<number>> = [[], [], [], []];

		while (c < 4) {
			not_zero =[-1, -1];
			while (r < 4) {
				not_zero = plus(not_zero, r, c);
				++r;
			}
			++c;
			r = 0;
		}
		for (let j = 0 ; j < 4 ; j++) {
			for (let i = 0 ; i < 4 ; i++) {
				if (board[i][j] !== 0)
					new_board[j].push(board[i][j]);
			}
			let board_len: number = new_board[j].length;
			for (let i = 0 ; i < 4 - board_len ; i++)
				new_board[j].push(0)
		}
		board = switchRowCol(new_board);
		return board
	};
	const moveDown = (board: Array<Array<number>>): Array<Array<number>> => {
		let r: number = 3;
		let c: number = 0;
		let not_zero: Array<number>;
		let new_board: Array<Array<number>> = [[], [], [], []];

		while (c < 4) {
			not_zero =[-1, -1];
			while (r >= 0) {
				not_zero = plus(not_zero, r, c);
				--r;
			}
			++c;
			r = 3;
		}
		for (let j = 0 ; j < 4 ; j++) {
			for (let i = 0 ; i < 4 ; i++) {
				if (board[i][j] !== 0)
					new_board[j].push(board[i][j]);
			}
			let board_len: number = new_board[j].length;
			for (let i = 0 ; i < 4 - board_len ; i++)
				new_board[j].unshift(0)
		}
		board = switchRowCol(new_board);
		return board
	};
	const moveLeft = (board: Array<Array<number>>): Array<Array<number>> => {
		let r: number = 0;
		let c: number = 0;
		let not_zero: Array<number>;
		let temp: Array<number>;

		while (r < 4) {
			not_zero = [-1, -1];
			while (c < 4) {
				not_zero = plus(not_zero, r, c);
				++c;
			}
			++r;
			c = 0;
		}
		for (let i = 0 ; i < 4 ; i++) {
			temp = board[i].filter(isNotZero);
			board[i] = temp.concat([0,0,0,0].slice(0, 4-temp.length));
		}
		return board
	};
	const moveRight = (board: Array<Array<number>>): Array<Array<number>> => {
		let r: number = 0;
		let c: number = 3;
		let not_zero: Array<number>;
		let temp: Array<number>;

		while (r < 4) {
			not_zero = [-1, -1];
			while (c >= 0) {
				not_zero = plus(not_zero, r, c);
				--c;
			}
			++r;
			c = 3;
		}
		for (let i = 0 ; i < 4 ; i++) {
			temp = board[i].filter(isNotZero);
			board[i] = [0,0,0,0].slice(0, 4-temp.length).concat(temp);
		}
		return board
	};

	initBoard();
	document.addEventListener('keydown', (e) => {
		switch(e.code) {
			case 'ArrowUp':
				board = moveUp(board);
				break;
			case 'ArrowDown':
				board = moveDown(board);
				break;
			case 'ArrowLeft':
				board = moveLeft(board);
				break;
			case 'ArrowRight':
				board = moveRight(board);
				break;
		}
		for(let i = 0 ; i < 4 ; i++)
			console.log(board[i]);
	});

	return (
		<div>
			{board.map((row, index) => {
			return <div key={index}>{row}</div>
		})}
		</div>
	);
}
export default Play;
