---
title: Explanation
difficulty: ''
language: Text
tags: []
excerpt: '## Range Sum Query - Immutable - 303 [**Read my solution in leetcode**](../Running_Sum_of_1d_Array)'
---

## Range Sum Query - Immutable - 303
[**Read my solution in leetcode**](../Running_Sum_of_1d_Array)

```text
Given an integer array nums, handle multiple queries of the following type:

Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
 

Example 1:

Input
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output
[null, 1, -1, -3]

Explanation
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
 

Constraints:

1 <= nums.length <= 104
-105 <= nums[i] <= 105
0 <= left <= right < nums.length
At most 104 calls will be made to sumRange.

```
### Intuition
the array can be preprocessed using the prefix sum technique so that each query can be answered in constant time

### Approach
- Initialize array nums in constructor 
- Each index stores cumulative sum of elements.
- For each query `sumRange(int left, int right)`
- If left = 0 then the result is simply the prefix sum at right
- Else subtract prefix sum at left - 1 from the prefix sum at right to get the required range sum 

### Complexity
- Time complexity:
    - Preprocessing : O(n)
    - Each Query : O(1)

- Space complexity:
    - O(n) for storing prefix sum array

### Code
```java
class NumArray {
    int[] nums;
    public NumArray(int[] nums) {
        this.nums=new int[nums.length];
        this.nums[0]=nums[0];
        for(int i=1;i<nums.length;i++){
            this.nums[i]=this.nums[i-1]+nums[i];
        }
    }
    
    public int sumRange(int left, int right) {
        if(left==0){
            return nums[right];
        }
        return nums[right]-(nums[left-1]);
    }
}
```