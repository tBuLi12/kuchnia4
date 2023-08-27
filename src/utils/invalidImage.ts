import invalidImage from '../assets/invalid-image.png';

export function setInvalidImage(this: HTMLImageElement) {
	this.src = invalidImage;
}

export function setInvalidBackgroundImage(this: HTMLElement) {
	this.style.backgroundImage = `url(${invalidImage})`;
}
