import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { GullyComponent } from './gully.component';
import { GullyService } from './gully.service';
import { GullyResponse } from '../models/gully.model';

describe('GullyComponent', () => {
  let component: GullyComponent;
  let fixture: ComponentFixture<GullyComponent>;
  let gullyServiceSpy: jasmine.SpyObj<GullyService>;

  beforeEach(async () => {
    gullyServiceSpy = jasmine.createSpyObj<GullyService>('GullyService', [
      'saveGully'
    ]);

    await TestBed.configureTestingModule({
      declarations: [GullyComponent],
      imports: [FormsModule],
      providers: [
        { provide: GullyService, useValue: gullyServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Initialization
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate initial layout on construction', () => {
    expect(component.layout).toBeDefined();
    expect(component.layout.svgHeight).toBe(component.height * component.scale);
  });

  // Validation logic
  it('should mark water height invalid when it exceeds gully height', () => {
    component.waterHeightCm = 200;
    component.recalculateLayout();

    expect(component.isWaterHeightValid).toBeFalse();
    expect(component.isFormLogicallyValid).toBeFalse();
  });

  it('should mark pipe diameter invalid when it exceeds gully height', () => {
    component.pipeDiameter = 200;
    component.recalculateLayout();

    expect(component.isPipeDiameterValid).toBeFalse();
    expect(component.isFormLogicallyValid).toBeFalse();
  });

  it('should mark pipe position invalid when pipe does not fit inside gully', () => {
    component.pipeHeight = 5;
    component.pipeDiameter = 20; // half = 10 → bottom < 0
    component.recalculateLayout();

    expect(component.isPipePositionValid).toBeFalse();
    expect(component.isFormLogicallyValid).toBeFalse();
  });

  it('should be logically valid when all inputs are within bounds', () => {
    component.height = 100;
    component.pipeHeight = 50;
    component.pipeDiameter = 20;
    component.waterHeightCm = 30;

    component.recalculateLayout();

    expect(component.isFormLogicallyValid).toBeTrue();
  });

  // Layout calculation
  it('should not update layout when inputs are logically invalid', () => {
    const previousLayout = component.layout;

    component.waterHeightCm = 200;
    component.recalculateLayout();

    expect(component.layout).toBe(previousLayout);
  });

  it('should correctly calculate pipe geometry', () => {
    component.pipeHeight = 60;
    component.pipeDiameter = 20;
    component.recalculateLayout();

    const expectedPipeY =
      component.height * component.scale -
      component.pipeHeight * component.scale;

    const expectedRadius =
      (component.pipeDiameter / 2) * component.scale;

    expect(component.layout.pipeY).toBe(expectedPipeY);
    expect(component.layout.pipeTopY).toBe(expectedPipeY - expectedRadius);
    expect(component.layout.pipeBottomY).toBe(expectedPipeY + expectedRadius);
  });

  // Save behavior
  it('should call saveGully and show success message on success', () => {
    const mockResponse: GullyResponse = {} as GullyResponse;

    gullyServiceSpy.saveGully.and.returnValue(of(mockResponse));

    component.save();

    expect(gullyServiceSpy.saveGully).toHaveBeenCalled();
    expect(component.saveSuccessMessage).toBe('Gully saved successfully');
    expect(component.saveFailMessage).toBe('');
  });

  it('should show failure message when save fails', () => {
    gullyServiceSpy.saveGully.and.returnValue(throwError(() => new Error()));

    component.save();

    expect(gullyServiceSpy.saveGully).toHaveBeenCalled();
    expect(component.saveFailMessage).toBe('Gully NOT saved');
    expect(component.saveSuccessMessage).toBe('');
  });
});
