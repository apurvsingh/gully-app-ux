import { Component } from '@angular/core';
import { GullyRequest, GullyResponse } from '../models/gully.model';
import { GullyService } from './gully.service';

@Component({
  selector: 'app-gully',
  templateUrl: './gully.component.html',
  styleUrls: ['./gully.component.css']
})
export class GullyComponent {
  // Input parameters (cm)
  height = 100;
  width = 50;
  pipeHeight = 60;
  pipeDiameter = 15;
  waterHeightCm = 30;
  gullyName = ''
  
  constructor(private gullyService: GullyService) {}

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
        console.log('Gully saved successfully: ', response );
      },
      error: (err) => {
        console.error('Failed to save gully', err);
      }
    });
  }
  
  // Visual scale
  scale = 4; // 1 cm = 4 px

    get svgHeight() {
    return this.height * this.scale;
  }

  get svgWidth() {
    return (this.width + 30) * this.scale;
  }

  get waterHeight() {
    return this.waterHeightCm * this.scale;
  }

  get pipeY() {
    // pipe center measured from bottom
    return this.svgHeight - (this.pipeHeight * this.scale);
  }
  get pipeRadiusPx() {
  return (this.pipeDiameter / 2) * this.scale;
  }

  get pipeTopY() {
    return this.pipeY - this.pipeRadiusPx;
  }

  get pipeBottomY() {
    return this.pipeY + this.pipeRadiusPx;
  }
}
