const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

const TWO_PI = Math.PI * 2;
const gravity = new Vec(0, 9.8);

const balls = [];
const fabrics = [];
const anims = [];
const curtainAnims = [];