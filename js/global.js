const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

const TWO_PI = Math.PI * 2;

const getIndexFromCoords = (x, y, width) => {
				return x + y * width;
}