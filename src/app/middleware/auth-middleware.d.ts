import type { Request, Response, NextFunction } from 'express';
export declare function authenticationMiddleware(): (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare function restrictToAuthenticatedUser(): (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth-middleware.d.ts.map