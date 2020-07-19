const DataFromqMatrix = (qMatrix, qDimensionInfo, qMeasureInfo) => {
   const dimensions = qDimensionInfo.map(dim => dim.qFallbackTitle);
   const measures = qMeasureInfo.map(mea => mea.qFallbackTitle);
   const keys = [...dimensions, ...measures];
   const result = [];

   qMatrix.map(dataset => {
      let data = {};
      for (let i = 0; i < keys.length; i++) {
         dataset[i].qNum === "NaN"
            ? (data[`${keys[i]}`] = dataset[i].qText)
            : (data[`${keys[i]}`] = dataset[i].qNum);
      }
      return result.push(data);
   });

   return result;
};

export default DataFromqMatrix;
