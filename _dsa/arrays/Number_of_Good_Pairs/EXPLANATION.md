---
title: Explanation
difficulty: ''
language: Text
tags: []
excerpt: '## Number of Good Pairs 1512 ```text Given an array of integers nums, return
  the number of good pairs. A pair (i, j) is called good if nums[i] == nums[j] and
  i < j.'
---

## Number of Good Pairs 1512
```text
Given an array of integers nums, return the number of good pairs.
A pair (i, j) is called good if nums[i] == nums[j] and i < j.

Example 1:

Input: nums = [1,2,3,1,1,3]
Output: 4
Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.
Example 2:

Input: nums = [1,1,1,1]
Output: 6
Explanation: Each pair in the array are good.
Example 3:

Input: nums = [1,2,3]
Output: 0
 
Constraints:
1 <= nums.length <= 100
1 <= nums[i] <= 100
```
### Intuition
- My first thought was to compare every element with the elements that come after it.
- If two elements are equal and the index condition is satisfied, then that pair is a valid good pair.

### Approach
- Initialize a counter out to store the number of good pairs.
- Use two nested loops:
    - The outer loop picks the first index i.
    - The inner loop starts from i + 1 to ensure i < j.
    - For every pair (i, j):
    - If nums[i] == nums[j], increment the counter.
- return the counter.

### Complexity
- Time complexity: O(n2)

- Space complexity: O(1)

### Code
```java []
class Solution {
    public int numIdenticalPairs(int[] nums) {
        int out=0;
        for(int i=0;i<nums.length;i++){
            for(int j=i+1;j<nums.length;j++){
                if(nums[i]==nums[j]){
                    out++;
                }
            }
        }
        return out;
    }
}
```