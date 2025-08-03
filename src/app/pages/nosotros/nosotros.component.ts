import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { NavComponent } from "src/app/shared/nav/nav.component";

@Component({
    selector: 'app-nosotros',
    imports: [FooterComponent, NavComponent],
    templateUrl: './nosotros.component.html',
    styleUrl: './nosotros.component.css'
})
export default class NosotrosComponent implements OnInit {
    constructor(private viewportScroller: ViewportScroller) { }

    ngOnInit(): void {
        this.viewportScroller.scrollToPosition([0, 0]);
    }

}
