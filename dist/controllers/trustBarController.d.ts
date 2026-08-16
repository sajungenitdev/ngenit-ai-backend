import { Request, Response } from 'express';
export declare const getTrustBar: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createTrustBar: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateTrustBar: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const toggleTrustBarStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const resetTrustBar: (req: Request, res: Response) => Promise<void>;
export declare const deleteTrustBar: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=trustBarController.d.ts.map