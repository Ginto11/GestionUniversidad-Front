import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
    selector: 'app-nav',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
    standalone: true
})
export class NavComponent {


    constructor(private viewPortScroller: ViewportScroller) {
        this.viewPortScroller.scrollToPosition([0, 0]);
    }
};
