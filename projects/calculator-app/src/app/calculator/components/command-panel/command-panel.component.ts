import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-command-panel',
  templateUrl: './command-panel.component.html',
  styleUrls: ['./command-panel.component.scss']
})
export class CommandPanelComponent {
  @Output() commandClick = new EventEmitter<string>();

  readonly commands: string[] = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    '.', '+', '-', '*', '/',
    'pos', 'neg', 'sin', 'cos', 'tan',
    '(', ')'
  ];

  onClick(cmd: string): void {
    this.commandClick.emit(cmd);
  }
}
