import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-nosotros',
  imports: [],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller){}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
  
}
