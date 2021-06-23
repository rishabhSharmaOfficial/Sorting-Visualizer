async function sleep(delay) {
    await new Promise(done => setTimeout(() => done(), delay / 2));
}

async function sortWait() {
    return new Promise(function checkState(resolve) {
        setInterval(() => {
            if(sort_state == "Sort") {
                resolve("Sort");
            }
            if(sort_state == "Unsorted") {
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
            if(sort_state == "Pause") {
                let state = await sortWait();
                if(state == "Unsorted") {
                    arr[0].style.backgroundColor = UNSORTED; 
                    break loop;
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
    // TODO: set state to unsorted
}