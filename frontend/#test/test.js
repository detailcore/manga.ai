const data = [{
    "id": 326277,
    "part": 2,
    "coll": "231.5"
  },
  {
    "id": 326278,
    "part": 2,
    "coll": "231"
  },
  {
    "id": 326279,
    "part": 2,
    "coll": "231"
  },
  {
    "id": 326280,
    "part": 2,
    "coll": "230"
  },
  {
    "id": 326281,
    "part": 1,
    "coll": "229"
  },
  {
    "id": 326282,
    "part": 1,
    "coll": "229"
  },
  {
    "id": 326282,
    "part": 1,
    "coll": "228"
  }
];

let res = Object.values(
  data.reduce((prev, cur, index) => {
      console.log(index)
      console.log(prev)
    //   console.log(cur)
    const key = 'v' + cur['part']; // символ "c" добавлен, чтобы автоматически не сортировало по цифровым ключам 
    (prev[key] = prev[key] || []).push(cur);

    return prev;
  }, {})
);

console.log(res)


// console.log(
//     [
//         {
//           vol2: [
//             [
//               {
//                 "id": 326277,
//                 "coll": "231.5"
//               }
//             ],
//             [
//               {
//                 "id": 326278,
//                 "coll": "231"
//               },
//               {
//                 "id": 326279,
//                 "coll": "231"
//               }
//             ],
//             [
//               {
//                 "id": 326280,
//                 "coll": "230"
//               }
//             ]
//           ],
//           vol1: [
//             [
//               {
//                 "id": 326281,
//                 "coll": "229"
//               }
//             ],
//             [
//               {
//                 "id": 326282,
//                 "coll": "228"
//               }
//             ]
//           ],
//         }
//     ]
// );