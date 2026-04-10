export function errorProcessing(error: any) {
    if (error && (error as any).statusCode !== undefined) {
        const statusCode = (error as any).statusCode;
        console.error(`Erro de validação: ${error.message} (Status Code: ${statusCode})`);
    } else {
        console.error(`Erro inesperado: ${error.message}`);
    }
}
