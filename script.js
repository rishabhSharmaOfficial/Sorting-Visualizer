let array = document.querySelector("#array");
let sizeSlider = document.querySelector("#size-slider");
let speedSlider = document.querySelector("#speed-slider");
let arrayContainer = document.querySelector("#array-container");
let sortBtn = document.querySelector("#sort");
let randomBtn = document.querySelector("#randomize");

// size slider 
const MIN_SIZE = 4;
const MAX_SIZE = 64;
const DEFAULT_SIZE = 32;
// speed slider
const MIN_SPEED = 1;
const MAX_SPEED = 6;
const DEFAULT_SPEED = 3;
// minimum and maximum possible values in array
const MIN = 20;
const MAX = 300;

const WAITING_TIME = 100;
// colors used for array elements
const UNSORTED = 'deepskyblue';
const SORTED = 'mediumspringgreen';
const COMPARE = 'crimson';
const SELECTED = 'blueviolet';
const LEFT = 'gold';
const RIGHT = 'orangered';

let size; // most recent size of array
let delay;

let arr = [];

let array_container_width;
let element_width;
let element_width_max;
let margin_element;

let algo_selected;
let sort_state = "Unsorted";

let createArray = () => {
    arr = [];
    array.innerHTML = "";
    for (let i = 0; i < size; i++) {
        let ele = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
        arr.push(ele);
        // console.log(ele.toString() + 'px');

        let element = document.createElement("div");
        element.setAttribute("id", "e" + i);
        element.setAttribute("class", "element");
        // setTimeout(() => {
            element.style.backgroundColor = UNSORTED;
        // }, 1);
        // element.style.backgroundColor = UNSORTED;
        element.style.width = element_width.toString() + "px";
        element.style.height = ele.toString() + "px";
        element.style.marginLeft = margin_element + 'px';
        element.style.marginRight = margin_element + 'px';
        array.appendChild(element);
    }
}
// createArray();

let setHeight = (id, height) => {
    document.querySelector("#e" + id).style.height = height;
}

let setColor = (id, color) => {
    document.querySelector("#e" + id).style.backgroundColor = color;
}

let setColorRange = (p, r, color) => {
    for (let i = p; i <= r; i++) {
        document.querySelector("#e" + i).style.backgroundColor = color;// TODO: style
        // console.log("scr");
    }
}

let swap = (a, b) => {
    // console.log("first", arr[a], arr[b]);
    [arr[a], arr[b]] = [arr[b], arr[a]];
    let h1 = document.querySelector("#e" + a).style.height;
    let h2 = document.querySelector("#e" + b).style.height;
    // console.log(h1, h2);
    // set
    // console.log(document.querySelector("#e" + a).height);
    // console.log(document.querySelector("#e" + b).height);
    setHeight(a, h2);
    setHeight(b, h1);
    // console.log(document.querySelector("#e" + a).height);
    // console.log(document.querySelector("#e" + b).height);
    // console.log("second", arr[a], arr[b]);
}

let updateValues = () => {
    // array_container_width = Math.floor(arrayContainer.getAttribute("width"));
    array_container_width = arrayContainer.getBoundingClientRect().width;

    element_width_max = Math.floor(array_container_width / 20);
    margin_element = 2;
    if (window.innerWidth < 1200) {
        margin_element = 1;
    }

}
// let idx = 0;
let findElementWidth = () => {
    array_container_width = arrayContainer.getBoundingClientRect().width;
    // console.log(arrayContainer.style);
    // console.log(arrayContainer.style.width);
    // idx++;
    // console.log(idx , array_container_width);
    element_width = Math.floor(array_container_width / size);
    // console.log("first", element_width, margin_element);
    element_width -= 2 * margin_element;

    if (element_width > element_width_max) {
        element_width = element_width_max;
    }
    // console.log(element_width);
}

