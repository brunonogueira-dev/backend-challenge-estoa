import { Op } from "sequelize";

export type TValidOperators = keyof typeof Op;

export interface IFiltereOptions {
    name?: string;
    createdAt?: string
}

export interface IUpdateOptions {
    email?: string;
    name?: string;
    type?: string;
    password?: string;
}