import { Component } from "@angular/core";
import { GullyLayout, GullyRequest, GullyResponse } from "../models/gully.model";
import { GullyService } from "./gully.service";

@Component({
  selector: 'app-gully',
  templateUrl: './gully.component.html',
  styleUrls: ['./gully.component.css']
})
export class GullyComponent {
  // Default values (cm)
  height = 100;
  width = 50;
  pipeHeight = 60;
  pipeDiameter = 15;
  waterHeightCm = 30;
  gullyName = '';

  scale = 4;

  layout!: GullyLayout;

  constructor(private gullyService: GullyService) {
    this.recalculateLayout();
  }

  recalculateLayout(): void {
    const svgHeight = this.height * this.scale;
    const svgWidth = (this.width + 30) * this.scale;
    const waterHeight = this.waterHeightCm * this.scale;
    const pipeY = svgHeight - (this.pipeHeight * this.scale);
    const pipeRadiusPx = (this.pipeDiameter / 2) * this.scale;

    this.layout = {
      svgHeight,
      svgWidth,
      waterHeight,
      pipeY,
      pipeRadiusPx,
      pipeTopY: pipeY - pipeRadiusPx,
      pipeBottomY: pipeY + pipeRadiusPx
    };
  }

  save(): void {
    const gully: GullyRequest = {
      name: this.gullyName,
      height: this.height,
      width: this.width,
      pipeHeight: this.pipeHeight,
      pipeDiameter: this.pipeDiameter,
      waterHeight: this.waterHeightCm
    };

    this.gullyService.saveGully(gully).subscribe({
      next: (response: GullyResponse) => {
        console.log('Gully saved successfully:', response);
      },
      error: () => {
        console.error('Failed to save gully');
      }
    });
  }
}
