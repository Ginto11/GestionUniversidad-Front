import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@Component({
    selector: 'app-home',
    imports: [RouterLink, FooterComponent   ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export default class HomeComponent {

    constructor(private viewporscroller: ViewportScroller) { }

    ngOnInit(): void {
        //EL COMPONENTE INICIA CON EL SCROLL ARRIBA
        this.viewporscroller.scrollToPosition([0, 0]);
    }

}
