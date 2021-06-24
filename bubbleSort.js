async function sleep(delay) {
    await new Promise(done => setTimeout(() => done(), delay / 2));
}

async function sortWait() {
    return new Promise(function checkState(resolve) {
        setInterval(() => {
            if (sort_state == "Sort") {
                resolve("Sort");
            }
            if (sort_state == "Unsorted") {
                resolve("Unsorted");
            }
        }, 100);
    })
}

async function bubbleSort() {
    var i, j;
    await sleep(delay);
    loop:
    for (i = 0; i < size - 1; i++) {
        for (j = 0; j < size - i - 1; j++) {
            if (sort_state == "Pause") {
                let state = await sortWait();
                if (state == "Unsorted") {
                    // if(arr[0]) {
                    // arr[0].style.backgroundColor = UNSORTED; 
                    // setColor(0, UNSORTED);
                    // }
                    // break loop;
                    // isSorted = false;
                    sort_flag = false;
                    return;
                }
            }
            // else if(sort_state == "Unsorted") {
            //     break loop;
            // }
            console.log(i, j);
            // console.log(i, j);
            await sleep(delay);

            setColor(j, COMPARE);
            setColor(j + 1, COMPARE);
            await sleep(delay);

            if (arr[j] > arr[j + 1]) {
                swap(j, j + 1);
                await sleep(delay);
            }

            setColor(j, UNSORTED);
            setColor(j + 1, UNSORTED);
        }

        await sleep(delay);

        setColor(j, SORTED);
    }

    setColor(0, SORTED);
    // sorted();

    // TODO: set state to unsorted
}

async function insertionSort() {
    var i, j, key;
    await sleep(delay);

    setColor(0, SELECTED);
    await sleep(delay);

    setColor(0, SORTED);
    loop:
    for (i = 1; i < size; i++) {
        await sleep(delay);

        setColor(i, SELECTED);
        await sleep(delay);

        j = i - 1;
        key = arr[i];

        while (j >= 0 && arr[j] > key) {
            if (sort_state == "Pause") {
                let state = await sortWait();
                if (state == "Unsorted") {
                    // arr[0].style.backgroundColor = UNSORTED;
                    // break loop;
                    sort_flag = false;
                    return;
                }
            }


            setColor(j, COMPARE);
            await sleep(delay);

            swap(j, j + 1);
            setColor(j, SELECTED);
            setColor(j + 1, COMPARE);
            await sleep(delay);

            setColor(j + 1, SORTED);
            await sleep(delay);

            j--;
        }

        setColor(j + 1, SORTED);
    }
    // sorted();
}


async function selectionSort() {
    var i, j, min_idx;
    loop:
    for (i = 0; i < size - 1; i++) {
        await sleep(delay);

        min_idx = i;
        setColor(min_idx, SELECTED);

        for (j = i + 1; j < size; j++) {
            if (sort_state == "Pause") {
                let state = await sortWait();
                if (state == "Unsorted") {
                    // arr[0].style.backgroundColor = UNSORTED;
                    // break loop;
                    sort_flag = false;
                    return;
                }
            }

            await sleep(delay);

            setColor(j, COMPARE);

            await sleep(delay);

            if (arr[j] < arr[min_idx]) {
                setColor(min_idx, UNSORTED);
                min_idx = j;
                setColor(min_idx, SELECTED);
                await sleep(delay);
            }
            else
                setColor(j, UNSORTED);
        }

        await sleep(delay);

        if (min_idx != i) {
            setColor(i, COMPARE);
            await sleep(delay);

            setColor(min_idx, COMPARE);
            setColor(i, SELECTED);
            swap(min_idx, i);
            await sleep(delay);
        }

        setColor(min_idx, UNSORTED);
        setColor(i, SORTED);
    }
    setColor(size - 1, SORTED);
    // sorted();
}

