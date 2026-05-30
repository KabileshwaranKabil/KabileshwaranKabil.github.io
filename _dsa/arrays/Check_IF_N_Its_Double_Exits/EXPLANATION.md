---
title: Explanation
difficulty: ''
language: Text
tags: []
excerpt: '## Check If N and It''s Double Exists - 1346 ```text Given an array arr
  of integers, check if there exist two indices i and j such that :'
---

## Check If N and It's Double Exists - 1346
```text
Given an array arr of integers, check if there exist two indices i and j such that :

i != j
0 <= i, j < arr.length
arr[i] == 2 * arr[j]
 

Example 1:

Input: arr = [10,2,5,3]
Output: true
Explanation: For i = 0 and j = 2, arr[i] == 10 == 2 * 5 == 2 * arr[j]
Example 2:

Input: arr = [3,1,7,11]
Output: false
Explanation: There is no i and j that satisfy the conditions.
 

Constraints:

2 <= arr.length <= 500
-103 <= arr[i] <= 103
```

### Intuition
- Since the problem description explicitly mentions indices i and j, it suggested checking all possible pairs of elements, which naturally leads to using nested loops.

### Approach
- Iterate through the array using index i from 0 to arr.length - 1.
- For each i, iterate again using index j from 0 to arr.length - 1.
- Check whether i != j and arr[i] == 2 * arr[j].
- If the condition is satisfied for any pair, return true.
- If no such pair is found after checking all combinations, return false.

### Complexity
- Time complexity:
    - O(n²),due to the use of two nested loops.

- Space complexity:
    - o(1),as no extra data structures are used


### Code
```java []
class Solution {
    public boolean checkIfExist(int[] arr) {
        for(int i=0;i<arr.length;i++){
            for(int j=0;j<arr.length;j++){
                if(arr[i]==2*arr[j] && i!=j){
                    return true;
                }
            }
        }
        return false;
    }
}
```