window.addEventListener("load", function () {
    // console.log("load");
    sizeSlider.setAttribute("min", MIN_SIZE);
    sizeSlider.setAttribute('max', MAX_SIZE);
    sizeSlider.setAttribute('value', DEFAULT_SIZE);

    speedSlider.setAttribute('min', MIN_SPEED);
    speedSlider.setAttribute('max', MAX_SPEED);
    speedSlider.setAttribute('value', DEFAULT_SPEED);

    size = DEFAULT_SIZE;
    delay = WAITING_TIME * Math.pow(2, MAX_SPEED - DEFAULT_SPEED);

    updateValues();
    findElementWidth();
    createArray();

    randomBtn.addEventListener("click", function () {
        sort_state = "Unsorted";
        disableElements(false);
        // setTimeout(() => {    
        createArray();
        // arr[0].style.backgroundColor = UNSORTED;
        // }, 80);
    })
    let algoButtons = this.document.querySelectorAll(".algo-btn");
    // console.log(algoButtons);
    for (let i = 0; i < algoButtons.length; i++) {
        // console.log(algoButtons[i]);
        algoButtons[i].addEventListener("click", function (e) {
            e.preventDefault();
            algo_selected = e.currentTarget.innerHTML;
            // console.log(algo_selected);
            let activeAlgo = document.querySelector(".algo-btn-active");
            if (activeAlgo) {
                activeAlgo.classList.remove("algo-btn-active");
            }
            e.currentTarget.classList.add("algo-btn-active");

            document.querySelector("#no-algo-warning").classList.remove("display-flex");
            document.querySelector("#no-algo-warning").classList.add("display-none");
        })
    }

    function disableElements(status) {
        // sortBtn.disabled = status;
        randomBtn.disabled = status;
        console.log(status, sort_state);
        if (status == true || sort_state == "Unsorted") {
            sizeSlider.disabled = status;

            for (let i = 0; i < algoButtons.length; i++) {
                algoButtons[i].disabled = status;
            }
        }
        // sizeSlider.disabled = status;

        // for (let i = 0; i < algoButtons.length; i++) {
        //     algoButtons[i].disabled = status;
        // }
    }

    sortBtn.addEventListener("click", async function () {
        // sortBtn.disabled = true;
        // randomBtn.disabled = true;
        // sizeSlider.disabled = true;

        // for(let i = 0; i < algoButtons.length; i++) {
        //     algoButtons[i].disabled = true;
        // }
        // disableElements(true);
        console.log("here");
        if (algo_selected) {
            // disableElements(true);
            if (sort_state == "Sort") {
                disableElements(false);
                sortBtn.innerText = "Sort";
                sort_state = "Pause";
            } else if (sort_state == "Pause") {
                disableElements(true);
                sortBtn.innerText = "Pause";
                sort_state = "Sort";
            } else {
                disableElements(true);
                sortBtn.innerText = "Pause";
                sort_state = "Sort";
                setColorRange(0, size - 1, UNSORTED);
                if (algo_selected == "Bubble Sort")
                    await bubbleSort();
                else if (algo_selected == "Selection Sort") {
                    // await selectionSort();
                }
                else if (algo_selected == "Insertion Sort") {
                    // await insertionSort();
                }
                else if (algo_selected == "Merge Sort") {
                    // await mergeSort(0, size - 1);
                }
                else if (algo_selected == "Quicksort") {
                    // await quicksort(0, size - 1);
                }
                else if (algo_selected == "Heapsort") {
                    // await heapsort();
                }
            }
            // disableElements(false);
        } else {
            document.querySelector("#no-algo-warning").classList.remove('display-none');
            document.querySelector("#no-algo-warning").classList.add('display-flex')
        }

        // setColorRange(0, size - 1, UNSORTED);
        // if (algo_selected == "Bubble Sort")
        //     await bubbleSort();
        // else if (algo_selected == "Selection Sort") {
        //     // await selectionSort();
        // }
        // else if (algo_selected == "Insertion Sort") {
        //     // await insertionSort();
        // }
        // else if (algo_selected == "Merge Sort") {
        //     // await mergeSort(0, size - 1);
        // }
        // else if (algo_selected == "Quicksort") {
        //     // await quicksort(0, size - 1);
        // }
        // else if (algo_selected == "Heapsort") {
        //     // await heapsort();
        // }
        // else {
        //     document.querySelector("#no-algo-warning").classList.remove('display-none');
        //     document.querySelector("#no-algo-warning").classList.add('display-flex');
        // }
        // disableElements(false);

        // for (let i = 0; i < algoButtons.length; i++) {
        //     algoButtons[i].disabled = false;
        // }

        // sortBtn.disabled = false;
        // randomBtn.disabled = false;
        // sizeSlider.disabled = false;
    })
    document.querySelector("#speed-slider").addEventListener("input", function (e) {
        // console.log(e.currentTarget.value);
        delay = WAITING_TIME * Math.pow(2, MAX_SPEED - e.currentTarget.value);
    })
    document.querySelector("#size-slider").addEventListener("input", function (e) {
        size = e.currentTarget.value;
        findElementWidth();
        createArray();
    })

    window.addEventListener('resize', function (e) {
        // console.log(this.window.innerWidth);
        if (array_container_width != Math.floor(arrayContainer.width)) {
            updateValues();

            findElementWidth();
            for (let i = 0; i < size; i++) {
                let element = this.document.querySelector("#e" + i);
                element.style.width = element_width.toString() + 'px';
                element.style.marginLeft = margin_element + 'px';
                element.style.marginRight = margin_element + 'px';
            }

        }
    }, true)

});

// TODO: dialog on algo btn hover
// ip array by user
// heading
// graph plot y axis
// disable selection