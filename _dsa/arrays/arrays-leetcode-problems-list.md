---
title: Arrays Leetcode Problems List
difficulty: ''
language: ''
tags: []
excerpt: '# Arrays'
---

# Arrays

A **step-by-step guide to mastering arrays** for DSA beginners, with 50+ curated LeetCode problems, ordered from easiest to medium difficulty, including prerequisites and concepts to know before solving each problem.

---

## Step 0: Fundamentals (Basics of Arrays)
**Goal:** Understand arrays, indexing, traversal, and basic operations.

| # | Problem | Difficulty | Prerequisites / Concepts |
|---|--------|-----------|--------------------------|
| 1 | [Find Maximum / Minimum in Array](https://leetcode.com/problems/maximum-product-subarray/) | Easy | Array traversal, comparing elements, iteration |
| 2 | [Sum of Array / Running Sum of 1D Array](https://leetcode.com/problems/running-sum-of-1d-array/) | Easy | Looping, cumulative sum, array indexing |
| 3 | [Linear Search / Search Insert Position](https://leetcode.com/problems/search-insert-position/) | Easy | Traversal, condition check, returning index |
| 4 | [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) | Easy | Brute-force, optional HashMap for optimization |
| 5 | [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) | Medium | Tracking max/min while traversing, basic DP concept |

---

## Step 1: Basic Array Manipulations
**Goal:** Learn in-place changes, swapping, and two-pointer basics.

| # | Problem | Difficulty | Prerequisites / Concepts |
|---|--------|-----------|--------------------------|
| 6 | [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | Easy | Two pointers, in-place modification |
| 7 | [Rotate Array](https://leetcode.com/problems/rotate-array/) | Easy | Array reversal, swapping, indexing |
| 8 | [Move Zeroes](https://leetcode.com/problems/move-zeroes/) | Easy | Two pointers, shifting elements in-place |
| 9 | [Reverse String / Array](https://leetcode.com/problems/reverse-string/) | Easy | Two pointers, swapping elements |
| 10 | [Replace Elements with Greatest Element on Right](https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/) | Easy | Array traversal, keeping track of max value |
| 11 | [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/) | Easy | Two pointers, merging arrays in-place |

---

## Step 2: Search & Sum Patterns
**Goal:** Learn brute-force and hash-based solutions.

| # | Problem | Difficulty | Prerequisites / Concepts |
|---|--------|-----------|--------------------------|
| 12 | [Two Sum](https://leetcode.com/problems/two-sum/) | Easy | Brute-force, HashMap for O(n) optimization |
| 13 | [Single Number](https://leetcode.com/problems/single-number/) | Easy | XOR trick or HashMap, counting frequency |
| 14 | [Intersection of Two Arrays II](https://leetcode.com/problems/intersection-of-two-arrays-ii/) | Easy | HashMap for counting, array traversal |
| 15 | [Running Sum of 1D Array](https://leetcode.com/problems/running-sum-of-1d-array/) | Easy | Prefix sum, array traversal |
| 16 | [Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/) | Easy | Index mapping, in-place marking |
| 17 | [Majority Element](https://leetcode.com/problems/majority-element/) | Easy | Counting frequency, HashMap or Boyer-Moore voting algorithm |
| 18 | [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/) | Easy | Prefix sums, array traversal |

---

## Step 3: Two-Pointer Technique
**Goal:** Solve problems efficiently by scanning from both ends or merging.

| # | Problem | Difficulty | Prerequisites / Concepts |
|---|--------|-----------|--------------------------|
| 19 | [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) | Medium | Two pointers, maximizing area, left/right moves |
| 20 | [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) | Easy | Two pointers from ends, skipping invalid characters |
| 21 | [Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array/) | Easy | Two pointers, merging sorted arrays |
| 22 | [Two Sum II - Input Array Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | Easy | Two pointers on sorted array |
| 23 | [3Sum](https://leetcode.com/problems/3sum/) | Medium | Sorting + two pointers, avoiding duplicates |
| 24 | [3Sum Closest](https://leetcode.com/problems/3sum-closest/) | Medium | Sorting + two pointers, minimize difference |
| 25 | [Remove Element](https://leetcode.com/problems/remove-element/) | Easy | Two pointers, in-place deletion |

---

## Step 4: Sliding Window / Subarray Problems
**Goal:** Learn efficient subarray handling techniques.

| # | Problem | Difficulty | Prerequisites / Concepts |
|---|--------|-----------|--------------------------|
| 26 | [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/) | Easy | Fixed-size sliding window, sum tracking |
| 27 | [Min Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) | Medium | Variable-size sliding window, sum tracking |
| 28 | [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Medium | Sliding window + HashMap for counts |
| 29 | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | Medium | Prefix sum + HashMap, sum counting |
| 30 | [Longest Subarray of 1's After Deleting One Element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/) | Medium | Sliding window, handling deletion |
| 31 | [Maximum Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/) | Medium | Sliding window with k flips |
| 32 | [Permutation in String](https://leetcode.com/problems/permutation-in-string/) | Medium | Sliding window, frequency map, string to array mapping |

---

## Step 5: Sorting + Two-Pointer Patterns
**Goal:** Combine sorting with pointers for intermediate problems.

| # | Problem | Difficulty | Prerequisites / Concepts |
|---|--------|-----------|--------------------------|
| 33 | [Merge Intervals](https://leetcode.com/problems/merge-intervals/) | Medium | Sorting by start time, merging ranges |
| 34 | [Find First and Last Position of Element](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) | Medium | Binary search, array boundaries |
| 35 | [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) | Medium | Modified binary search, sorted array logic |
| 36 | [3Sum Smaller](https://leetcode.com/problems/3sum-smaller/) | Medium | Sorting + two pointers, counting triplets |
| 37 | [Sort Colors](https://leetcode.com/problems/sort-colors/) | Medium | Dutch National Flag, two pointers |
| 38 | [Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/) | Easy | Sorting + two pointers, set intersection |

---

## Step 6: Advanced Beginner Patterns
**Goal:** Combine all techniques learned so far.

| # | Problem | Difficulty | Prerequisites / Concepts |
|---|--------|-----------|--------------------------|
| 39 | [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) | Medium | Tracking max/min, handling negative numbers |
| 40 | [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) | Medium | Two-pointer or left/right max arrays, water trapping logic |
| 41 | [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) | Medium | HashSet for O(n) sequence detection |
| 42 | [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) | Hard | Heap / priority queue, dynamic array |
| 43 | [Candy / Jump Game / Gas Station](https://leetcode.com/problems/jump-game/) | Medium | Greedy, DP, array traversal patterns |
| 44 | [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) | Medium | Prefix / suffix product, no division |
| 45 | [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) | Medium | HashMap + Heap, frequency counting |
| 46 | [Sort an Array](https://leetcode.com/problems/sort-an-array/) | Medium | Implementing QuickSort / MergeSort |
| 47 | [Find All Duplicates in an Array](https://leetcode.com/problems/find-all-duplicates-in-an-array/) | Medium | In-place marking, negative indexing trick |
| 48 | [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/) | Medium | Matrix traversal, in-place marking |
| 49 | [Rotate Image](https://leetcode.com/problems/rotate-image/) | Medium | Matrix manipulation, transpose + reverse |
| 50 | [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/) | Medium | Boundary simulation, traversal layers |
| 51 | [Diagonal Traverse](https://leetcode.com/problems/diagonal-traverse/) | Medium | Index calculation, array mapping |

---

This covers **50+ array problems** and teaches **all beginner-friendly array patterns**, including:
- Traversal & basic operations
- Two pointers
- Sliding window
- Prefix sums
- HashMap counting
- Sorting + two-pointer
- Matrix manipulation