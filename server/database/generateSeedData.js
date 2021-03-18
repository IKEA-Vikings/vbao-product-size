const generateSeedData = () => {
  let data = [];
  const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
  const sizeSets = [
    [
      ['Length', 'inch'],
      ['Width', 'inch'],
    ],
    [
      ['Length', 'inch'],
      ['Width', 'inch'],
      ['Thread count', 'inches squared'],
      ['Filling weight', 'ounce'],
      ['Total weight', 'ounce']
    ],
    [
      ['Max. load', 'pound'],
      ['Height', 'inch']
    ]
  ];
  let hasBonus = random(0, 2);

  for (let id = 1; id <= 100; id++) {
    let document = {};
    let sizeType = random(0, 2);
    let sizingGroup = sizeSets[sizeType];
    let numSizes = sizingGroup.length;

    for (let j = 0; j < numSizes ; j++) {
      let temp = {};
      temp['name'] = sizingGroup[j][0];
      //Add name and unit to temp
      temp['unit'] = sizingGroup[j][1];
      //Pick random size, add to temp
      temp['size'] = random(5, 150);
      //Push temp to document[sizes];
      if (document.sizes === undefined) {
        document.sizes = [];
      }
      document.sizes.push(temp);
    }

    // Bonus sizing if exists
    if (hasBonus && document.sizes !== undefined) {
      let sizeType = random(0, 2);
      let sizingGroup = sizeSet[2][sizeType];
      let temp = {};
      temp['name'] = sizingGroup[0];
      //Add name and unit to temp
      temp['unit'] = sizingGroup[1];
      //Pick random size, add to temp
      temp['size'] = random(35, 250);
      document.sizes.push(temp);
    }

    // Generate title
    if (sizeType === 0) {
      let length = document.sizes[0].size;
      let width = document.sizes[1].size;
      document.title = `${length}x${width}"`;
    } else if (sizeType === 1) {
      let sizes = ['Twin', 'Single', 'Queen', 'King']
      let title = random(0, 4);
      document.title = `${sizes[title]}`;;
    } else {
      document.title = '';
    }

    //push document to data
    document.id = id;
    data.push(document);
  }

  return data;
};

module.exports = generateSeedData;