---
title: Explanation
difficulty: ''
language: Java
tags: []
excerpt: '## Concatenation Of Array'
---

## Concatenation Of Array

Given an integer array nums of length n, you want to create an array ans of length 2n where ans[i] == nums[i] and ans[i + n] == nums[i] for 0 <= i < n (0-indexed).

Specifically, ans is the concatenation of two nums arrays.

Return the array ans.


Example 1:

Input: nums = [1,2,1]
Output: [1,2,1,1,2,1]
Explanation: The array ans is formed as follows:
- ans = [nums[0],nums[1],nums[2],nums[0],nums[1],nums[2]]
- ans = [1,2,1,1,2,1]
Example 2:

Input: nums = [1,3,2,1]
Output: [1,3,2,1,1,3,2,1]
Explanation: The array ans is formed as follows:
- ans = [nums[0],nums[1],nums[2],nums[3],nums[0],nums[1],nums[2],nums[3]]
- ans = [1,3,2,1,1,3,2,1]
 

Constraints:
n == nums.length
1 <= n <= 1000
1 <= nums[i] <= 1000 

## Approach
1. Create an output array `ans` of the  length of 2*n (n : length of nums array).
2. For each index `i`, set `ans[i]` to the element located at index `nums[i]` in `nums`.
3. For each index `i`, set `ans[i+n]` to the element located at index `nums[i]` in `nums`.
4. Return `ans`.


## Complexity
### Time Complexity: O(n)
- The algorithm uses two separate loops
- First loop: iterates through n elements → O(n)
- Second loop: iterates through n elements → O(n)
- Total: O(n) + O(n) = O(n) (constant factors are dropped)

### Space Complexity: O(n)
- A new output array ans of size 2n is created
- O(2n) = O(n) (constant factors are dropped)



## Code (Java)
```java
class Solution {
    public int[] getConcatenation(int[] nums) {
        int n=nums.length;
        int[] ans= new int[2*n];
        for(int i=0;i<n;i++){
            ans[i]=nums[i];
        }
        for(int i=0;i<n;i++){
            ans[i+n]=nums[i];
        }
        return ans;
    }
}
```
