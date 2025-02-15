export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
};

export const generateRandomId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};