---
title: Explanation
difficulty: ''
language: Java
tags: []
excerpt: '## Search Insert Position'
---

## Search Insert Position

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
You must write an algorithm with O(log n) runtime complexity.

Example 1:

Input: nums = [1,3,5,6], target = 5
Output: 2
Example 2:

Input: nums = [1,3,5,6], target = 2
Output: 1
Example 3:

Input: nums = [1,3,5,6], target = 7
Output: 4
 
Constraints:
1 <= nums.length <= 104
-104 <= nums[i] <= 104
nums contains distinct values sorted in ascending order.
-104 <= target <= 104

### Intuition
- The array is already sorted in ascending order, so if the target exists, its index can be found efficiently using binary search.
If the target does not exist, binary search naturally tells us where the target should be inserted to maintain the sorted order.

### Approach
1. Initialize two pointers:
    - left at the start of the array
    - right at the end of the array
2. Maintain a variable position to store the possible insertion index.
3. Perform binary search:
    - If nums[mid] == target, return mid immediately.
    - If target < nums[mid], the target must be inserted before mid, so:
    - update right = mid - 1
    - update position = mid
    - If target > nums[mid], the target must be inserted after mid, so:
    - update left = mid + 1
    - update position = mid + 1
4. If the loop ends without finding the target, return position.

### Complexity
- Time complexity:
    - O(log n)

- Space complexity:
    - O(1)

### Code
```java []
class Solution {
    public int searchInsert(int[] nums, int target) {
        int position=-1;
        int left=0,right=nums.length-1;
        while(left<=right){
            int mid=left+(right-left)/2;
            if(target==nums[mid]){
                return mid;
            }
            else if(target<nums[mid]){
                right=mid-1;
                position=mid;
            }else{
                left=mid+1;
                position=mid+1;
            }
        }
        return position;
    }
}
```
