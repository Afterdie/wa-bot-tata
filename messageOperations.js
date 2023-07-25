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
  const patterns = {
    division: /(CC#\d)/g,
    heatProduction: /(?<=CC#\d:\s)(.*)/g,
    heatType: /(?<=Sequence:\*\s)(.*)/g,
    sequenceBreak: /(?<=Sequence break:\* )(.*)/g,
    strandLoss: /(?<=Strand loss:\*\s)(.*)/g,
  };

  var data = {
    timestamp: new Date(message.timestamp * 1000).toLocaleTimeString(),
    division: message.body.match(patterns.division)[0].trim(),
    production: heatProduction(message.body.match(patterns.heatProduction)[0]),
    types: heatTypes(message.body.match(patterns.heatType)[0]),
    break: message.body.match(patterns.sequenceBreak)[0].trim(),
    lossReason: message.body.match(patterns.strandLoss)[0].trim(),
  };
  return data;
}

module.exports = { processMessage };
