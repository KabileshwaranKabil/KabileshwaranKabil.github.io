---
layout: post
title: "Day 8 of DSA: Advanced Sorting Algorithms"
date: 2026-01-09 00:00:00 +0530
categories: [DSA]
tags: [learning, cs, dsa, sorting, merge-sort, quick-sort, count-sort, divide-and-conquer]
---

## Introduction

After mastering basic sorting algorithms like Bubble Sort, Selection Sort, and Insertion Sort, it's time to explore more efficient and sophisticated sorting techniques. This article covers three advanced sorting algorithms: **Merge Sort**, **Quick Sort**, and **Count Sort**. These algorithms demonstrate important concepts like divide-and-conquer and non-comparison-based sorting.

---

## 1. Merge Sort

### What is Merge Sort?

Merge Sort is a **divide-and-conquer** algorithm that recursively divides the array into smaller subarrays, sorts them, and then merges them back together in sorted order. It's one of the most efficient sorting algorithms with consistent performance.

### Key Concepts

1. **Divide**: Split the array into two halves recursively until each subarray has only one element
2. **Conquer**: Sort individual elements (base case: single element is already sorted)
3. **Combine**: Merge the sorted subarrays back together in the correct order

### Algorithm Steps

1. If the array has 1 or 0 elements, it's already sorted (base case)
2. Find the middle point to divide the array into two halves
3. Recursively call merge sort on the first half
4. Recursively call merge sort on the second half
5. Merge the two sorted halves

### Visual Example

Let's sort: `[38, 27, 43, 3, 9, 82, 10]`

```
Initial Array: [38, 27, 43, 3, 9, 82, 10]

Step 1 - Divide:
                [38, 27, 43, 3, 9, 82, 10]
                /                        \
        [38, 27, 43, 3]              [9, 82, 10]
        /            \                /         \
    [38, 27]      [43, 3]         [9, 82]      [10]
    /     \        /    \         /     \
  [38]   [27]   [43]   [3]     [9]    [82]

Step 2 - Merge (sorting while merging):
    [27, 38]      [3, 43]         [9, 82]      [10]
        \            /                \         /
     [3, 27, 38, 43]              [9, 10, 82]
                \                    /
          [3, 9, 10, 27, 38, 43, 82]
```

### Java Implementation

```java
public class MergeSort {
    
    // Main function to sort array using merge sort
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            // Find the middle point
            int mid = left + (right - left) / 2;
            
            // Sort first and second halves
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            
            // Merge the sorted halves
            merge(arr, left, mid, right);
        }
    }
    
    // Merges two subarrays of arr[]
    // First subarray is arr[left..mid]
    // Second subarray is arr[mid+1..right]
    public static void merge(int[] arr, int left, int mid, int right) {
        // Find sizes of two subarrays to be merged
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        // Create temporary arrays
        int[] leftArray = new int[n1];
        int[] rightArray = new int[n2];
        
        // Copy data to temporary arrays
        for (int i = 0; i < n1; i++) {
            leftArray[i] = arr[left + i];
        }
        for (int j = 0; j < n2; j++) {
            rightArray[j] = arr[mid + 1 + j];
        }
        
        // Merge the temporary arrays back into arr[left..right]
        int i = 0, j = 0;  // Initial indexes of first and second subarrays
        int k = left;       // Initial index of merged subarray
        
        while (i < n1 && j < n2) {
            if (leftArray[i] <= rightArray[j]) {
                arr[k] = leftArray[i];
                i++;
            } else {
                arr[k] = rightArray[j];
                j++;
            }
            k++;
        }
        
        // Copy remaining elements of leftArray[] if any
        while (i < n1) {
            arr[k] = leftArray[i];
            i++;
            k++;
        }
        
        // Copy remaining elements of rightArray[] if any
        while (j < n2) {
            arr[k] = rightArray[j];
            j++;
            k++;
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        
        System.out.println("Original array:");
        printArray(arr);
        
        mergeSort(arr, 0, arr.length - 1);
        
        System.out.println("\nSorted array:");
        printArray(arr);
    }
    
    public static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}
```

### Complexity Analysis

| Case | Time Complexity | Explanation |
|------|----------------|-------------|
| **Best Case** | $O(n \log n)$ | Even if array is sorted, we still divide and merge |
| **Average Case** | $O(n \log n)$ | Consistent performance across all inputs |
| **Worst Case** | $O(n \log n)$ | Always divides array in half and merges |
| **Space Complexity** | $O(n)$ | Requires additional space for temporary arrays |

