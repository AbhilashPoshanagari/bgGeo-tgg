import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { HttpClient } from '@angular/common/http';
// import BackgroundGeolocation, {
//   State,
//   Config,
//   Location,
//   LocationError,
//   Geofence,
//   HttpEvent,
//   MotionActivityEvent,
//   ProviderChangeEvent,
//   MotionChangeEvent,
//   GeofenceEvent,
//   GeofencesChangeEvent,
//   HeartbeatEvent,
//   ConnectivityChangeEvent
// } from "cordova-background-geolocation-lt";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  // latitude: any;
  // recordedDate: String;

  constructor(
    private platform: Platform,
    // private http: HttpClient,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    // this.getDateAndTime();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.configureBackgroundGeolocation();
    });
  }

//   configureBackgroundGeolocation() {
//
//     // 1.  Listen to events.
//     BackgroundGeolocation.onLocation(location => {
//       console.log('[location] - ', location);
//       this.http.post<any>('https://tggreports.com:3443/device_data/data',
//       { geo_location: ',location' }).subscribe((res) => {
//         console.log("http : ", res);
//       }, err => console.log("http error : ", err));
//     });
//
//     BackgroundGeolocation.onMotionChange(event => {
//       console.log('[motionchange] - ', event.isMoving, event.location);
//       this.latitude = event.location.coords.latitude;
//       this.http.post<any>('https://tggreports.com:3443/device_data/data',
//       { geo_location: this.latitude + ', onMotionChange' }).subscribe((res) => {
//         console.log("http : ", res);
//       }, err => console.log("http error : ", err));
//     });
//
//     BackgroundGeolocation.onHttp(response => {
//       console.log('[http] - ', response.success, response.status, response.responseText);
//
//       this.http.post<any>('https://tggreports.com:3443/device_data/data',
//       { geo_location: response.responseText + ', response HTML' }).subscribe((res) => {
//         console.log("http : ", res);
//       }, err => console.log("http error : ", err));
//     });
//
//     BackgroundGeolocation.onProviderChange(event => {
//       console.log('[providerchange] - ', event.enabled, event.status, event.gps);
//     });
//
//     // 2.  Configure the plugin with #ready
//
//     BackgroundGeolocation.ready({
//       reset: false,
//       debug: true,
//       logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
//       desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
//       distanceFilter: 3,
//       stopTimeout: 1,
//       enableHeadless: true,
//       url: 'https://tggreports.com/hmsadmin/index.php/api/Native_background_data/insertrecord?jsonstring=33333334',
//       params: {
//         "jsonstring": '123456 @latitude'
//       },
//       autoSync: true,
//       stopOnTerminate: false,
//       startOnBoot: true,
//       notification: {
//         title: 'bgGeo-TGG App',
//         text: 'Tracking engaged'
//       }
//     }, (state) => {
//       console.log('[ready] BackgroundGeolocation is ready to use');
//       if (!state.enabled) {
//         // 3.  Start tracking.
//         BackgroundGeolocation.start();
//         this.http.post<any>('https://tggreports.com:3443/device_data/data',
//         { geo_location: ', BackgroundGeolocation' }).subscribe((res) => {
//           console.log("http : ", res);
//         }, err => console.log("http error : ", err));
//       }
//     });
// }
//
// getDateAndTime(){
//   const timestamp = new Date().getTime();
//   var date = new Date(timestamp);
//   var month = date.getMonth() + 1;
//   var converted = date.toString();
//   var splitResult = converted.split(" ");
//   console.log("split : ", splitResult);
//   this.recordedDate = splitResult[3] + "-" + month + "-" + splitResult[2] + " " + splitResult[4];
//   console.log("recordedDate : ", this.recordedDate);
// }
}
