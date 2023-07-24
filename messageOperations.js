const heatTypes = (heatString) => {
  let subHeat = "";
  let heatList = [];

  for (let i = 0; i <= heatString.length; i++) {
    if (heatString.charAt(i) === "+" || i === heatString.length) {
      heatList.push(subHeat.trim());
      subHeat = "";
    } else {
      subHeat += heatString.charAt(i);
    }
  }

  return heatList;
};

const heatProduction = (productionString) => {
  let productionList = [];
  for (let i = 0; i < productionString.length; i++) {
    if (
      productionString.charAt(i + 1) === "+" ||
      productionString.charAt(i + 1) === "="
    )
      productionList.push(parseInt(productionString.charAt(i)));
  }
  return productionList;
};

function processMessage(message) {
  const divisionPattern = /(CC#\d)/g;
  const heatProductionPattern = /(?<=CC#\d:\s)(.*)/g;
  const heatTypePattern = /(?<=Sequence:\*\s)(.*)/g;
  const strandLossPattern = /(?<=Strand loss:\*\s)(.*)/g;

  var data = {
    timestamp: message.timestamp * 1000,
    division: message.body.match(divisionPattern)[0].trim(),
    production: heatProduction(message.body.match(heatProductionPattern)[0]),
    types: heatTypes(message.body.match(heatTypePattern)[0]),
    lossReason: message.body.match(strandLossPattern)[0].trim(),
  };
  return data;
}

module.exports = { processMessage };
