import type { Request, Response } from 'express';
declare class AuthenticationController {
    handleSignup(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleSignin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    handleMe(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export default AuthenticationController;
//# sourceMappingURL=controller.d.ts.map