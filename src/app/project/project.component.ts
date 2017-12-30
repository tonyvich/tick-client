import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { TaskTableComponent } from 'app/task-table/task-table.component';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project_id ;
  project;
  control = 0;

  constructor( private route: ActivatedRoute, private service:ProjectService ) { 
    
  }

  ngOnInit() {
    // Get project id query parameter
    this.project_id = this.route.snapshot.paramMap.get( 'project_id' );

    // Get project from the id
    this.service.getProject( this.project_id, "name", "asc" ).subscribe(
      response => {
          this.project = response.json().project;
          // Count project tasks 
          this.project.counted = this.service.countProjectTasks( this.project );
          this.control = 1;
    });
  }

}
 