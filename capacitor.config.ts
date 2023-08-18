import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'dev.kitchen.app',
	appName: 'kitchen4',
	webDir: 'build',
	server: {
		androidScheme: 'https'
	}
};

export default config;
