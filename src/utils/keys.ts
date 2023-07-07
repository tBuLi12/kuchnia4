export function enter(callback: (evt: KeyboardEvent) => void): (evt: KeyboardEvent) => void {
	return (evt) => {
		if (evt.key == 'Enter') {
			callback(evt);
		}
	};
}
