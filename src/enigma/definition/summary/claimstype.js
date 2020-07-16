const SummaryClaimsType = {
   qInfo: {
      qType: "stackbarchart"
   },

   // What is a hypercube?
   // in basic term, it's a table with rows and columns
   // https://qlik.dev/libraries-and-tools/nebulajs/hypercube-introduction
   qHyperCubeDef: {
      qDimensions: [
         {
            qDef: {
               qFieldDefs: ["Claim Notification Date.autoCalendar.Year"]
            }
         },
         {
            qDef: {
               qFieldDefs: ["Claim Type"]
            }
         }
      ],
      qMeasures: [
         {
            qDef: {
               qDef:
                  "Sum( { $< [Claim Notification Date.autoCalendar.InYTD]={1} > } [ClaimCounter] )",
               qLabel: "Claims Opened"
            }
         }
      ],
      // qMode default is "S" - straight mode
      // qMode: "EQ_DATA_MODE_PIVOT_STACK",
      // qNoOfLeftDims: -1,
      qAlwaysFullyExpanded: true,
      qInitialDataFetch: [
         {
            qTop: 0,
            qLeft: 0,
            qWidth: 5,
            qHeight: 100
         }
      ]
   }
};

export default SummaryClaimsType;
