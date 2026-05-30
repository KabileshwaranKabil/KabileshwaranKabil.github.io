---
title: Explanation
difficulty: ''
language: Text
tags: []
excerpt: '## Shuffle the Array 1470 ```text Given the array nums consisting of 2n
  elements in the form [x1,x2,...,xn,y1,y2,...,yn]. Return the array in the form [x1,y1,x2,y2,...,xn,yn].'
---

## Shuffle the Array 1470
```text
Given the array nums consisting of 2n elements in the form [x1,x2,...,xn,y1,y2,...,yn].
Return the array in the form [x1,y1,x2,y2,...,xn,yn].

Example 1:

Input: nums = [2,5,1,3,4,7], n = 3
Output: [2,3,5,4,1,7] 
Explanation: Since x1=2, x2=5, x3=1, y1=3, y2=4, y3=7 then the answer is [2,3,5,4,1,7].
Example 2:

Input: nums = [1,2,3,4,4,3,2,1], n = 4
Output: [1,4,2,3,3,2,4,1]
Example 3:

Input: nums = [1,1,2,2], n = 2
Output: [1,2,1,2]
 
Constraints:
1 <= n <= 500
nums.length == 2n
1 <= nums[i] <= 10^3
```

### Intuition
- A single loop did not work.
- By using two pointers
    — one for each half we can alternately pick elements and construct the required order efficiently.

### Approach
- Create a new array result of size 2 * n.
- Initialize two pointers:
    - p1 = 0 to traverse the first half of nums
    - p2 = n to traverse the second half of nums
- Initialize an index i = 0 for the result array.
- While both pointers are within bounds:
    - Assign nums[p1] and nums[p2] alternately to result
    - Increment p1, p2, and i accordingly.
- Return the result array.

### Complexity
- Time complexity:
- O(n)

- Space complexity:
- O(n)

### Code
```java []
class Solution {
    public int[] shuffle(int[] nums, int n) {
        int[] result=new int[2*n];
        int p1=0;
        int p2=n;
        int i=0;
        while(p1<n && p2<2*n){
            result[i++]=nums[p1++];
            result[i++]=nums[p2++];
        }
        return result;
    }
}
```