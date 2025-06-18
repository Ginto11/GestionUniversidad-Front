import { Component } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-root',
    imports: [NavComponent, RouterOutlet, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'NovaUniversitas'
}
