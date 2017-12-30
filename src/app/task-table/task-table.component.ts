import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { DataTable, DataTableResource } from 'angular-4-data-table';
import { ProjectService } from '../service/project.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  inputs: ['id'],
  styleUrls: ['./task-table.component.css']
})

export class TaskTableComponent implements OnInit {

  id:number;
  taskResource;
  tasks = [];
  taskCount = 0;
  project;
  control;

  @ViewChild(DataTable) tasksTable: DataTable;
  
  constructor( private service:ProjectService ) {
    console.log( this.id );
    this.service.getProject( this.id, "name", "asc" ).subscribe(
      response => {
          this.project = response.json().project;
          // Count project tasks 
          this.project.counted = this.service.countProjectTasks( this.project );
          this.taskResource = new DataTableResource( this.project.tasks );
          this.taskResource.count().then( count => this.taskCount = count );
    });
  }

  reloadTasks( params )
  {
    this.taskResource.query( params ).then( items => this.tasks = items );
  }

  toggleTaskStatus( task ) {
    console.log( task );
  }

  ngOnInit(){
    console.log( this.id );
  }

}