**Why $O(n \log n)$?**
- We divide the array $\log n$ times (height of recursion tree)
- At each level, we perform $O(n)$ comparisons during merging
- Total: $O(n) \times O(\log n) = O(n \log n)$

### Advantages
- Consistent $O(n \log n)$ performance
- Stable sort (maintains relative order of equal elements)
- Good for linked lists
- Predictable performance

### Disadvantages
- Requires $O(n)$ extra space
- Not in-place sorting
- Slower than Quick Sort in practice for arrays

---

## 2. Quick Sort

### What is Quick Sort?

Quick Sort is another **divide-and-conquer** algorithm that works by selecting a 'pivot' element and partitioning the array around it. Elements smaller than the pivot go to the left, and larger elements go to the right.

### Key Concepts

1. **Pivot Selection**: Choose a pivot element (commonly the last element)
2. **Partitioning**: Rearrange array so elements < pivot are on left, > pivot are on right
3. **Recursion**: Apply the same process to left and right subarrays

### Algorithm Steps

1. Choose a pivot element (various strategies: first, last, middle, random)
2. Partition the array around the pivot
3. Recursively sort the left partition (elements < pivot)
4. Recursively sort the right partition (elements > pivot)

### Visual Example

Let's sort: `[10, 80, 30, 90, 40, 50, 70]` (pivot = last element)

```
Initial: [10, 80, 30, 90, 40, 50, 70]  → pivot = 70

Partition 1:
  i starts at -1
  Compare 10 with 70: 10 < 70, i++, swap arr[0] with arr[0] → [10, 80, 30, 90, 40, 50, 70]
  Compare 80 with 70: 80 > 70, no swap
  Compare 30 with 70: 30 < 70, i++, swap arr[1] with arr[2] → [10, 30, 80, 90, 40, 50, 70]
  Compare 90 with 70: 90 > 70, no swap
  Compare 40 with 70: 40 < 70, i++, swap arr[2] with arr[4] → [10, 30, 40, 90, 80, 50, 70]
  Compare 50 with 70: 50 < 70, i++, swap arr[3] with arr[5] → [10, 30, 40, 50, 80, 90, 70]
  Place pivot: swap arr[4] with arr[6] → [10, 30, 40, 50, 70, 90, 80]
  
After Partition 1: [10, 30, 40, 50] [70] [90, 80]
                      ↓               ↓      ↓
                  Sort left      In place  Sort right

Continue recursively...
Final: [10, 30, 40, 50, 70, 80, 90]
```

### Java Implementation

```java
public class QuickSort {
    
    // Main function to sort array using quick sort
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // pi is partitioning index, arr[pi] is now at right place
            int pi = partition(arr, low, high);
            
            // Recursively sort elements before and after partition
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    // Partition function that places pivot at correct position
    // and places all smaller elements to left and all greater to right
    public static int partition(int[] arr, int low, int high) {
        // Choose the rightmost element as pivot
        int pivot = arr[high];
        
        // Index of smaller element (indicates right position of pivot found so far)
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            // If current element is smaller than the pivot
            if (arr[j] < pivot) {
                i++;
                // Swap arr[i] and arr[j]
                swap(arr, i, j);
            }
        }
        
        // Swap arr[i+1] and arr[high] (put pivot in correct position)
        swap(arr, i + 1, high);
        
        return i + 1;
    }
    
    // Utility function to swap two elements
    public static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {
        int[] arr = {10, 80, 30, 90, 40, 50, 70};
        
        System.out.println("Original array:");
        printArray(arr);
        
        quickSort(arr, 0, arr.length - 1);
        
        System.out.println("\nSorted array:");
        printArray(arr);
    }
    
    public static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}
```

### Advanced: Randomized Quick Sort

To avoid worst-case scenarios, we can randomly select the pivot:

```java
public static int randomizedPartition(int[] arr, int low, int high) {
    // Generate random index between low and high
    int random = low + (int)(Math.random() * (high - low + 1));
    
    // Swap random element with last element
    swap(arr, random, high);
    
    // Use standard partition
    return partition(arr, low, high);
}
```

### Complexity Analysis

| Case | Time Complexity | Explanation |
|------|----------------|-------------|
| **Best Case** | $O(n \log n)$ | Pivot always divides array into two equal halves |
| **Average Case** | $O(n \log n)$ | Good pivot selection on average |
| **Worst Case** | $O(n^2)$ | Pivot is always smallest/largest (already sorted array) |
| **Space Complexity** | $O(\log n)$ | Recursion stack space |

