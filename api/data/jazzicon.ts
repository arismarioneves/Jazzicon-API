import MersenneTwister from "mersenne-twister";
import { hueShift } from "./colors";

const SHAPE_COUNT = 4;

const COLORS: readonly string[] = [
	"#01888C", // teal
	"#FC7500", // bright orange
	"#034F5D", // dark teal
	"#F73F01", // orangered
	"#FC1960", // magenta
	"#C7144C", // raspberry
	"#F3C100", // goldenrod
	"#1598F2", // lightning blue
	"#2465E1", // sail blue
	"#F19E02", // gold
];

let generator: MersenneTwister;

export default function jazzicon(
	diameter: number,
	seed: number | number[] | undefined
	) {
	generator = new MersenneTwister(seed);
	
	const remainingColors = hueShift(COLORS.slice(), generator);
	
	const background = genColor(remainingColors);
	
	let shapes: string[] = [];
	
	for (var i = 0; i < SHAPE_COUNT - 1; i++) {
		shapes = [
			...shapes,
			genShape(remainingColors, diameter, i, SHAPE_COUNT - 1),
		];
	}
	
	return `
	<svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="${diameter}px" height="${diameter}px" viewBox="0 0 ${diameter} ${diameter}">
	<rect width="100%" height="100%" fill="${background}"/>
	${shapes.join("")}
	</svg>`;
}

function genShape(
	remainingColors: string[],
	diameter: number,
	i: number,
	total: number
	) {
	const center = diameter / 2;
	
	const firstRot = generator.random();
	
	const angle = Math.PI * 2 * firstRot;
	
	const velocity =
    (diameter / total) * generator.random() + (i * diameter) / total;
	
	const tx = Math.cos(angle) * velocity;
	const ty = Math.sin(angle) * velocity;
	
	const translate = `translate(${tx} ${ty})`;
	
	// Third random is a shape rotation on top of all of that.
	const secondRot = generator.random();
	
	const rot = firstRot * 360 + secondRot * 180;
	
	const rotate = `rotate(${rot.toFixed(1)} ${center} ${center})`;
	
	const transform = translate + " " + rotate;
	
	const fill = genColor(remainingColors);
	
	return `<rect x="0" y="0" width="${diameter}" height="${diameter}" transform="${transform}" fill="${fill}" />`;
}

function genColor(colors: string[]) {
	generator.random();
	
	const idx = Math.floor(colors.length * generator.random());
	
	const color = colors.splice(idx, 1)[0];
	
	return color;
}
