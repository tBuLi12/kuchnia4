import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'dev.kitchen.app',
	appName: 'kitchen4',
	webDir: 'build',
	server: {
		androidScheme: 'https'
	},
	plugins: {
		CapacitorHttp: {
			enabled: true
		}
	}
};

export default config;
