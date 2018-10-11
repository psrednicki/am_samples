import {AfterViewInit, Component, OnInit} from '@angular/core';
import {datacenters} from "../../datacenters";
import {datacenters2} from "../../datacenters2";
import {diffFunction} from "./utils/diff-fnc";
import {addedDiff, deletedDiff, detailedDiff, diff, updatedDiff} from "deep-object-diff";


@Component({
  selector: 'app-differ',
  templateUrl: './differ.component.html',
  styleUrls: ['./differ.component.css']
})
export class DifferComponent implements OnInit, AfterViewInit {

  constructor() {
  }

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

  dataCenter1 = {
    id: 1,
    name: "DC1",
    healthy: true,
    localization:
      {
        lnt: 21,
        lng: 20
      },
    gateways: [
      {
        id: 1,
        status: 'UNREACHABLE',
        links: 'http://www.google.ch'
      },
      {
        id: 2,
        status: 'ONLINE',
        links: 'http://www.onet.pl'
      },
      {
        id: 3,
        status: 'ONLINE',
        links: 'http://www.vp.pl'
      },
      {
        id: 4,
        status: 'TERMINATED',
        links: 'http://www.niebezpiecznik.pl'
      }

    ]
  }

  dataCenter1_aft = {
    id: 2,
    name: "DC1",
    healthy: true,
    localization:
      {
        lnt: 21,
        lng: 20
      },
    gateways: [
      {
        id: 1,
        status: 'UNREACHABLE',
        links: 'http://www.google.ch'
      },
      {
        id: 2,
        status: 'UNREACHABLE',
        links: 'http://www.onet.pl'
      },
      {
        id: 3,
        status: 'ONLINE',
        links: 'http://www.vp.pl'
      },
      {
        id: 4,
        status: 'TERMINATED',
        links: 'http://www.niebezpiecznik.pl'
      }

    ]
  }

  dc1 = datacenters;
  dc2 = datacenters2;

  ngAfterViewInit(): void {
    console.log('DIFF', diffFunction(this.dc1, this.dc2, 'status', true));
    console.log('DIFF EASY', diffFunction(this.dataCenter1, this.dataCenter1_aft, 'id', true))

    console.log('UPDATED', updatedDiff(this.dataCenter1, this.dataCenter1_aft))
    console.log('ADDED', addedDiff(this.dataCenter1, this.dataCenter1_aft))
    console.log('DIFF', diff(this.dataCenter1, this.dataCenter1_aft))
    console.log('DELETED', deletedDiff(this.dataCenter1, this.dataCenter1_aft))
    console.log('DETAILED', detailedDiff(this.dataCenter1, this.dataCenter1_aft))
  }

  whatDiffrenet(tab1, tab2) {

  }

}
