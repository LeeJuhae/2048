import { dir } from 'console';
import React from 'react';

const Play = () => {
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
		if (board[r][c] != 0) {
			if (not_zero[0] === -1 && not_zero[1] === -1) {
				console.log("Here")
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
	initBoard();
	document.addEventListener('keydown', (e) => {
		switch(e.code) {
			case 'ArrowUp':
				direct_idx = 0;
				let r: number = 0;
				let c: number = 0;
				while (c < 4) {
					let not_zero: Array<number> =[-1, -1];
					while (r < 4) {
						console.log("before",not_zero)
						not_zero = plus(not_zero, r, c);
						console.log("after", not_zero)
						++r;
					}
					++c;
					r = 0;
				}
				let new_board: Array<Array<number>> = [[], [], [], []];
				for (let i = 0 ; i < 4 ; i++) {
					for (let j = 0 ; j < 4 ; j++) {
						if (board[i][j] != 0)
							new_board[i].concat(board[i][j]);
					}
					new_board[new_board.length - 1].concat([])
				}

				for(let i = 0 ; i < 4 ; i++)
					console.log(board[i]);
				break;
			case 'ArrowRight':
				direct_idx = 1;
				break;
			case 'ArrowDown':
				direct_idx = 2;
				break;
			case 'ArrowLeft':
				direct_idx = 3;
				break;
		}

	});
	return (
		<div></div>
	);
}
export default Play;
