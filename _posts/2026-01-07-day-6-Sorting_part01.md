---
layout: post
title: "Day 6 of DSA: Sorting"
date: 2026-01-07 00:00:00 +0530
categories: [DSA]
tags: [learning, cs, dsa]
---

## What is Sorting?

Sorting is a fundamental operation that arranges elements of an array in a specific order - typically ascending or descending Each sorting technique has different trade-offs in terms of time complexity, space complexity, and practical performance.

## Sorting Techniques We'll Cover

- **Selection Sort**
- **Bubble Sort**
- **Insertion Sort**

---

## 1. Selection Sort

### Concept
Selection Sort divides the array into two parts: sorted and unsorted. It repeatedly finds the minimum element from the unsorted portion and places it at the beginning.

### Algorithm Steps
1. Find the minimum element in the unsorted portion
2. Swap it with the first element of the unsorted portion
3. Move the boundary between sorted and unsorted portions one element to the right
4. Repeat until the entire array is sorted

### Time Complexity
- **Best Case:** O(n²)
- **Average Case:** O(n²)
- **Worst Case:** O(n²)
- **Space Complexity:** O(1) - sorts in place

### Java Implementation
```java
public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;       
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            
            // Find minimum element in remaining unsorted array
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
        
            // Swap minimum element with current element
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}
```

### Characteristics
- **Simple and intuitive** - easy to understand and implement
- **Not stable** - may change the relative order of equal elements
- **Always O(n²)** regardless of input, so not efficient for large datasets

---

## 2. Bubble Sort

### Concept
Bubble Sort repeatedly steps through the array, compares adjacent elements, and swaps them if they're in the wrong order. This process "bubbles" the largest elements to the end with each pass.

### Algorithm Steps
1. Compare adjacent elements
2. Swap them if they're in the wrong order
3. Move to the next pair of adjacent elements
4. Repeat until no more swaps are needed

### Time Complexity
- **Best Case:** O(n) - when array is already sorted (with optimization)
- **Average Case:** O(n²)
- **Worst Case:** O(n²) - when array is sorted in reverse
- **Space Complexity:** O(1) - sorts in place

### Java Implementation
```java
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            
            // Last i elements are already in place
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap adjacent elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // If no swaps occurred, array is sorted
            if (!swapped) {
                break;
            }
        }
    }
}
```

### Characteristics
- **Simple but inefficient** - easy to understand but slow for large datasets
- **Stable sort** - maintains relative order of equal elements
- **Adaptive** - optimized version can detect already sorted arrays

---

## 3. Insertion Sort

### Concept
Insertion Sort builds the sorted array one item at a time. It iterates through an input array, and for each element, it finds the correct position in the sorted portion and inserts it there.

### Algorithm Steps
1. Start from the second element
2. Compare it with elements before it
3. Shift larger elements one position to the right
4. Insert the element in its correct position
5. Repeat for all elements

### Time Complexity
- **Best Case:** O(n) - when array is already sorted
- **Average Case:** O(n²)
- **Worst Case:** O(n²) - when array is sorted in reverse
- **Space Complexity:** O(1) - sorts in place

### Java Implementation
```java
public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        
        // Start from the second element
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            
            // Move elements greater than key one position ahead
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            
            // Insert key at its correct position
            arr[j + 1] = key;
        }
    }
}
```

### Characteristics
- **Efficient for small datasets** - performs well on small arrays
- **Stable sort** - maintains relative order of equal elements
- **Adaptive** - efficient when array is nearly sorted
- **Online** - can sort arrays as they receive new elements

---

## Comparison Table

| Technique | Best Case | Average Case | Worst Case | Stable | In-Place |
|-----------|-----------|--------------|-----------|--------|----------|
| Selection Sort | O(n²) | O(n²) | O(n²) | ❌ | ✅ |
| Bubble Sort | O(n) | O(n²) | O(n²) | ✅ | ✅ |
| Insertion Sort | O(n) | O(n²) | O(n²) | ✅ | ✅ |

---

## Key Takeaways

1. **Selection Sort** - Good for understanding sorting concepts, but not practical for production use
2. **Bubble Sort** - Educational value, inefficient in practice despite being simple
3. **Insertion Sort** - Good for small datasets and nearly sorted data, used in hybrid algorithms like Timsort

For large datasets, more advanced algorithms like **Merge Sort** (O(n log n)) or **Quick Sort** are preferred. The choice of sorting algorithm depends on the specific use case, data characteristics, and space/time constraints.

---

## Practice Exercises

1. Implement all three sorting algorithms and test them
2. Create a visualizer to see how each algorithm works step by step
3. Compare the number of comparisons and swaps for each algorithm on the same dataset
4. Try sorting arrays with duplicate elements and observe stability differences

---

## LeetCode Problems to Practice

### Easy Level
1. **[LeetCode 88 - Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)** - Merge two sorted arrays
   - Concepts: Sorting, Two Pointers
   - Difficulty: Easy

2. **[LeetCode 1346 - Check If N and Its Double Exist](https://leetcode.com/problems/check-if-n-and-its-double-exist/)** - Find if x and 2x exist in array
   - Concepts: Sorting, Hash Set
   - Difficulty: Easy

3. **[LeetCode 1356 - Sort Integers by The Number of 1 Bits](https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits/)** - Custom sorting logic
   - Concepts: Custom Comparators, Bit Manipulation
   - Difficulty: Easy

### Medium Level
1. **[LeetCode 75 - Sort Colors](https://leetcode.com/problems/sort-colors/)** - Sort array with 0, 1, 2
   - Concepts: Three-way Partition, Dutch National Flag Problem
   - Difficulty: Medium
   - Hint: Can be solved in one pass without traditional sorting

2. **[LeetCode 147 - Insertion Sort List](https://leetcode.com/problems/insertion-sort-list/)** - Sort linked list using insertion sort
   - Concepts: Linked List, Insertion Sort
   - Difficulty: Medium

3. **[LeetCode 179 - Largest Number](https://leetcode.com/problems/largest-number/)** - Arrange numbers to form largest number
   - Concepts: Custom Sorting, String Comparison
   - Difficulty: Medium

4. **[LeetCode 324 - Wiggle Sort II](https://leetcode.com/problems/wiggle-sort-ii/)** - Rearrange array in wiggle pattern
   - Concepts: Sorting, Partitioning
   - Difficulty: Medium

### Hard Level
1. **[LeetCode 4 - Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)** - Find median of two sorted arrays
   - Concepts: Binary Search, Sorted Arrays
   - Difficulty: Hard

2. **[LeetCode 315 - Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/)** - Count smaller elements
   - Concepts: Merge Sort, Binary Indexed Tree
   - Difficulty: Hard

3. **[LeetCode 912 - Sort an Array](https://leetcode.com/problems/sort-an-array/)** - Implement sorting algorithm from scratch
   - Concepts: All sorting algorithms
   - Difficulty: Medium
   - Best for practicing different sorting implementations

