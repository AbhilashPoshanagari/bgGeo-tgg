import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import BackgroundGeolocation, {
  State,
  Config,
  Location,
  LocationError,
  Geofence,
  HttpEvent,
  MotionActivityEvent,
  ProviderChangeEvent,
  MotionChangeEvent,
  GeofenceEvent,
  GeofencesChangeEvent,
  HeartbeatEvent,
  ConnectivityChangeEvent
} from "cordova-background-geolocation-lt";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  latitude: any;
  recordedDate: String;
  constructor(
    private platform: Platform,
    private http: HttpClient
  ) {
    this.getDateAndTime();
    this.platform.ready().then(() => {
      this.configureBackgroundGeolocation();
    });
  }

  configureBackgroundGeolocation() {

    // 1.  Listen to events.
    BackgroundGeolocation.onLocation(location => {
      console.log('[location] - ', location);
      this.http.post<any>('https://tggreports.com:3443/device_data/data',
      { geo_location: ',location' }).subscribe((res) => {
        console.log("http : ", res);
      }, err => console.log("http error : ", err));
    });

    BackgroundGeolocation.onMotionChange(event => {
      console.log('[motionchange] - ', event.isMoving, event.location);
      this.latitude = event.location.coords.latitude;
      this.http.post<any>('https://tggreports.com:3443/device_data/data',
      { geo_location: this.latitude + ', onMotionChange' }).subscribe((res) => {
        console.log("http : ", res);
      }, err => console.log("http error : ", err));
    });

    BackgroundGeolocation.onHttp(response => {
      this.getDateAndTime();
      console.log('[http] - ', response.success, response.status, response.responseText);
      this.http.post<any>('https://tggreports.com:3443/device_data/data',
      { geo_location: response.responseText + ', response HTML',
        temp_celsius: "temp in celsius",
        temp_fahrenheit: "temp in Fahrenheit",
        status: response.status,
        background_mode: response.success,
        created_datetime: this.recordedDate,
    	   record_datetime: this.recordedDate}).subscribe((res) => {
        console.log("http : ", res);
      }, err => console.log("http error : ", err));

//getDateAndTime//-----------------htttps

    });

    BackgroundGeolocation.onProviderChange(event => {
      console.log('[providerchange] - ', event.enabled, event.status, event.gps);
    });

    // 2.  Configure the plugin with #ready
// individual_users_id
//temparate
//lat/lng
//locationTemplate: '{"geo_location":<%= latitude %>, "background_mode":<%= longitude %>}',
//1000
    BackgroundGeolocation.ready({
      reset: false,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 3,
      stopTimeout: 1,
      enableHeadless: true,
      url: "https://tggreports.com:3443/device_data/data",
      locationTemplate: '{"geo_location":<%= latitude %>}',
      // params: Object.assign({}, this.paramsBackgroundGeolocation),
      autoSync: true,
      stopOnTerminate: false,
      startOnBoot: true,
      notification: {
        title: 'bgGeo-TGG App',
        text: 'Tracking engaged'
      }
    }, (state) => {
      console.log('[ready] BackgroundGeolocation is ready to use');
      if (!state.enabled) {
        // 3.  Start tracking.
        BackgroundGeolocation.start();
        this.getSqLiteRecords();
        this.http.post<any>('https://tggreports.com:3443/device_data/data',
        { geo_location: ', BackgroundGeolocation' }).subscribe((res) => {
          console.log("http : ", res);
        }, err => console.log("http error : ", err));
      }
    });
}
  async getSqLiteRecords(){
    let count = await BackgroundGeolocation.getCount();
    console.log('*************** count: ', count);
    let locations = await BackgroundGeolocation.getLocations();
    console.log(' SQ Lite database is locations : ', locations);
  }
getDateAndTime(){
  const timestamp = new Date().getTime();
  var date = new Date(timestamp);
  var month = date.getMonth() + 1;
  var converted = date.toString();
  var splitResult = converted.split(" ");
  console.log("split : ", splitResult);
  this.recordedDate = splitResult[3] + "-" + month + "-" + splitResult[2] + " " + splitResult[4];
  console.log("recordedDate : ", this.recordedDate);
}
}
