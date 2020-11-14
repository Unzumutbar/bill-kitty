import { LoadingController, ToastController } from '@ionic/angular';

import { Injectable } from '@angular/core';

// tslint:disable: object-literal-shorthand

export interface ISpinner {
  hide(): Promise<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private toast: ToastController,
    private loading: LoadingController
  ) {}

  private async createToast(message: string, color: string = 'primary') {
    const toast = await this.toast.create({
      duration: 2000,
      message: message,
      position: 'middle',
      color: color,
    });

    return toast;
  }

  public async showNotification(message: string) {
    return await (await this.createToast(message)).present();
  }

  public async showSuccess(message: string) {
    return await (await this.createToast(message, 'success')).present();
  }

  public async showWarning(message: string) {
    return await (await this.createToast(message, 'warning')).present();
  }

  public async showError(message: any) {
    return await (await this.createToast(message, 'danger')).present();
  }

  public async showSpinner(message: string): Promise<ISpinner> {
    const loading = await this.loading.create({ message: message });

    loading.present();

    // tslint:disable-next-line: no-use-before-declare
    return new Spinner(loading);
  }

  public async showSpinnerLoadingData(): Promise<ISpinner> {
    return await this.showSpinner('Lade Daten...');
  }

  public async showSpinnerSavingData(): Promise<ISpinner> {
    return await this.showSpinner('Speichere Daten...');
  }

  public async showMessageWithButton(
    message: string,
    buttonText: string,
    buttonClick: () => void
  ) {
    const toast = await this.toast.create({
      message: message,
      duration: 5000,
      buttons: [
        {
          side: 'end',
          text: buttonText,
          handler: buttonClick,
        },
      ],
    });

    return await toast.present();
  }
}

class Spinner implements ISpinner {
  constructor(private loadingElement: HTMLIonLoadingElement) {}

  public async hide() {
    return await this.loadingElement.dismiss();
  }
}
