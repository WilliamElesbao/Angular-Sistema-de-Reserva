import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlhaCentralComponent } from './ilha-central.component';

describe('IlhaCentralComponent', () => {
  let component: IlhaCentralComponent;
  let fixture: ComponentFixture<IlhaCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IlhaCentralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlhaCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
