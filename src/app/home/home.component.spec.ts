import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";
import { Tunnels } from "../config/Tunnels";
import { HttpClientModule } from "@angular/common/http";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render the view correctly", () => {
    const title = compiled.querySelector("h1");
    expect(title?.textContent?.trim()).toBe("Naomi's Tunnels");
    for (const tunnel of Tunnels) {
      const index = Tunnels.indexOf(tunnel);
      const section = compiled.querySelectorAll("section")[index];
      const name = section.querySelector("h2");
      expect(name?.textContent?.trim()).toBe(tunnel.name);
      const link = section.querySelector("a");
      expect(link?.getAttribute("href")).toBe(tunnel.url);
      const [description, status] = Array.from(section.querySelectorAll("p"));
      expect(description?.textContent?.trim()).toBe(tunnel.description);
      expect(status?.textContent?.trim()).toBe(component.getState(tunnel.url));
    }
  });
});
