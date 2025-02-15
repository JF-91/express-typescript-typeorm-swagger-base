// Este archivo define los modelos de datos utilizados en la aplicación.

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
}

export interface Page{ 
    id: number;
    title: string;
    content: string;
    authorId: number;
}

// Aquí puedes agregar métodos para interactuar con la base de datos, como crear, leer, actualizar y eliminar modelos.