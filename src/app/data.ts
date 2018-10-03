const dataSprite: any[] = [{
  name: 'GH1',
  type: 'GH',
  status: 'Online',
  localization:
    {
      lnt: 20,
      lng: 20
    },
},
  {
  name: 'GH2',
  type: 'GH',
  status: 'Online',
  localization:
    {
      lnt: 50,
      lng: 10
    },
},
  {
  name: 'NPM1',
  type: 'NPM',
  status: 'Offline',
  localization:
    {
      lnt: -20,
      lng: -30
    }
},
  {
  name: 'NPM2',
  type: 'NPM',
  status: 'over',
  localization:
    {
      lnt: -24.21,
      lng: 50.12
    }
},{
  name: 'GH3',
  type: 'GH',
  status: 'in-work',
  localization:
    {
      lnt: 30,
      lng: 45
    }
}]


const dataMock: any[] = [{
    name: 'DataCenter1',
    type: 'DataCenter',
    status: 'Online',
    localization:
      {
        lnt: 20,
        lng: 20
      }
  },
  {
    name: 'DataCenter2',
    type: 'DataCenter',
    status: 'Online',
    localization:
      {
        lnt: 50,
        lng: 10
      }
  },
  {
    name: 'DataCenter3',
    type: 'DataCenter',
    status: 'Offline',
    localization:
      {
        lnt: -20,
        lng: -30
      }
  },
  {
    name: 'Office',
    type: 'Office',
    status: 'over',
    localization:
      {
        lnt: -24.21,
        lng: 50.12
      }
  },
  {
    name: 'Head Ofice',
    type: 'Office',
    status: 'in-work',
    localization:
      {
        lnt: 30,
        lng: 45
      }
  }]


export {dataSprite, dataMock}
