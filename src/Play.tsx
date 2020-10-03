import { dir } from 'console';
import React from 'react';

const Play = () => {
	let board = [[0, 0, 0, 0],[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
	const directions = [[-1,0],[0,1],[1,0],[0,-1]];
	let direct_idx;
	const initBoard = () => {
		let random = [];
		for(let i = 0 ; i < 4 ; i++) {
			random.push(Math.floor(Math.random() * 4))
		}
		for(let i = 0 ; i < 4 ;) {
			board[random[i]][random[i+1]] = 2;
			i += 2;
		}
	}
	initBoard();
	document.addEventListener('keydown', (e) => {
		switch(e.code) {
			case 'ArrowUp':
				direct_idx = 0;
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
