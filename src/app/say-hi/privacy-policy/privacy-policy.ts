import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './privacy-policy.html',
  styleUrls: ['./privacy-policy.scss'],
})
export class PrivacyPolicy {
  @Input() opened = false;
  @Output() close = new EventEmitter<void>();
  @Output() accept = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
  onCloseAccepted(): void {
    this.close.emit();
    this.accept.emit();
  }
}
