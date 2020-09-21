import { Injectable } from '@angular/core';

//Loader
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = false;

  constructor(
    public loadingController: LoadingController,
  ) { }

  // showHideAutoLoader() {

  //   this.loadingController.create({
  //     message: 'This Loader Will Auto Hide in 2 Seconds',
  //     duration: 2000
  //   }).then((res) => {
  //     res.present();

  //     res.onDidDismiss().then((dis) => {
  //       console.log('Loading dismissed! after 2 Seconds', dis);
  //     });
  //   });

  // }
  async showHideAutoLoader() {

    const loading = await this.loadingController.create({
      message: 'This Loader Will Auto Hide in 2 Seconds',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed! after 2 Seconds', { role, data });

  }

  // Show the loader for infinite time
  async showLoader() {
    this.isLoading = true;
    return await this.loadingController.create(
      {
        message: 'Por favor espere...',
        backdropDismiss:true
      }
    ).then(res => {
      res.present().then(() => {
        if (!this.isLoading) {
          res.dismiss();
        }
      });
    });
    /*
    this.loadingController.create({
      message: 'Por favor espere...',
      backdropDismiss:true
    }).then((res) => {
      res.present();
    });
*/
  }

  // Hide the loader if already created otherwise return error
  async hideLoader() {
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadingController.dismiss();
    }
    return null;
    /*
    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.error('error', error);
    });
*/
  }

}
