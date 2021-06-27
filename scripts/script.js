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

// variable to check the sorting animation is shorted or not
let sort_flag = true;

let size; // most recent size of array
let delay;

let arr = [];

let array_container_width;
let element_width;
let element_width_max;
let margin_element;

let algo_selected;
let sort_state = "Unsorted";
let isSorted = false;

let createArray = () => {
    arr = [];
    array.innerHTML = "";
    for (let i = 0; i < size; i++) {
        let ele = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
        arr.push(ele);
        let element = document.createElement("div");
        element.setAttribute("id", "e" + i);
        element.setAttribute("class", "element");
        element.style.backgroundColor = UNSORTED;
        element.style.width = element_width.toString() + "px";
        element.style.height = ele.toString() + "px";
        element.style.marginLeft = margin_element + 'px';
        element.style.marginRight = margin_element + 'px';
        array.appendChild(element);
    }
}

let setHeight = (id, height) => {
    document.querySelector("#e" + id).style.height = height;
}

let setColor = (id, color) => {
    document.querySelector("#e" + id).style.backgroundColor = color;
}

let setColorRange = (p, r, color) => {
    for (let i = p; i <= r; i++) {
        document.querySelector("#e" + i).style.backgroundColor = color;
    }
}

let swap = (a, b) => {
    [arr[a], arr[b]] = [arr[b], arr[a]];
    let h1 = document.querySelector("#e" + a).style.height;
    let h2 = document.querySelector("#e" + b).style.height;
    setHeight(a, h2);
    setHeight(b, h1);
}

let updateValues = () => {
    array_container_width = arrayContainer.getBoundingClientRect().width;

    element_width_max = Math.floor(array_container_width / 20);
    margin_element = 2;
    if (window.innerWidth < 1200) {
        margin_element = 1;
    }

}
let findElementWidth = () => {
    array_container_width = arrayContainer.getBoundingClientRect().width;
    element_width = Math.floor(array_container_width / size);
    element_width -= 2 * margin_element;

    if (element_width > element_width_max) {
        element_width = element_width_max;
    }
}

window.addEventListener("load", function () {
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
        isSorted = false;
        disableElements(false);
        createArray();
    })
    let algoButtons = this.document.querySelectorAll(".algo-btn");
    for (let i = 0; i < algoButtons.length; i++) {
        algoButtons[i].addEventListener("click", function (e) {
            e.preventDefault();
            algo_selected = e.currentTarget.innerHTML;
            let activeAlgo = document.querySelector(".algo-btn-active");
            if (activeAlgo) {
                activeAlgo.classList.remove("algo-btn-active");
            }
            e.currentTarget.classList.add("algo-btn-active");
        })


        let theoryContainer = document.querySelector("#theory-container");
        algoButtons[i].addEventListener("mouseover", function(e) {
            theoryContainer.style.display = "flex";
            theoryContainer.innerText = algoTheory[i].theory;
        })
        algoButtons[i].addEventListener("mouseleave", function(e) {
            theoryContainer.style.display = "none";
        })
    }

    function disableElements(status) {
        randomBtn.disabled = status;
        if (status == true || sort_state == "Unsorted") {
            sizeSlider.disabled = status;

            for (let i = 0; i < algoButtons.length; i++) {
                algoButtons[i].disabled = status;
            }
        }
    }

    function showModal(text) {
        if (!document.querySelector("#no-algo-warning")) {

            let modal = document.createElement("h5");
            modal.setAttribute("id", "no-algo-warning");
            modal.setAttribute("class", "display-flex");
            modal.innerText = text;
            arrayContainer.appendChild(modal);
            setTimeout(() => {
                modal.remove();
            }, 1000);
        }
    }

    sortBtn.addEventListener("click", async function () {
        if (algo_selected) {
            if (isSorted) {
                // modal
                showModal("Sorted");
                disableElements(false);
                sortBtn.innerText = "Sort";
                sort_state = "Pause";
            } else if (sort_state == "Sort") {
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

                function sorted() {
                    isSorted = true;
                    sortBtn.click();
                }

                sort_flag = true;
                if (algo_selected == "Bubble Sort") {
                    await bubbleSort();
                }
                else if (algo_selected == "Selection Sort") {
                    await selectionSort();
                }
                else if (algo_selected == "Insertion Sort") {
                    await insertionSort();
                }
                else if (algo_selected == "Merge Sort") {
                    await mergeSort(0, size - 1);
                }
                else if (algo_selected == "Quicksort") {
                    await quicksort(0, size - 1);
                }
                else if (algo_selected == "Heapsort") {
                    await heapsort();
                }
                if (sort_flag) {
                    sorted();
                }
            }
        } else {
            showModal("No Algorithm Selected!");
        }
    })
    document.querySelector("#speed-slider").addEventListener("input", function (e) {
        delay = WAITING_TIME * Math.pow(2, MAX_SPEED - e.currentTarget.value);
    })
    document.querySelector("#size-slider").addEventListener("input", function (e) {
        size = e.currentTarget.value;
        findElementWidth();
        createArray();
    })

    window.addEventListener('resize', function (e) {
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

