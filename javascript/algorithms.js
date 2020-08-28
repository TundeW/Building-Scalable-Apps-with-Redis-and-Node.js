//Sorting problem: Bubble sort algorithm
arr = [1,4,7,3,2,6,3,2,9,5,2,1];

const bubbleSortAscending = (arr) =>{
  let isSorted = false
  while (!isSorted){
    isSorted = true
    for(let i = 1; i<arr.length; i++){
      if (arr[i-1] > arr[i]){

        isSorted = false
        let temp = arr[i-1]
        arr[i-1] = arr[i]
        arr[i] = temp
      }
    }
  }

  return arr

}

console.log('Ascending Order:', bubbleSortAscending(arr))



const bubbleSortDescending = (arr) =>{
  let isSorted = false
  while (!isSorted){
    isSorted = true
    for(let i = 1; i<arr.length; i++){
      if (arr[i-1] < arr[i]){

        isSorted = false
        let temp = arr[i-1]
        arr[i-1] = arr[i]
        arr[i] = temp
      }
    }
  }

  return arr

}

console.log('Descending Order:', bubbleSortDescending(arr))

//Searching problem: Linear search algorithm
 arr2 = [1,4,7,3,2,6,3,2,9,5,2,1];

const linearSearch = (arr, query) => {
    let output = null
    for(let i = 0; i < arr.length; i++){
        if (arr[i] === query){
            output = i
            break;
        }
    }

    return output
}

console.log('Linear Search:', linearSearch(arr2, 9))

//Searching problem: Binary search algorithm

const binarySearch = (arr, query) =>{
    let output = null
    arr.sort()
    console.log('Sorted array for binary search:', arr)
    let found = false
    let a=0
    let b= arr.length
    let prev_a = 0
    let prev_b = 0
    while(!found){
        let middleIndex = parseInt((a+b)/2)
        // console.log(`a: ${a}, b: ${b}, middle: ${middleIndex}, value: ${arr[middleIndex]}, query: ${query} prev_a: ${prev_a} prev_b: ${prev_b}`)
        if(a === prev_a && b === prev_b){
            break
        }
        if(middleIndex < 0 || middleIndex >= arr.length){
            break
        }
        if (arr[middleIndex] < query){
            prev_a = a
            prev_b = b
            a = middleIndex + 1
        }else if (arr[middleIndex] > query){
            prev_a = a
            prev_b = b
            b = middleIndex - 1
        } else if(arr[middleIndex] === query){
            output = middleIndex
            found = true
        }
    }

    return output
}

console.log('Binary Search:', binarySearch(arr2, 4))
