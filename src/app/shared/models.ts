export * from './models/bill';
export * from './models/receipt';
export * from './models/receipt-position';
export * from './models/split-bill';
export * from './models/user';
export * from './models/fire-user';
export * from './models/log';
export * from './models/pagination';

export class SecretAudio {

    private static audio = new Audio();

    public static play(){
        this.audio.src = '../../assets/audio/cat-song.mp3';
        this.audio.load();
        this.audio.play();
    }

    public static stop(){
        this.audio.pause();
        this.audio.currentTime = 0;
    }
}
