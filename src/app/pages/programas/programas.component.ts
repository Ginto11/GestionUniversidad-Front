import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ProgramasService } from 'src/app/services/programas/programas.service';

@Component({
  selector: 'app-programas',
  imports: [],
  templateUrl: './programas.component.html',
  styleUrl: './programas.component.css'
})  
export class ProgramasComponent implements OnInit {
  
  programas: any;
  rutaImagenesProgramas = 'programas/'

  constructor(private programasService: ProgramasService, private viewPortScroller: ViewportScroller){}

  ngOnInit(): void {
    this.programasService.listarProgramas().subscribe((data) => {
      this.programas = data;
    })

    this.viewPortScroller.scrollToPosition([0, 0]);
  }

  
}
