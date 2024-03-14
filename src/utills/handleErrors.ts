export class handleError {
    message: string
    error: number

    constructor(message: string, error = 404){
        this.message = message
        this.error = error
    }
}