import React from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
// import { RootState } from './store';

const Play = () => {
	// interface RootState {
	// 	board : Board
	// }
	// const board = (state: RootState) => state.board
	// let board: Array<Array<number>> = [[0, 0, 2, 0],[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0]];
	let board: Array<Array<number>> = [[0, 0, 0, 0],[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
	const directions: Array<Array<number>> = [[-1,0],[0,1],[1,0],[0,-1]];
	let direct_idx: number;
	const initBoard = () => {
		let random = [];
		for(let i = 0 ; i < 4 ; i++) {
			random.push(Math.floor(Math.random() * 4))
		}
		for(let i = 0 ; i < 4 ;) {
			board[random[i]][random[i+1]] = 2;
			i += 2;
		}
		for(let i = 0 ; i < 4 ; i++)
			console.log(board[i]);
	}
	const plus = (not_zero: Array<number>, r: number, c: number): Array<number> => {
		if (board[r][c] !== 0) {
			if (not_zero[0] === -1 && not_zero[1] === -1) {
				not_zero = [r, c];
			}
			else if (board[r][c] === board[not_zero[0]][not_zero[1]]) {
				board[not_zero[0]][not_zero[1]] *= 2;
				board[r][c] = 0;
				not_zero = [-1, -1];
			}
			else {
				not_zero = [r, c];
			}
		}
		return not_zero;
	}
	const isNotZero = (ele: number) => {
		return (ele !== 0)
	}
	const switchRowCol = (board : Array<Array<number>>): Array<Array<number>> => {
		let temp: Array<Array<number>> = [[], [], [], []];
		for (let i = 0 ; i < 4 ; i++) {
			for (let j = 0 ; j < 4 ; j++) {
				temp[j].push(board[i][j])
			}
		}
		return temp
	}

	initBoard();
	let r: number;
	let c: number;
	let not_zero: Array<number>;
	let temp: Array<number>;
	document.addEventListener('keydown', (e) => {
		let new_board: Array<Array<number>> = [[], [], [], []];
		switch(e.code) {
			case 'ArrowUp':
				direct_idx = 0;
				r = 0;
				c = 0;
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
					let temp = new_board[j].length
					for (let i = 0 ; i < 4 - temp ; i++)
						new_board[j].push(0)
				}
				board = switchRowCol(new_board);
				break;
			case 'ArrowRight':
				direct_idx = 1;
				r = 0;
				c = 3;
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
				break;
			case 'ArrowDown':
				direct_idx = 2;
				r = 3;
				c = 0;
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
					let temp = new_board[j].length
					for (let i = 0 ; i < 4 - temp ; i++)
						new_board[j].unshift(0)
				}
				board = switchRowCol(new_board);
				break;
			case 'ArrowLeft':
				direct_idx = 3;
				r = 0;
				c = 3;
				while (r < 4) {
					not_zero = [-1, -1];
					while (c >= 0) {
						not_zero = plus(not_zero, r, c);
						c -= 1;
					}
					r += 1;
					c = 3;
				}
				for (let i = 0 ; i < 4 ; i++) {
					temp = board[i].filter(isNotZero);
					board[i] = temp.concat([0,0,0,0].slice(0, 4-temp.length));
				}
				break;
			}
			// for(let i = 0 ; i < 4 ; i++)
			// 	console.log(board[i]);
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
