import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommandPanelComponent } from './command-panel.component';

describe('CommandPanelComponent', () => {
  let component: CommandPanelComponent;
  let fixture: ComponentFixture<CommandPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommandPanelComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
