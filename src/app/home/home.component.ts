import { Component } from "@angular/core";
import { ActivityService } from "../activity.service";
import { Tunnels } from "../config/Tunnels";
import { Status } from "../interfaces/Status";

@Component({
  selector: "app-landing",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  public data: {
    [url: string]: Status;
  };
  public tunnels = Tunnels;
  constructor(service: ActivityService) {
    this.data = {};
    for (const tunnel of this.tunnels) {
      service
        .getData(`https://status.naomi.exposed/${tunnel.name}`)
        .subscribe((data) => {
          console.log(tunnel.url);
          console.log(data);
          this.data[tunnel.url] = data;
        });
    }
  }

  public getState(url: string) {
    switch (this.data[url]?.status) {
      case 200:
        return "Online";
      case 530:
        return "Inactive";
      case null:
      case undefined:
        return "Loading";
      default:
        return "Errored";
    }
  }

  public getStyle(url: string) {
    switch (this.data[url]?.status) {
      case 200:
        return "background-color: darkgreen; color: white";
      case 530:
        return "background-color: grey; color: black";
      case null:
      case undefined:
        return "background-color: blue; color: white";
      default:
        return "background-color: darkred; color: white";
    }
  }

  public showLink(url: string) {
    return this.data[url]?.status === 200;
  }
}
