async function sleep(delay) {
    await new Promise(done => setTimeout(() => done(), delay / 2));
}

async function bubbleSort() {
    var i, j;
    await sleep(delay);

    for (i = 0; i < size - 1; i++) {
        for (j = 0; j < size - i - 1; j++) {
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
}