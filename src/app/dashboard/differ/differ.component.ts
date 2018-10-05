import {AfterViewInit, Component, OnInit} from '@angular/core';
import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff';
import {datacenters} from "../../datacenters";
import {datacenters2} from "../../datacenters2";


@Component({
  selector: 'app-differ',
  templateUrl: './differ.component.html',
  styleUrls: ['./differ.component.css']
})
export class DifferComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  lhs = {
    foo: {
      bar: {
        a: ['a', 'b'],
        b: 2,
        c: ['x', 'y'],
        e: 100 // deleted
      }
    },
    buzz: 'world'
  };

  rhs = {
    foo: {
      bar: {
        a: ['a'], // index 1 ('b')  deleted
        b: 2, // unchanged
        c: ['x', 'y', 'z'], // 'z' added
        d: 'Hello, world!' // added
      }
    },
    buzz: 'fizz' // updated
  };

  dc1 = datacenters;
  dc2 = datacenters2;

  ngAfterViewInit(): void {
    console.log('DIFF:', diff(this.lhs, this.rhs))
    console.log('ADDED: ', addedDiff(this.lhs, this.rhs))

    console.log('DIFF',diff(this.dc1, this.dc2))
    console.log('Added',addedDiff(this.dc1, this.dc2))
    console.log('deleted',deletedDiff(this.dc1, this.dc2))
    console.log('updated',updatedDiff(this.dc1, this.dc2))
    console.log('detailed',deletedDiff(this.dc1, this.dc2))
  }

}
