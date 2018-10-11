/**
 * Diff two arrays of objects based on a specific property.
 *
 *    var a = [{
 *      a: 1, b: 2, c: 3, id: 0
 *    }, {
 *      a: 1, b: 3, c: 3, id: 1
 *    }, {
 *      a: 1, b: 3, c: 9, id: 2
 *    }];
 *
 *    var b = [{
 *      a: 1, b: 2, c: 3, id: 0
 *    }, {
 *      a: 1, b: 3, c: 3, id: 1
 *    }, {
 *      a: 1, b: 3, c: 9, id: 3
 *    }];
 *
 *    console.log(diffArrayObjsByProp(a, b, 'id'));
 *
 *    // { added: [ { a: 1, b: 3, c: 9, id: 3 } ],
 *    //   removed: [ { a: 1, b: 3, c: 9, id: 2 } ] }
 *
 * @constructor
 * @param {Array} a - First array of objects
 * @param {Array} b - Second array of objects
 * @param {String} compareBy - Property to compare by, such as 'id' for example.
 * @param {Boolean} [returnCommon=false] - Set to true if you want the common items to be included in the result.
 * @returns {Object} - An object with the following properties: added, removed, common (optional). All values are arrays.
 * @api public
 */
import {T} from "@angular/core/src/render3";

export interface Res {
  added: any[];
  removed: any[];
  common?: any;

}


export function diffFunction(a, b, compareBy, returnCommon=false) {
  const prop = compareBy;
  let res: Res = {added: [], removed: []};
  const common = {a: [], b: []};

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (a[i][prop] === b[j][prop]) {
        common.a.push(i);
        common.b.push(j);
        break;
      }
    }

    if (common.a[common.a.length - 1] !== i) {
      res.removed.push(a[i]);
    }
  }

  for (let i = 0; i < b.length; i++) {
    if (common.b.indexOf(i) === -1) {
      res.added.push(b[i]);
    }
  }

  if (returnCommon) {
    res = {...res, common: common.a.map((ind) => {
        return a[ind];
      })
    }
  }

  return res;
}

