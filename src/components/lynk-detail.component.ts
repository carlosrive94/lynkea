import { Component, Input } from '@angular/core';
import { Lynk } from './lynk';

@Component({
  selector: 'lynk-detail',
  templateUrl: 'lynk.html'
})
export class LynkDetailComponent {
  @Input()
  lynk: Lynk
}
