const algoTheory = [
    {
        "theory": `Bubble Sort
                        Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.
                        Worst Complexity: N ^ 2
                        Average Complexity: N ^ 2
                        Best Complexity: N
                        Space Complexity: 1
                        Method: Exchanging
                        Stable: Yes`
    },
    {
        "theory": `Selection Sort
                    Selection Sort is a sorting algorithm, specifically an in-place comparison sort. It has O time complexity, making it inefficient on large lists, and generally performs worse than the similar insertion sort
                    Worst Complexity :N ^ 2
                    Average Complexity :N ^ 2
                    Best Complexity :N ^ 2
                    Space Complexity :1
                    Method :Selection
                    Stable :No`
    },
    {
        "theory": `Insertion Sort
                    Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.
                    Worst Complexity :N ^ 2
                    Average Complexity :N ^ 2
                    Best Complexity :N
                    Space Complexity :1
                    Method :Insertion
                    Stable :Yes`
    }, 
    {
        "theory": `Merge Sort
                    Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.
                    Worst Complexity :N log N
                    Average Complexity :N log N
                    Best Complexity :N log N
                    Space Complexity :N
                    Method :Divide and Conquer
                    Stable :Yes`
    }, 
    {
        "theory": `QuickSort
                    Like Merge Sort, QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot.
                    Worst Complexity :N ^ 2
                    Average Complexity :N log N
                    Best Complexity :N log N
                    Space Complexity : log N ( depend on implementation)
                    Method :Divide and Conquer
                    Stable :No`
    }, 
    {
        "theory": `Heap Sort
                    Heap sort is a comparison based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end. We repeat the same process for remaining element.
                    Worst Complexity :N * log(N)
                    Average Complexity :N * log(N)
                    Best Complexity :N * log(N)
                    Space Complexity :1
                    Method :Selection
                    Stable :No`
    }
]
// console.log(algoTheory[0].BubbleSort);
// console.log(
function getTheory(algo) {
    // console.log(algoTheory[algo]);
    return algoTheory[algo][0];
}