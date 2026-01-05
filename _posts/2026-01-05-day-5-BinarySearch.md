---
layout: post
title: "Day 5 of DSA: Binary Search"
date: 2026-01-05 00:00:00 +0530
categories: [DSA]
tags: [learning, cs, dsa]
---

Binary search is an efficient searching algorithm that works on **sorted arrays**. Also known as logarithmic search, it dramatically reduces search time by repeatedly dividing the search space in half.

### Key Characteristics
- **Time Complexity**: O(log n) - much faster than linear search for large datasets
- **Space Complexity**: O(1) for iterative, O(log n) for recursive (due to call stack)
- **Prerequisite**: Array must be sorted
- **Best use**: Large sorted datasets where fast lookups are needed

### How Binary Search Works

Instead of checking every element, binary search:
1. Starts with the middle element of the sorted array
2. Compares the target with the middle element
3. If equal, returns the index
4. If target is smaller, searches the left half
5. If target is larger, searches the right half
6. Repeats until the element is found or the search space is empty

**Key Insight**: Each comparison eliminates half of the remaining elements, leading to logarithmic time complexity.

### Pseudo-code (Iterative)
```
left = 0, right = n - 1
while left <= right:
    mid = left + (right - left) / 2
    if array[mid] == target:
        return mid
    else if array[mid] < target:
        left = mid + 1
    else:
        right = mid - 1
return -1  # not found
```

### Example Walkthrough

**Array**: [1, 3, 5, 7, 9, 11, 13], **target** = 7

1. **Initial**: left = 0, right = 6, mid = 3
   - array[3] = 7 ✓ **Found at index 3!**

**Array**: [1, 3, 5, 7, 9, 11, 13], **target** = 9

1. **Step 1**: left = 0, right = 6, mid = 3
   - array[3] = 7 < 9 → search right half
2. **Step 2**: left = 4, right = 6, mid = 5
   - array[5] = 11 > 9 → search left half
3. **Step 3**: left = 4, right = 4, mid = 4
   - array[4] = 9 ✓ **Found at index 4!**

### Important Edge Cases

- **Empty array** → return -1 immediately
- **Target smaller than first element** → return -1
- **Target larger than last element** → return -1
- **Duplicates** → returns one occurrence (position depends on implementation)
- **Integer overflow** → use `mid = left + (right - left) / 2` instead of `mid = (left + right) / 2`

### When to Use Binary Search

**Strengths**:
- Extremely fast for large sorted datasets
- Predictable performance (always O(log n))
- Memory efficient with iterative approach
- Can be adapted to solve many problem variations

**Limitations**:
- Requires sorted data (sorting takes O(n log n))
- Only works on arrays/lists with random access
- Not beneficial for small datasets (linear search is simpler)
- Overhead of maintaining sorted order if data changes frequently

### Recursive vs Iterative

Both approaches work, but iterative is generally preferred:
- **Iterative**: Better space complexity O(1), no stack overflow risk
- **Recursive**: More elegant code, uses O(log n) space for call stack

### Visualize Binary Search
Try this tool for step-by-step animations: **[DSA Visualizer](https://www.dsavisualizer.in/visualizer/searching)**

1. When the element is present:
<video controls width="100%">
    <source src="/assets/video/binary-search-visualize-1.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

2. When the element is absent:
<video controls width="100%">
    <source src="/assets/video/binary-search-visualize-2.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

### Code Implementation

![Binary Search](/assets/images/arrays/BinarySearch-code.png)
![Binary Search Recursive](/assets/images/arrays/binarySearch-recursive.png)

### Practice Problems (LeetCode)

- [704. Binary Search](https://leetcode.com/problems/binary-search/) - Classic implementation
- [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/) - Finding insertion point
- [34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) - Handling duplicates
- [69. Sqrt(x)](https://leetcode.com/problems/sqrtx/) - Binary search on answer
- [278. First Bad Version](https://leetcode.com/problems/first-bad-version/) - Binary search variant

### Key Takeaways

1. Binary search is **O(log n)** - incredibly efficient for large datasets
2. **Requires sorted data** - this is non-negotiable
3. **Divide and conquer** approach halves the search space each iteration
4. Watch for **integer overflow** when calculating mid
5. Master the **invariant**: maintaining correct left/right boundaries
6. Understand variations: first occurrence, last occurrence, closest element