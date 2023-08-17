/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,svelte}'],
	theme: {
		extend: {
			fontFamily: {
				nunito: ['nunito', 'sans']
			},
			backgroundImage: {
				add: "url('assets/add.svg')",
				muffin: "url('assets/muffin.png')",
				heart: "url('assets/heart.png')",
				pen: "url('assets/pen.png')"
			},
			dropShadow: {
				icon: '0 0 12px rgb(235 148 30) 0 0 10px rgb(0 0 0)'
			},
			boxShadow: {
				'main-img': `
					inset 0 4px 2px -2px rgb(5 5 5),
					inset 0 -4px 4px -2px rgb(5 5 5 / 0.7);
				`,
				'preview-img': `
					inset 0 4px 2px -2px rgb(5 5 5),
					inset 0 -4px 4px -2px rgb(5 5 5 / 0.7);
				`
			}
		}
	},
	plugins: []
};
