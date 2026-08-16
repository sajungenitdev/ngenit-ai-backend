import { Request, Response } from 'express';
export declare const getHeroBanner: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createHeroBanner: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateHeroBanner: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const toggleHeroBannerStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const resetHeroBanner: (req: Request, res: Response) => Promise<void>;
export declare const deleteHeroBanner: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=heroController.d.ts.map