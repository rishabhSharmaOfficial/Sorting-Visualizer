
# Sorting Visualizer web app

This is a sorting visualizer web application that helps to visualize various sorting algorithms (duh!?) in a very aesthetic manner. 
The Sorting algorithms visualized are: 
* [Bubble Sort](https://www.geeksforgeeks.org/bubble-sort/)
* [Selection Sort](https://www.geeksforgeeks.org/selection-sort/)
* [Insertion Sort](https://www.geeksforgeeks.org/insertion-sort/)
* [Merge Sort](https://www.geeksforgeeks.org/merge-sort/)
* [Quick Sort](https://www.geeksforgeeks.org/quick-sort/)
* [Heap Sort](https://www.geeksforgeeks.org/heap-sort/)

## Tech-Stack

* HTML 5
* CSS
* Vanilla Js
* Bootstrap ( Sliders )

## Prerequisite concepts
* Sorting algorithms
* [Promises](https://javascript.info/async) 
	* new Promise
	* async-await 
* Recursion
* Understanding of how dividing a process into different **states** works.

_These all concepts are frequently used in the project so strong knowledge of these concepts is required_.


# Documentation

Following is a brief documentation of the Sorting Visualizer application. Concepts such as states, promise functions, etc. will be discussed.

## States

A state is as the name says describes the current state the program is in and is necessary and sufficient to conclude the program. In this project there are 4 states that follows the conditions namely: 

**1. Unsorted**
	Unsorted state is achieved when the array is unsorted. The program gets to this state when the user just opened the website or when the array is sorted and the user desires an new random array so *randomize* button is clicked

![Unsorted state image](https://github.com/Aliencode-R/Sorting-Visualizer-/blob/master/images/unsorted.PNG)

**2.Sorting**
	The program is in the *Sorting State* when the array is getting sorted by any algorithm.
The program can get to this state either when the program was in unsorted state and the sort button was clicked or when the program was in paused state and the sort button was clicked.

![Sorting](https://github.com/Aliencode-R/Sorting-Visualizer-/blob/master/images/Sorting.PNG)

**3.Paused**
	The program is in the *Paused state* when the array is idle. The Paused state is achieved when the programs was getting sorted and the user pressed the pause button or the array was getting sorted but the user clicked the pause button.
	
![Pause](https://github.com/Aliencode-R/Sorting-Visualizer-/blob/master/images/pause.PNG)

**4. Sorted**
	The program is in the *Sorted State* when the array is fully sorted. It can be only achieved if the user allowed the array to get sorted till the end.

![Sorted](https://github.com/Aliencode-R/Sorting-Visualizer-/blob/master/images/Sorted.PNG)

## Control Flow through buttons

The program is being controlled by two buttons namely: Sort/Pause and randomize button. 

**Randomize button:**
User can only click randomize button in the sorted, paused ,and unsorted states. As soon as the randomize button is clicked the program gets in unsorted state. This button is disabled in the sorting state.

**Sort/Pause Button:**
Sort/Pause button is a single button that is acting as two different buttons which perform different tasks that too in different states. User can click the sort button in unsorted or paused state, as soon as the button is clicked the sort button is disabled and the pause button is enabled which indicates the program is in paused state.

![Control Flow](https://github.com/Aliencode-R/Sorting-Visualizer-/blob/master/images/states.PNG)

*The following table shows which button/slider is active in which state*:
![table](https://github.com/Aliencode-R/Sorting-Visualizer-/blob/master/images/table.PNG)

## Recursion for Sorted State

*sort_flag* is turned on and then called for  sorting by the algorithm the user selected. If the user interrupts the sorting process by pausing and pressing the randomize button the algorithm will be immediately stopped and turn or the flag. 
If the flag is still turned on after the program gets executed that means the array is sorted and the program is in sorted state else the array is not sorted completely and is in unsorted state.
```
sort_flag = true;
sorting_algorithm();
if(sort_flag) {
	 // the array is completely sorted.
	 sorted(); // function to change state to sorted.
}
```
## Delaying animation

The speed of the sorting process can be changed by the user at any point in time even when the program is in sorting state.
This is achieved by the **sleep** method which relies on the concept of **promises** which further depends on setTimeout function to induce synchronicity in the sorting process.
```
// Sleep function helps to dalay the animation
async  function  sleep(delay) {
	await  new  Promise(done  => setTimeout(()  => done(), delay  /  2));
}
```

## Pause Button Role

Once the user presses the pause button the sorting will come to a halt and the program will get to the pause state. In the pause state, the program is waiting for the user to either press the sort button or to randomize the array. If the user presses the sort button the sorting process will resume but if randomize button is pressed, the new random array will be rendered and the previous process will be discarded.
This functionality is achieved by following code:
```
// returns a promise resolved when states changes to sort or unsorted
async  function  sortWait() {
	return  new  Promise(function  checkState(resolve) {
		setInterval(()  =>  {
			if  (sort_state  ==  "Sort")  {
				resolve("Sort");
			}
			if  (sort_state  ==  "Unsorted")  {
				resolve("Unsorted");
			}	
		}, 100);
	})
}
// followeing piece of code will be helpful to check pause state.
// if the program is in pause state it will wait for sortWait() function to 
// return a promise resolved with the current state.
if (sort_state  ==  "Pause") {
	let  state  =  await sortWait();
	if (state  ==  "Unsorted") {
		sort_flag  =  false;
		return;
	}
}
```

# How to Contribute
* Add more algorithms ( shell sort, radix sort, binary search maybe?).
* Improve documentation.
* or Any other creative feature is encouraged.

*[Contact me](https://www.linkedin.com/in/rishabh-sharma-0b5458191/) for any type of query.*
