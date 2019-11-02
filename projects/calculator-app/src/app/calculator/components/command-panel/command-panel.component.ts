import { Component } from '@angular/core';

@Component({
  selector: 'app-command-panel',
  templateUrl: './command-panel.component.html',
  styleUrls: ['./command-panel.component.scss']
})
export class CommandPanelComponent {

  readonly commands: string[] = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    '.', '+', '-', '*', '/',
    'sin', 'cos', 'tan', '(', ')'
  ];

}
