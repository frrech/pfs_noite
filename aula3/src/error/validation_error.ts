export class ValidationError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode; // Bad Request
    }
}

export function errorProcessing(error: any) {
    if (error && (error as any).statusCode !== undefined) {
        const statusCode = (error as any).statusCode;
        console.error(`Erro de validação: ${error.message} (Status Code: ${statusCode})`);
    } else {
        console.error(`Erro inesperado: ${error.message}`);
    }
}