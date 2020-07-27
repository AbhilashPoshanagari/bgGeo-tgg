import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import BackgroundFetch from "cordova-plugin-background-fetch";
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor( private platform: Platform,
    private http: HttpClient,
    private localNotifications: LocalNotifications ) {
      this.platform.ready().then(() => {
        this.onDeviceReady.bind(this);
      });
    }

    onDeviceReady() {
      // Your background-fetch handler.
      let fetchCallback = (taskId) => {
          console.log('[js] BackgroundFetch event received from tgg-smartwatch : ', taskId);
          // Required: Signal completion of your task to native code
          // If you fail to do this, the OS can terminate your app
          // or assign battery-blame for consuming too much background-time
          this.http.post<any>('https://tggreports.com:3443/device_data/data',
          { geo_location: ', BackgroundFetch' }).subscribe((res) => {
            console.log("http : ", res);
          }, err => console.log("http error : ", err));
          BackgroundFetch.finish(taskId);
      };

      let failureCallback = (error) => {
          console.log('- BackgroundFetch failed', error);
      };

      BackgroundFetch.configure(fetchCallback, failureCallback, {
          minimumFetchInterval: 15, // <-- default is 15
          stopOnTerminate: false
      });
    }

}
