export class Route {
    private static api = 'api/';
    private static create = 'create';
    private static update = 'update';
    private static delete = 'delete';

    //#region AppController
    private static appController = Route.api + 'app/';
    public static appInfo = Route.appController + 'appInfo';
    //#endregion AppController

    //#region AuthController
    private static authController = Route.api + 'auth/';
    public static authTest = Route.authController + 'test';
    public static authSignUp = Route.authController + 'signUp';
    public static authSignIn = Route.authController + 'signIn';
    public static authVerifyToken = Route.authController + 'verifyToken';
    public static authInternalSignIn = Route.authController + 'internalSignIn';
    //#endregion AuthController

    //#region BlogController
    private static blogController = Route.api + 'blog/';
    public static blogCreate = Route.blogController + Route.create;
    public static blogUpdate = Route.authController + Route.update;
    public static blogDelete = Route.authController + Route.delete;
    //#endregion BlogController
}