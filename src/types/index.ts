export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Request {
    user?: User;
    body: any;
    params: any;
    query: any;
}