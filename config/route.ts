export class Route {
	static api = 'api/';
	//#region AppController
	static appController = Route.api + 'app/';
	static appInfo = Route.appController + 'appInfo';
	//#region AppController

	//#region AuthController
	static authController = Route.api + 'auth/';
	static authSignUp = Route.authController + 'signUp';
	static authSignIn = Route.authController + 'signIn';
	static verifyToken = Route.authController + 'verifyToken';
	//#region AuthController
}