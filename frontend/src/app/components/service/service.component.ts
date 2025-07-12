import { Component, OnInit } from '@angular/core';
import { features } from 'src/data/services';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  data: {heading: string, description: string}[] = [];

  ngOnInit(): void {
    this.data = features
  }

}
