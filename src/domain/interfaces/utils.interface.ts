import { Request, Response } from "express";

export interface ISendResponse {
    res: Response;
    success: boolean;
    statusCode: number;
    message: string;
    data?: any;
}

export interface ISendError {
    res: Response;
    statusCode?: number;
    message?: string;
    error?: any;
}

export interface IHTTPStatusCodes {
    [key: string]: number;
}
export enum Days {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}

