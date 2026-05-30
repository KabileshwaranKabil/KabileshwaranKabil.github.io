---
title: Explanation
difficulty: ''
language: Java
tags: []
excerpt: '## Range Sum Query 2D - Immutable'
---

## Range Sum Query 2D - Immutable 

### Intuition
- Since I had solved the 1D prefix sum problem before, I knew a prefix sum approach would be suitable. 
- I wasn’t initially sure how to extend it to a 2D matrix, so I tried multiple approaches and watched some videos
- Working it out manually on paper helped me fully understand the 2D prefix sum logic.

### Approach
- Initialize rows = matrix.length + 1 and cols = matrix[0].length + 1.
   - The extra row and column handle edge cases automatically
- Create a 2D prefix array of size rows × cols.
- Use a nested for loop to populate the prefix array:
    - If i == 0 or j == 0, assign prefix[i][j] = 0.
    - Otherwise, use the formula:
        - `prefix[i][j] = matrix[i-1][j-1] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1]
`
    - To answer a query sumRegion(row1, col1, row2, col2), simply compute
        - `prefix[row2+1][col2+1] - prefix[row2+1][col1] - prefix[row1][col2+1] + prefix[row1][col1]`
 
### Complexity
- Time complexity:
    - O(m × n) for building the prefix matrix (m rows × n columns.
    - Each sumRegion query takes O(1)

- Space complexity:
    - O(m × n) for the prefix array.

### Code
```java []
class NumMatrix {
    int[][] prefix;
    public NumMatrix(int[][] matrix) {
        int rows=matrix.length+1;
        int cols=matrix[0].length+1;
        prefix=new int[rows][cols];
        for(int i=0;i<rows;i++){
            for(int j=0;j<cols;j++){
                if(i==0 || j==0){
                    prefix[i][j]=0;
                }
                else{
                    prefix[i][j]=matrix[i-1][j-1]+prefix[i-1][j]+prefix[i][j-1]-prefix[i-1][j-1];
                }
            }
        }
    }
    
    public int sumRegion(int row1, int col1, int row2, int col2) {
        return prefix[row2+1][col2+1]-prefix[row2+1][col1]-prefix[row1][col2+1]+prefix[row1][col1];
    }
}
```