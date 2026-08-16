import { Request, Response, NextFunction } from 'express';
export declare const validate: (req: Request, res: Response, next: NextFunction) => void;
export declare const validateHeroBanner: ((req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined)[];
export declare const validateLogin: ((req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined)[];
export declare const validateTrustBar: ((req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined)[];
//# sourceMappingURL=validation.d.ts.map