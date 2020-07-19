const ProcessData2 = (data, ...key) => {
   const result = [];
   data.forEach(datum => {
      if (datum.length !== key.length) {
         console.error(
            "The dataset length isn't the same as the number of keys"
         );
      }
      let dataset = {};
      dataset["qElemNumber"] = datum[0].qElemNumber;
      for (var i = 0; i < key.length; i++) {
         if (i === 0) {
            dataset[`${key[i]}`] = datum[i].qText;
         } else {
            datum[i].qNum === "NaN"
               ? (dataset[`${key[i]}`] = datum[i].qText)
               : (dataset[`${key[i]}`] = datum[i].qNum);
         }
      }
      return result.push(dataset);
   });
   return result;
};

export default ProcessData2;
