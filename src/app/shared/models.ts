export * from './models/bill';
export * from './models/receipt';
export * from './models/split-bill';
export * from './models/user';
export * from './models/fire-user';

export enum CheckStatus {
    Undefined,
    Approve,
    Dismiss,
    Pending,
}
