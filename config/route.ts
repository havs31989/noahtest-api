export class Route {
    private static api = 'api/';
    //#region AppController
    private static appController = Route.api + 'app/';
    public static appInfo = Route.appController + 'appInfo';
    //#region AppController

    //#region AuthController
    private static authController = Route.api + 'auth/';
    public static authTest = Route.authController + 'test';
    public static authSignUp = Route.authController + 'signUp';
    public static authSignIn = Route.authController + 'signIn';
    public static authVerifyToken = Route.authController + 'verifyToken';
    public static authInternalSignIn = Route.authController + 'internalSignIn';
    //#region AuthController
}