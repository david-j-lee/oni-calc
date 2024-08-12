// TODO: Re-enable once the getData method has been refactored into a utils file.
// describe('getData', () => {
//   describe('when given empty array for each param', () => {
//     it('should return empty array', () => {
//       const param = {
//         buildingInputs: [],
//         buildings: [],
//         dupeInputs: [],
//         dupes: {},
//         food: [],
//         foodInputs: [],
//         geyserInputs: [],
//         geysers: [],
//         plants: [],
//         resources: [],
//       };
//       const result = {
//         buildings: [],
//         dupes: {
//           dirtValue: 0,
//           pollutedDirtValue: 0,
//           pollutedWaterValue: 0,
//           quantity: 0,
//           traits: [],
//           waterValue: 0,
//         },
//         food: [],
//         geysers: { inputted: [], listing: [] },
//         plants: [],
//         powerCapacity: { buildings: [], value: 0 },
//         powerGeneration: { buildings: [], value: 0 },
//         powerUsage: { buildings: [], value: 0 },
//         resources: [],
//         resourcesCapacity: { buildings: [], value: 0 },
//       };
//       expect(reducerUtils.getData(param)).toEqual(result);
//     });
//   });
// });
