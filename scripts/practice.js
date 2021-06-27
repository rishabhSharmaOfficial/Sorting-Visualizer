




// This is the file that I am using to experiment and test js both vanilla and jquery
// Viewers can see the funcitons used in the project here.




// for getting the value of input sliders, both are working.
// https://codepen.io/sms-dev/pen/OJNgNOr
// 1.
// document.querySelector("#speed-slider").addEventListener("input", function(e) {
//     console.log(e.currentTarget.value);
// })
//2. 
// document.querySelector("#speed-slider").oninput = function() {
//     console.log(this.value);
// }

// swapping used in swapping function
// let a = 2, b = 3;
// [a, b] = [b, a];
// console.log(a, b);

// this will tell us when we are ready to render array
// window.addEventListener("load", function () {
//     console.log("load");
// });
// document.addEventListener("DOMContentLoaded", function () {
//     console.log("dom");
// });

// to get the array margin right
// window.addEventListener('resize', function(e) {
//     console.log(this.window.innerWidth);
// }, true)

// Sleep function helps to dalay the animation
// async function sleep(delay) {
//     await new Promise(done => setTimeout(() => done(), delay / 2));
// }

// returns a promise resolved when states changes to sort or unsorted
// async function sortWait() {
//     return new Promise(function checkState(resolve) {
//         setInterval(() => {
//             if (sort_state == "Sort") {
//                 resolve("Sort");
//             }
//             if (sort_state == "Unsorted") {
//                 resolve("Unsorted");
//             }
//         }, 100);
//     })
// }