async function merge(p, q, r) {
    if (sort_flag == false) {
        return;
    }

    if (sort_state == "Pause") {
        let state = await sortWait();
        if (state == "Unsorted") {
            // arr[0].style.backgroundColor = UNSORTED;
            // return;
            sort_flag = false;
            return;
        }
    }

    await sleep(delay);

    var i, j;
    var n1 = q - p + 1;
    var n2 = r - q;
    var L = [];
    var R = [];

    for (i = 0; i < n1; i++) {
        L.push(arr[p + i]);
        setColor(p + i, LEFT);
    }
    for (j = 0; j < n2; j++) {
        R.push(arr[q + j + 1]);
        setColor(q + j + 1, RIGHT);
    }

    L.push(Infinity);
    R.push(Infinity);

    i = 0;
    j = 0;

    for (var k = p; k <= r; k++) {

        if (sort_state == "Pause") {
            let state = await sortWait();
            if (state == "Unsorted") {
                // arr[0].style.backgroundColor = UNSORTED;
                // return;
                sort_flag = false;
                return;
            }
        }

        await sleep(delay);

        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }

        setHeight(k, arr[k] + "px");
        setColor(k, SELECTED);
    }

    await sleep(delay);

    if (p == 0 && r == size - 1)
        setColorRange(p, r, SORTED);
    else
        setColorRange(p, r, UNSORTED);
}

async function mergeSort(p, r) {
    if (sort_flag == false) {
        return;
    }
    if (p < r) {
        var q = Math.floor((p + r) / 2);

        await mergeSort(p, q);

        await mergeSort(q + 1, r);

        await merge(p, q, r);
    }
}





async function partition(p, r) {
    if(sort_flag == false) {
        return;
    }

    await sleep(delay);

    var i = p - 1;
    setColor(r, SELECTED);

    for (var j = p; j < r; j++) {

        if (sort_state == "Pause") {
            let state = await sortWait();
            if (state == "Unsorted") {
                sort_flag = false;
                return;
            }
        }


        await sleep(delay);

        if (arr[j] <= arr[r]) {
            i++;
            swap(i, j);
            setColor(j, RIGHT);
            setColor(i, LEFT);
        }
        else
            setColor(j, RIGHT);
    }

    if (i + 1 < r) {
        await sleep(delay);

        swap(i + 1, r);
        setColor(r, RIGHT);
        setColor(i + 1, SELECTED);
    }

    await sleep(delay);

    setColorRange(p, r, UNSORTED);

    return i + 1;
}

async function quicksort(p, r) {
    // if(sort_flag) {
    //     return;
    // }
    if (p < r) {

        console.log(p, r);
        var q = await partition(p, r);

        await quicksort(p, q - 1);

        if (sort_flag == false) {
            return;
        }
        setColorRange(p, q, SORTED);
        await quicksort(q + 1, r);
        if (sort_flag == false) {
            return;
        }
        setColorRange(q + 1, r, SORTED);
    }

    if (p == 0 && r == size - 1)
        await sleep(delay);
}


var heapSize;

function left(i) {
    return 2 * i + 1;
}

function right(i) {
    return 2 * i + 2;
}

async function maxHeapify(i) {
    if(sort_flag == false) {
        return;
    }
    if (sort_state == "Pause") {
        let state = await sortWait();
        if (state == "Unsorted") {
            // arr[0].style.backgroundColor = UNSORTED;
            // return;
            sort_flag = false;
            return;
        }
    }

    var l = left(i);
    var r = right(i);
    var largest, temp;

    setColor(i, COMPARE);
    if (l < heapSize)
        setColor(l, LEFT);
    if (r < heapSize)
        setColor(r, RIGHT);

    await sleep(delay);

    if (l < heapSize && arr[l] > arr[i])
        largest = l;
    else
        largest = i;

    if (r < heapSize && arr[r] > arr[largest])
        largest = r;

    if (l < heapSize)
        setColor(l, UNSORTED);
    if (r < heapSize)
        setColor(r, UNSORTED);
    setColor(largest, SELECTED);

    await sleep(delay);

    if (largest != i) {
        swap(i, largest);
        setColor(largest, COMPARE);
        setColor(i, SELECTED);
        await sleep(delay);

        setColor(largest, UNSORTED);
        setColor(i, UNSORTED);

        await maxHeapify(largest);
    }
    else
        setColor(i, UNSORTED);
}

async function buildMaxHeap() {
    heapSize = size;

    for (var i = Math.floor(size / 2) - 1; i >= 0; i--)
        await maxHeapify(i);
}

async function heapsort() {
    await sleep(delay);

    await buildMaxHeap();

    for (var i = size - 1; i > 0; i--) {
        if(sort_flag == false) {
            return;
        }
        setColor(0, SELECTED);
        setColor(i, COMPARE);
        await sleep(delay);

        setColor(0, COMPARE);
        setColor(i, SELECTED);
        swap(0, i);
        heapSize--;
        await sleep(delay);

        setColor(i, SORTED);

        await maxHeapify(0);
    }

    setColor(0, SORTED);
}






