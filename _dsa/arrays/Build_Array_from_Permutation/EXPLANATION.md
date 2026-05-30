---
title: Explanation
difficulty: ''
language: Java
tags: []
excerpt: '# Build Array from Permutation.'
---

# Build Array from Permutation.

## Problem in one line
Given a zero-based permutation `nums`, build `ans` where `ans[i] = nums[nums[i]]`.
 

## Approach
1. Create an output array `result` of the same length.
2. For each index `i`, set `ans[i]` to the element located at index `nums[i]` in `nums`.
3. Return `result`.

## Complexity
- **Time:** O(n) — one loop through the array.
- **Space:** O(n) — for the output array (cannot be avoided if you must return a new array).

## Code (Java)
```java
class Solution {
    public int[] buildArray(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        for (int i = 0; i < n; i++) {
            result[i] = nums[nums[i]];
        }
        return result;
    }
}
```
