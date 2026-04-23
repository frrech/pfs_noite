import { errorProcessing } from "../error/error_processing";
export async function handleRequest(req: any, res: any, action: () => Promise<any>, successStatus: number = 200): Promise<void> {
    try{
        const foo = await action();
        res.status(successStatus).json(foo);
    } catch (error: any) {
        errorProcessing(error);
    }
}