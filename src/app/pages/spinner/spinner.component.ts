import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  isLoading$ = this.SpinnerSvc.isLoading$;
  
  constructor(private readonly SpinnerSvc: SpinnerService){

  }
}
