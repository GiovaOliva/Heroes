import { Component } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  show_spinner: boolean = false;

  toggle_spinner(): void {
    this.show_spinner = !this.show_spinner;
  }
}