### Advantages
- In-place sorting (uses less space than Merge Sort)
- Very fast in practice
- Cache-friendly
- Tail recursion optimization possible

### Disadvantages
- Worst case $O(n^2)$ time complexity
- Not stable (relative order of equal elements may change)
- Performance depends on pivot selection

---

## 3. Count Sort

### What is Count Sort?

Count Sort is a **non-comparison based** sorting algorithm that works by counting the occurrences of each distinct element. It's extremely efficient when the range of input values is small compared to the number of elements.

### Key Concepts

1. **Counting**: Count the frequency of each element
2. **Cumulative Count**: Calculate cumulative sum to determine positions
3. **Placement**: Place elements in their correct positions based on counts

### When to Use Count Sort?

- When you know the range of input values (e.g., 0 to k)
- Range is not significantly larger than number of elements
- Elements are integers or can be mapped to integers
- **Example**: Sorting exam scores (0-100), ages (0-120), small alphabets

### Algorithm Steps

1. Find the maximum element in the array to determine the range
2. Create a count array of size `max + 1` initialized to 0
3. Count the frequency of each element
4. Calculate cumulative count (prefix sum)
5. Build the output array using the count array
6. Copy the output array back to the original array

### Visual Example

Let's sort: `[1, 4, 1, 2, 7, 5, 2]`

```
Step 1: Original array
Array: [1, 4, 1, 2, 7, 5, 2]
Max element = 7

Step 2: Create count array (size = 8, from 0 to 7)
Index:  0  1  2  3  4  5  6  7
Count: [0, 0, 0, 0, 0, 0, 0, 0]

Step 3: Count frequency of each element
After counting:
Index:  0  1  2  3  4  5  6  7
Count: [0, 2, 2, 0, 1, 1, 0, 1]
       ↑  ↑  ↑     ↑  ↑     ↑
       0  1  2  3  4  5  6  7 (values in array)
       
Step 4: Calculate cumulative count
Index:  0  1  2  3  4  5  6  7
Count: [0, 2, 4, 4, 5, 6, 6, 7]
  (0+0)(0+2)(2+2)(4+0)(4+1)(5+1)(6+0)(6+1)

Step 5: Build output array (traverse original array from right to left)
Process 2: count[2]=4, output[4-1]=2, count[2]=3 → [_, _, _, 2, _, _, _]
Process 5: count[5]=6, output[6-1]=5, count[5]=5 → [_, _, _, 2, _, 5, _]
Process 7: count[7]=7, output[7-1]=7, count[7]=6 → [_, _, _, 2, _, 5, 7]
Process 2: count[2]=3, output[3-1]=2, count[2]=2 → [_, _, 2, 2, _, 5, 7]
Process 1: count[1]=2, output[2-1]=1, count[1]=1 → [_, 1, 2, 2, _, 5, 7]
Process 4: count[4]=5, output[5-1]=4, count[4]=4 → [_, 1, 2, 2, 4, 5, 7]
Process 1: count[1]=1, output[1-1]=1, count[1]=0 → [1, 1, 2, 2, 4, 5, 7]

Final sorted array: [1, 1, 2, 2, 4, 5, 7]
```

### Java Implementation

```java
public class CountSort {
    
    // Main function to sort array using count sort
    public static void countSort(int[] arr) {
        int n = arr.length;
        
        // Find the maximum element in the array
        int max = arr[0];
        for (int i = 1; i < n; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        
        // Create count array to store count of each element
        int[] count = new int[max + 1];
        
        // Store count of each element
        for (int i = 0; i < n; i++) {
            count[arr[i]]++;
        }
        
        // Change count[i] so that it contains actual position
        // of this element in output array
        for (int i = 1; i <= max; i++) {
            count[i] += count[i - 1];
        }
        
        // Build the output array
        int[] output = new int[n];
        
        // Traverse from right to left to maintain stability
        for (int i = n - 1; i >= 0; i--) {
            output[count[arr[i]] - 1] = arr[i];
            count[arr[i]]--;
        }
        
        // Copy the output array to arr
        for (int i = 0; i < n; i++) {
            arr[i] = output[i];
        }
    }
    
    // Simplified version (not stable, but easier to understand)
    public static void countSortSimple(int[] arr) {
        int n = arr.length;
        
        // Find max element
        int max = arr[0];
        for (int i = 1; i < n; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        
        // Create count array
        int[] count = new int[max + 1];
        
        // Count frequencies
        for (int i = 0; i < n; i++) {
            count[arr[i]]++;
        }
        
        // Reconstruct the array
        int index = 0;
        for (int i = 0; i <= max; i++) {
            while (count[i] > 0) {
                arr[index++] = i;
                count[i]--;
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 4, 1, 2, 7, 5, 2};
        
        System.out.println("Original array:");
        printArray(arr);
        
        countSort(arr);
        
        System.out.println("\nSorted array:");
        printArray(arr);
        
        // Test with another example
        int[] arr2 = {4, 2, 2, 8, 3, 3, 1};
        System.out.println("\n\nOriginal array:");
        printArray(arr2);
        
        countSortSimple(arr2);
        
        System.out.println("\nSorted array (simple version):");
        printArray(arr2);
    }
    
    public static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
}
```

