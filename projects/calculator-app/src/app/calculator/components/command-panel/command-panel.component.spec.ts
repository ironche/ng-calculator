import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandPanelComponent } from './command-panel.component';
import { RandomService } from '../../services/random/random.service';
import { RandomServiceMock } from '../../services/random/random.service.mock';

fdescribe('CommandPanelComponent', () => {
  let component: CommandPanelComponent;
  let fixture: ComponentFixture<CommandPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommandPanelComponent],
      providers: [
        { provide: RandomService, useClass: RandomServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit command click', () => {
    const clickSpy = spyOn(component.commandClick, 'emit');

    fixture.debugElement.nativeElement
      .querySelectorAll('.command-panel__button--condensed')
      .forEach((btn: HTMLButtonElement) => {
        btn.click();
        expect(clickSpy).toHaveBeenCalledWith(btn.innerHTML);
      });
  });
});
