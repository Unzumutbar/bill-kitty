export * from './models/bill';
export * from './models/receipt';
export * from './models/split-bill';
export * from './models/user';
export * from './models/fire-user';
export * from './models/log';

export enum CheckStatus {
    Undefined,
    Approve,
    Dismiss,
    Pending,
}

export enum LogType {
    Undefined,
    New,
    Update,
    Delete,
    Error,
    LoginSuccess,
    LoginFailed
}

export class SecretAudio {
    public static play(){
        const audio = new Audio();
        audio.src = '../../assets/audio/cat-song.mp3';
        audio.load();
        audio.play();
    }
}
