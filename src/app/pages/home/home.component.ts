import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private viewporscroller: ViewportScroller){}

  ngOnInit(): void {
    this.viewporscroller.scrollToPosition([0, 0]);
  }

}