### Handling Negative Numbers

```java
public static void countSortWithNegatives(int[] arr) {
    int n = arr.length;
    
    // Find min and max
    int min = arr[0], max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }
    
    // Create count array with range
    int range = max - min + 1;
    int[] count = new int[range];
    int[] output = new int[n];
    
    // Store count (shift by min to handle negatives)
    for (int i = 0; i < n; i++) {
        count[arr[i] - min]++;
    }
    
    // Cumulative count
    for (int i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    // Copy back
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}
```

### Complexity Analysis

| Aspect | Complexity | Explanation |
|--------|-----------|-------------|
| **Time Complexity** | $O(n + k)$ | n = array size, k = range of values |
| **Space Complexity** | $O(n + k)$ | For count array and output array |
| **Best/Average/Worst** | $O(n + k)$ | Consistent performance |

**Note**: When $k = O(n)$, Count Sort runs in $O(n)$ time, making it faster than comparison-based sorts!

### Advantages
- **Linear time** complexity when range is small
- **Stable** sorting algorithm
- Not comparison-based
- Useful for sorting in a limited range

### Disadvantages
- Only works with **integers** or elements that can be mapped to integers
- **Space inefficient** when range (k) is very large
- Not suitable when range >> number of elements
- Can't be used for floating-point numbers directly

---

## Comparison of All Three Algorithms

| Algorithm | Time (Best) | Time (Avg) | Time (Worst) | Space | Stable | In-Place |
|-----------|-------------|------------|--------------|-------|--------|----------|
| **Merge Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Yes | No |
| **Quick Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | No | Yes |
| **Count Sort** | $O(n + k)$ | $O(n + k)$ | $O(n + k)$ | $O(n + k)$ | Yes | No |

### When to Use Which?

**Use Merge Sort when:**
- You need guaranteed $O(n \log n)$ performance
- Stability is important
- Sorting linked lists
- External sorting (sorting large files)

**Use Quick Sort when:**
- Average-case performance is priority
- In-place sorting is needed
- Sorting arrays (cache-friendly)
- Not dealing with already sorted data

**Use Count Sort when:**
- Elements are integers in a small range
- Need linear time complexity
- Sorting ages, grades, small character sets
- Range (k) is comparable to n

---

## Practice Problems

### Merge Sort
1. Sort a linked list using merge sort
2. Count inversions in an array (pairs where i < j but arr[i] > arr[j])
3. Implement merge sort for descending order
4. Merge K sorted arrays

### Quick Sort
1. Find Kth smallest element using Quick Select
2. Implement 3-way Quick Sort (for arrays with many duplicates)
3. Sort an array of 0s, 1s, and 2s (Dutch National Flag problem)
4. Implement iterative Quick Sort

### Count Sort
1. Sort characters in a string
2. Sort an array where elements are in range 1 to n²
3. Implement Radix Sort using Count Sort as subroutine
4. Sort array by frequency of elements

---

## Key Takeaways

1. **Merge Sort**: Reliable divide-and-conquer with guaranteed $O(n \log n)$ but needs extra space
2. **Quick Sort**: Fast in-place sorting, but worst case can be $O(n^2)$ (use randomization!)
3. **Count Sort**: Lightning-fast $O(n)$ for integers in small range, but not general-purpose
4. **Divide and Conquer**: A powerful technique - break problems into smaller pieces
5. **Trade-offs**: Time vs Space, Stability vs Speed, General vs Specialized

Understanding these advanced sorting algorithms opens doors to solving complex problems efficiently. Practice implementing them and recognize when each is most appropriate!

---
