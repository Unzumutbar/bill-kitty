export * from './models/bill';
export * from './models/record';
export * from './models/split-bill';
export * from './models/user';

export enum CheckStatus {
    Undefined,
    Approve,
    Dismiss,
    Pending,
}
