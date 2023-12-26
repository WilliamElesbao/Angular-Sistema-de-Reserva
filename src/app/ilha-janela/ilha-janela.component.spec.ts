import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlhaJanelaComponent } from './ilha-janela.component';

describe('IlhaJanelaComponent', () => {
  let component: IlhaJanelaComponent;
  let fixture: ComponentFixture<IlhaJanelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IlhaJanelaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlhaJanelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
