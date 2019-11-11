import { Component, Input } from '@angular/core';
import { History } from '../../models/history';

@Component({
  selector: 'app-history-display',
  templateUrl: './history-display.component.html',
  styleUrls: ['./history-display.component.scss']
})
export class HistoryDisplayComponent {
  @Input() history: History[] = [];
}
