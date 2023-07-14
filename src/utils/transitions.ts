export function shrink(_: HTMLDivElement) {
	return {
		delay: 0,
		duration: 100,
		css: (t: number) => `height: ${t * 3.5}rem; opacity: ${t}`
	};
}

export function growRight(_: HTMLDivElement) {
	return {
		delay: 0,
		duration: 100,
		css: (t: number) => `right: ${(1 - t) * 100}%`
	};
}
