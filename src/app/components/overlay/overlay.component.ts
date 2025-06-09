import { Component, Input } from '@angular/core';
import { OpcionesOverlay } from '../../models/OpcionesOverlay';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-overlay',
  imports: [FormsModule],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.css'
})
export class OverlayComponent {
  @Input() opciones!: OpcionesOverlay;
  @Input() desactivar!: () => void;
}
