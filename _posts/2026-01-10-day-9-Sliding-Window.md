---
layout: post
title: "Day 9 of DSA: Sliding Window - Arrays"
date: 2026-01-10 00:00:00 +0530
categories: [DSA]
tags: [learning, cs, dsa, sliding-window]
---
Sliding window is one of the most powerful techniques used in array and string-related problems. It helps optimize solutions by maintaining a subset of data and sliding it through the array to compute results efficiently.

## What is Sliding Window

The sliding window technique involves creating a "window" (a subarray or substring) that moves across the data structure. Instead of recalculating values for each possible subarray, we maintain the window and update it as we slide, reducing time complexity from O(n²) to O(n) in many cases.

Imagine a window of fixed or variable size that "slides" from left to right over the array, performing operations on the elements within the window.

## Why use?

- **Efficiency**: Reduces time complexity by avoiding redundant calculations.
- **Space**: Often uses O(1) extra space (excluding the input).
- **Applicability**: Ideal for problems involving subarrays/substrings with constraints like maximum sum, minimum length, or unique elements.
- **Common Use Cases**: Finding maximum/minimum in subarrays, longest substring with properties, etc.

## Types of Sliding Window

1. **Fixed Sliding Window**: The window size remains constant. E.g., find the maximum sum of any subarray of size K.
2. **Dynamic (Variable) Sliding Window**: The window size changes based on conditions. E.g., find the longest substring without repeating characters.

## Leetcode Problems on Sliding Window

Here are some classic LeetCode problems that use sliding window:

1. **Maximum Sum Subarray of Size K** (Fixed Window) - [LeetCode 1423](https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/) (similar concept)
2. **Longest Substring Without Repeating Characters** (Variable Window) - [LeetCode 3](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
3. **Minimum Size Subarray Sum** (Variable Window) - [LeetCode 209](https://leetcode.com/problems/minimum-size-subarray-sum/)
4. **Sliding Window Maximum** (Fixed Window with Deque) - [LeetCode 239](https://leetcode.com/problems/sliding-window-maximum/)
5. **Permutation in String** (Variable Window) - [LeetCode 567](https://leetcode.com/problems/permutation-in-string/)

## Code Implementation of Sliding Window

Let's implement a fixed window example: Maximum Sum Subarray of Size K.

### Java
```java
public class SlidingWindow {
    public static int maxSumSubarray(int[] arr, int k) {
        if (arr.length < k) return -1;
        int maxSum = 0;
        for (int i = 0; i < k; i++) {
            maxSum += arr[i];
        }
        int windowSum = maxSum;
        for (int i = k; i < arr.length; i++) {
            windowSum += arr[i] - arr[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }

    public static void main(String[] args) {
        int[] arr = {1, 4, 2, 10, 2, 3, 1, 0, 20};
        int k = 4;
        System.out.println("Maximum sum of subarray of size " + k + " is: " + maxSumSubarray(arr, k));
    }
}
```

### Python
```python
def max_sum_subarray(arr, k):
    if len(arr) < k:
        return -1
    max_sum = sum(arr[:k])
    window_sum = max_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum

# Example usage
arr = [1, 4, 2, 10, 2, 3, 1, 0, 20]
k = 4
print(f"Maximum sum of subarray of size {k} is: {max_sum_subarray(arr, k)}")
```

### C++
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

int maxSumSubarray(std::vector<int>& arr, int k) {
    if (arr.size() < k) return -1;
    int maxSum = 0;
    for (int i = 0; i < k; i++) {
        maxSum += arr[i];
    }
    int windowSum = maxSum;
    for (size_t i = k; i < arr.size(); i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = std::max(maxSum, windowSum);
    }
    return maxSum;
}

int main() {
    std::vector<int> arr = {1, 4, 2, 10, 2, 3, 1, 0, 20};
    int k = 4;
    std::cout << "Maximum sum of subarray of size " << k << " is: " << maxSumSubarray(arr, k) << std::endl;
    return 0;
}
```

## Things to Note

- **Edge Cases**: Handle arrays smaller than window size, empty arrays, and negative numbers.
- **Time Complexity**: O(n) for sliding window vs O(n²) for brute force.
- **Space Complexity**: Usually O(1), but may need O(n) for additional data structures like sets or maps in variable windows.
- **Common Mistakes**: Forgetting to update the window correctly (add new element, remove old one).
- **Advanced Variants**: Use deques for sliding window maximum to maintain order.
- **Practice**: Start with fixed windows, then move to variable ones. Visualize the window movement on paper.

