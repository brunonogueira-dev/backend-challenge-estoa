export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    planType?: string;
    createdAt: Date;
}
