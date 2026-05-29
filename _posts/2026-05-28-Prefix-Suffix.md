---
layout: post
title: "Prefix & Suffix "
date: 2026-05-28 00:00:00 +0530
categories: [DSA]
tags: [learning, cs, dsa, pattern, java, leetcode]
---

I wrote this guide to help myself (and anyone else learning) understand the prefix/suffix technique — from zero to being able to recognize and solve it in an interview. I'll keep it honest and practical: real intuition, traced examples, and clean Java code you can actually run.

If you're reading this as a beginner, take it slow. Every diagram is there for a reason. Don't skip the traces.

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [1. What Is the Prefix-Suffix Trick?](#1-what-is-the-prefix-suffix-trick)
- [2. Why It Matters (The Big Picture)](#2-why-it-matters-the-big-picture)
- [3. Building Intuition Before Code](#3-building-intuition-before-code)
  - [Think of it as a "running total receipt"](#think-of-it-as-a-running-total-receipt)
  - [The key formula](#the-key-formula)
  - [Why does this formula work?](#why-does-this-formula-work)
- [4. Prefix Sums — Left to Right](#4-prefix-sums--left-to-right)
  - [Algorithm](#algorithm)
  - [Java Code](#java-code)
  - [Full Trace](#full-trace)
  - [Visual](#visual)
- [5. Suffix Sums — Right to Left](#5-suffix-sums--right-to-left)
  - [Algorithm](#algorithm-1)
  - [Java Code](#java-code-1)
  - [Visual Comparison](#visual-comparison)
- [6. The Sentinel / Shifted Prefix (Cleaner Queries)](#6-the-sentinel--shifted-prefix-cleaner-queries)
  - [Java Code](#java-code-2)
  - [Side-by-Side](#side-by-side)
- [7. Combine Both — Product of Array Except Self (LC 238)](#7-combine-both--product-of-array-except-self-lc-238)
  - [Why division fails](#why-division-fails)
  - [The Core Idea](#the-core-idea)
  - [Visual Walkthrough](#visual-walkthrough)
  - [Java: Two-Array Solution (easier to understand)](#java-two-array-solution-easier-to-understand)
  - [Java: Space-Optimized (O(1) extra space)](#java-space-optimized-o1-extra-space)
  - [Trace of the Optimized Version](#trace-of-the-optimized-version)
- [8. Prefix Max and Min — Trapping Rain Water (LC 42)](#8-prefix-max-and-min--trapping-rain-water-lc-42)
  - [The Formula](#the-formula)
  - [Visual](#visual-1)
  - [Java Code](#java-code-3)
  - [Why Three Passes?](#why-three-passes)
- [9. Prefix Sum + HashMap — Subarray Sum Equals K (LC 560)](#9-prefix-sum--hashmap--subarray-sum-equals-k-lc-560)
  - [Why sliding window doesn't work here](#why-sliding-window-doesnt-work-here)
  - [The Key Insight](#the-key-insight)
  - [Visual Trace](#visual-trace)
  - [Java Code](#java-code-4)
  - [Why `seen.put(0, 1)` Matters](#why-seenput0-1-matters)
- [10. Prefix Sum + HashMap — Contiguous Array (LC 525)](#10-prefix-sum--hashmap--contiguous-array-lc-525)
  - [The Clever Transformation](#the-clever-transformation)
  - [Java Code](#java-code-5)
- [11. Pivot Index — Left Sum Equals Right Sum (LC 724)](#11-pivot-index--left-sum-equals-right-sum-lc-724)
  - [The Insight](#the-insight)
  - [Java Code](#java-code-6)
  - [Trace](#trace)
- [12. Difference Array — A Prefix Sum Cousin](#12-difference-array--a-prefix-sum-cousin)
  - [The Problem It Solves](#the-problem-it-solves)
  - [How Difference Arrays Work](#how-difference-arrays-work)
  - [Example](#example)
  - [Java Code](#java-code-7)
- [13. 2D Prefix Sums (Matrix Rectangle Queries)](#13-2d-prefix-sums-matrix-rectangle-queries)
  - [Building the 2D Prefix](#building-the-2d-prefix)
  - [Why Include-Exclude?](#why-include-exclude)
  - [Example](#example-1)
  - [Java Code](#java-code-8)
- [14. When to Use This Pattern — Recognition Signals](#14-when-to-use-this-pattern--recognition-signals)
- [15. All LeetCode Problems Mapped to This Pattern](#15-all-leetcode-problems-mapped-to-this-pattern)
  - [🟢 Easy](#-easy)
  - [🟡 Medium](#-medium)
  - [🔴 Hard](#-hard)
  - [Interview Frequency Estimate](#interview-frequency-estimate)
- [16. Common Beginner Mistakes](#16-common-beginner-mistakes)
  - [❌ Mistake 1: Off-by-one in range queries](#-mistake-1-off-by-one-in-range-queries)
  - [❌ Mistake 2: Forgetting the identity element for products](#-mistake-2-forgetting-the-identity-element-for-products)
  - [❌ Mistake 3: Forgetting to seed {0:1} in the HashMap](#-mistake-3-forgetting-to-seed-01-in-the-hashmap)
  - [❌ Mistake 4: Using int for large products](#-mistake-4-using-int-for-large-products)
  - [❌ Mistake 5: Building both arrays when one can be on-the-fly](#-mistake-5-building-both-arrays-when-one-can-be-on-the-fly)
  - [❌ Mistake 6: Updating HashMap before checking (in LC 560 style problems)](#-mistake-6-updating-hashmap-before-checking-in-lc-560-style-problems)
- [17. The Complete Mental Framework](#17-the-complete-mental-framework)
- [18. Quick Cheat Sheet](#18-quick-cheat-sheet)
- [19. Study Path and Practice Plan](#19-study-path-and-practice-plan)

---

## 1. What Is the Prefix-Suffix Trick?

In short: **precompute running values from the left (prefix) and from the right (suffix)**. Then combine them to answer queries or build answers for "every index" problems in O(n).

But let me make that concrete before anything else.

Say your professor hands you this array:

```
nums = [3, 1, 4, 1, 5, 9, 2, 6]
```

And asks: *"For every index i, what is the sum of all elements to the LEFT of i?"*

The **naive** approach: for each index, loop left. That's O(n) per index → **O(n²) total**.

For n = 100,000 (a typical LeetCode constraint), that's **10 billion operations**. Your code times out.

The **prefix approach**: loop once, build an answer array, done in O(n). Every query is then O(1).

```
  Index:   0   1   2   3   4   5   6   7
   nums:  [3,  1,  4,  1,  5,  9,  2,  6]

  prefix:  [3,  4,  8,  9, 14, 23, 25, 31]
              ↑
         prefix[i] = prefix[i-1] + nums[i]
```

Now: "sum of all elements to the LEFT of index 4?" → `prefix[3] = 9`. One lookup.

That's the idea. Everything else in this guide is a variation of this core move.

---

## 2. Why It Matters (The Big Picture)

Common uses of this technique:

- **Range sum queries** (sum between two indices, fast)
- **Product except self** (can't divide — use prefix × suffix)
- **Trapping rain water** (need max from both sides at every index)
- **Subarray with target sum** (prefix + HashMap handles negatives)
- **2D rectangle sums** (extend the same idea to a matrix)
- **Difference arrays** (cousin technique, handles range updates)

This pattern shows up in:

- Technical interviews at large tech companies
- ICPC and Codeforces problems
- Real-world systems — image processing uses 2D prefix sums, database optimizers use range queries

The Prefix-Suffix pattern is **one of the top 5 most frequently tested** array patterns in LeetCode medium/hard problems. If you only had time to learn five patterns before an interview, this is one of them.

---

## 3. Building Intuition Before Code

Before any code, I want you to feel what a prefix array *is*.

### Think of it as a "running total receipt"

Imagine buying items one by one at a store:

```
Item 1: ₹10   → Running Total: ₹10
Item 2: ₹20   → Running Total: ₹30
Item 3: ₹30   → Running Total: ₹60
Item 4: ₹40   → Running Total: ₹100
```

That running total column — **that is your prefix array**.

Now if someone asks "how much did items 2 through 4 cost?", you don't re-add. You just do:

```
total(2..4) = receipt[4] - receipt[1]
            = ₹100 - ₹10
            = ₹90
```

One subtraction. No loop.

### The key formula

```
sum(l, r) = prefix[r] - prefix[l - 1]
```

This is the heart of prefix sums. Memorize it, understand it, use it everywhere.

### Why does this formula work?

```
prefix[r]     = nums[0] + nums[1] + ... + nums[l-1] + nums[l] + ... + nums[r]
prefix[l-1]   = nums[0] + nums[1] + ... + nums[l-1]

prefix[r] - prefix[l-1]
            = nums[l] + nums[l+1] + ... + nums[r]   ✅
```

The left portion cancels out. Clean.

---

## 4. Prefix Sums — Left to Right

### Algorithm

```
BUILD PREFIX SUM
────────────────
Input : nums[] of size n
Output: prefix[] of size n

  prefix[0] = nums[0]
  for i from 1 to n-1:
      prefix[i] = prefix[i-1] + nums[i]
```

### Java Code

```java
// Build prefix sum — O(n) time, O(n) space
public int[] buildPrefix(int[] nums) {
    int n = nums.length;
    int[] prefix = new int[n];
    if (n == 0) return prefix;

    prefix[0] = nums[0];
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + nums[i];
    }
    return prefix;
}

// Range sum query — O(1) time
public int rangeSum(int[] prefix, int l, int r) {
    return prefix[r] - (l > 0 ? prefix[l - 1] : 0);
}
```

### Full Trace

```
nums   = [10, 20, 30, 40, 50]

Building prefix:
──────────────────────────────────────────────────
  i  │ nums[i] │ prefix[i-1] │ prefix[i]
─────┼─────────┼─────────────┼──────────
  0  │   10    │    (none)   │    10
  1  │   20    │     10      │    30
  2  │   30    │     30      │    60
  3  │   40    │     60      │   100
  4  │   50    │    100      │   150
──────────────────────────────────────────────────

prefix = [10, 30, 60, 100, 150]

Queries:
  sum(0, 2) = prefix[2] - 0         = 60       (10+20+30)
  sum(1, 3) = prefix[3] - prefix[0] = 100 - 10 = 90  (20+30+40)
  sum(2, 4) = prefix[4] - prefix[1] = 150 - 30 = 120 (30+40+50)
  sum(0, 4) = prefix[4]             = 150      (entire array)
```

### Visual

```
Original:
  ┌────┬────┬────┬────┬────┐
  │ 10 │ 20 │ 30 │ 40 │ 50 │
  └────┴────┴────┴────┴────┘
   i=0  i=1  i=2  i=3  i=4
         ─────────────────▶  builds left to right

Prefix:
  ┌────┬────┬────┬────┬────┐
  │ 10 │ 30 │ 60 │100 │150 │
  └────┴────┴────┴────┴────┘
```

---

## 5. Suffix Sums — Right to Left

Suffix is just the mirror. `suffix[i]` = sum of `nums[i..n-1]`. Build it from the right.

### Algorithm

```
BUILD SUFFIX SUM
────────────────
Input : nums[] of size n
Output: suffix[] of size n

  suffix[n-1] = nums[n-1]
  for i from n-2 down to 0:
      suffix[i] = suffix[i+1] + nums[i]
```

### Java Code

```java
public int[] buildSuffix(int[] nums) {
    int n = nums.length;
    int[] suffix = new int[n];
    if (n == 0) return suffix;

    suffix[n - 1] = nums[n - 1];
    for (int i = n - 2; i >= 0; i--) {
        suffix[i] = suffix[i + 1] + nums[i];
    }
    return suffix;
}
```

### Visual Comparison

```
nums   = [  3,   1,   4,   1,   5 ]
Index     i=0  i=1  i=2  i=3  i=4

Prefix (left → right):
  ─────────────────────────▶
  [  3,   4,   8,   9,  14 ]

Suffix (right → left):
  ◀─────────────────────────
  [ 14,  11,  10,   6,   5 ]

Meaning at each position:
  i=0: prefix[0]= 3  (just nums[0])          suffix[0]=14 (all elements)
  i=2: prefix[2]= 8  (sum of 0..2)           suffix[2]=10 (sum of 2..4)
  i=4: prefix[4]=14  (all elements)          suffix[4]= 5 (just nums[4])
```

Prefix and suffix are just mirrors — pick whichever fits the problem, or use both together.

---

## 6. The Sentinel / Shifted Prefix (Cleaner Queries)

Here's a small but powerful trick. Instead of handling the `l > 0` edge case in every query, shift the prefix array by one position and prepend a **0**:

```
Original prefix (size n):
  prefix[0] = nums[0]
  prefix[i] = prefix[i-1] + nums[i]

Shifted prefix (size n+1, with a leading 0):
  prefix[0] = 0          ← sentinel / identity element
  prefix[i] = prefix[i-1] + nums[i-1]   for i from 1 to n
```

### Java Code

```java
// Builds shifted prefix of size n+1
// prefix[i] = sum of nums[0..i-1]
// prefix[0] = 0  (sum of empty prefix)
public int[] buildShiftedPrefix(int[] nums) {
    int n = nums.length;
    int[] prefix = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        prefix[i] = prefix[i - 1] + nums[i - 1];
    }
    return prefix;
}

// Range sum — no edge case needed!
public int rangeSum(int[] prefix, int l, int r) {
    return prefix[r + 1] - prefix[l];   // clean, no ternary
}
```

### Side-by-Side

```
nums             = [10, 20, 30, 40, 50]

Standard prefix  = [10, 30, 60, 100, 150]         (size 5)
Shifted prefix   = [ 0, 10, 30,  60, 100, 150]    (size 6)

Query sum(1, 3):
  Standard: prefix[3] - prefix[0] = 100 - 10 = 90  (need l>0 check)
  Shifted:  prefix[4] - prefix[1] = 100 - 10 = 90  (no check needed)
```

Many competitive programmers and LeetCode solution writers use the shifted style. You'll see both — now you understand them.

---

## 7. Combine Both — Product of Array Except Self (LC 238)

> **Problem**: Given `nums[]`, return an array where `result[i]` is the product of all elements except `nums[i]`. You **cannot** use division.

This is the canonical prefix+suffix combination problem. Medium difficulty on LeetCode, asked very frequently in interviews.

### Why division fails

```
nums = [1, 2, 0, 4]
total product = 0

result[1] should be: 1 × 0 × 4 = 0
Using division: 0 / 2 = 0  ← works here

But result[2] should be: 1 × 2 × 4 = 8
Using division: 0 / 0 = ???  ← undefined!
```

Division breaks on zeros. There can be multiple zeros. Prefix-suffix handles all cases naturally.

### The Core Idea

```
For index i:
  result[i] = (product of everything to the LEFT  of i)
             × (product of everything to the RIGHT of i)
```

### Visual Walkthrough

```
nums = [1, 2, 3, 4]

Left products (product of everything strictly to the LEFT of i):
─────────────────────────────────────────────────────────────────
  i=0: nothing to left     → left[0] = 1   (identity)
  i=1: nums[0]             → left[1] = 1
  i=2: nums[0]*nums[1]     → left[2] = 2
  i=3: nums[0]*nums[1]*... → left[3] = 6

left  = [1, 1, 2, 6]

Right products (product of everything strictly to the RIGHT of i):
─────────────────────────────────────────────────────────────────
  i=3: nothing to right    → right[3] = 1   (identity)
  i=2: nums[3]             → right[2] = 4
  i=1: nums[3]*nums[2]     → right[1] = 12
  i=0: nums[3]*nums[2]*... → right[0] = 24

right = [24, 12, 4, 1]

Combine:
  result[0] = left[0] × right[0] =  1 × 24 = 24
  result[1] = left[1] × right[1] =  1 × 12 = 12
  result[2] = left[2] × right[2] =  2 ×  4 =  8
  result[3] = left[3] × right[3] =  6 ×  1 =  6

result = [24, 12, 8, 6]  ✅
```

### Java: Two-Array Solution (easier to understand)

```java
// Time: O(n)  Space: O(n)
public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] left  = new int[n];
    int[] right = new int[n];

    // Build left products
    left[0] = 1;
    for (int i = 1; i < n; i++) {
        left[i] = left[i - 1] * nums[i - 1];
    }

    // Build right products
    right[n - 1] = 1;
    for (int i = n - 2; i >= 0; i--) {
        right[i] = right[i + 1] * nums[i + 1];
    }

    // Combine
    int[] result = new int[n];
    for (int i = 0; i < n; i++) {
        result[i] = left[i] * right[i];
    }

    return result;
}
```

### Java: Space-Optimized (O(1) extra space)

```java
// Time: O(n)  Space: O(1) extra (output array doesn't count)
public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];

    // Pass 1: fill result with left products
    result[0] = 1;
    for (int i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }

    // Pass 2: multiply right products on the fly, right to left
    int right = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= right;     // combine left (already in result) with right
        right     *= nums[i];   // update running right product
    }

    return result;
}
```

### Trace of the Optimized Version

```
nums = [1, 2, 3, 4]

After Pass 1 (left products in result):
  result = [1, 1, 2, 6]

Pass 2 (right = 1, scanning right to left):
───────────────────────────────────────────────────────
  i  │ result[i] before │ right │ result[i] after │ right after
─────┼──────────────────┼───────┼─────────────────┼────────────
  3  │       6          │   1   │   6 × 1 = 6     │   1×4 = 4
  2  │       2          │   4   │   2 × 4 = 8     │   4×3 = 12
  1  │       1          │  12   │   1 × 12 = 12   │  12×2 = 24
  0  │       1          │  24   │   1 × 24 = 24   │  24×1 = 24
───────────────────────────────────────────────────────

result = [24, 12, 8, 6]  ✅
```

This handles zeros naturally and uses only the output array + one variable.

---

## 8. Prefix Max and Min — Trapping Rain Water (LC 42)

For water-trapping, at each position we need: *what is the tallest bar I've ever seen to my left? and to my right?*

That's prefix max and suffix max.

### The Formula

```
water[i] = max(0,  min(maxLeft[i], maxRight[i])  -  height[i])
                       ↑ the water level              ↑ bar height takes some space
```

Think of it like this: water can only rise as high as the shorter of the two surrounding walls. Whatever height the bar at `i` takes up is subtracted.

### Visual

```
height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]

Histogram (each █ = 1 unit height):

    3     │                           ██
    2     │          ██           ██  ██  ██
    1     │  ██      ██  ██  ██  ██  ██  ██  ██
    0     └──────────────────────────────────────▶
          0   1   2   3   4   5   6   7   8   9  10  11

maxLeft : [0,  1,  1,  2,  2,  2,  2,  3,  3,  3,  3,  3]
maxRight: [3,  3,  3,  3,  3,  3,  3,  3,  2,  2,  2,  1]

Water at each index (min of walls - bar height):
  i=0:  min(0,3)-0 = 0    (left wall is 0, can't hold anything)
  i=1:  min(1,3)-1 = 0
  i=2:  min(1,3)-0 = 1   ← 1 unit trapped  ~
  i=3:  min(2,3)-2 = 0
  i=4:  min(2,3)-1 = 1   ← 1 unit trapped  ~
  i=5:  min(2,3)-0 = 2   ← 2 units trapped ~~
  i=6:  min(2,3)-1 = 1   ← 1 unit trapped  ~
  i=7:  min(3,3)-3 = 0
  i=8:  min(3,2)-2 = 0
  i=9:  min(3,2)-1 = 1   ← 1 unit trapped  ~
  i=10: min(3,2)-2 = 0
  i=11: min(3,1)-1 = 0

Total = 0+0+1+0+1+2+1+0+0+1+0+0 = 6 units  ✅
```

### Java Code

```java
// Time: O(n)  Space: O(n)
public int trap(int[] height) {
    int n = height.length;
    if (n == 0) return 0;

    // Step 1: prefix max (tallest bar seen from the left, inclusive)
    int[] leftMax = new int[n];
    leftMax[0] = height[0];
    for (int i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    // Step 2: suffix max (tallest bar seen from the right, inclusive)
    int[] rightMax = new int[n];
    rightMax[n - 1] = height[n - 1];
    for (int i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    // Step 3: sum up trapped water
    int water = 0;
    for (int i = 0; i < n; i++) {
        water += Math.max(0, Math.min(leftMax[i], rightMax[i]) - height[i]);
    }
    return water;
}
```

### Why Three Passes?

Some beginners wonder: can't we do this in one pass? Yes — with a two-pointer approach. But the prefix-suffix version is easier to understand and to derive. Learn the prefix-suffix version first, then learn the two-pointer optimization.

---

## 9. Prefix Sum + HashMap — Subarray Sum Equals K (LC 560)

> **Problem**: Given `nums[]` (can include negatives!), count the number of subarrays whose sum equals `k`.

This is the most elegant application of prefix sums. It forces you to really understand what a prefix sum means.

### Why sliding window doesn't work here

Sliding window works when all values are non-negative (shrinking the window always decreases the sum). With negatives, shrinking might increase the sum. So we can't use a sliding window. We need prefix sums.

### The Key Insight

```
If prefix[j] - prefix[i] = k,
then subarray from index i+1 to j has sum = k.
```

Rearranging: `prefix[i] = prefix[j] - k`

So as we scan through the array building prefix sums, for each position `j` we just ask:
> **"Have I seen the value `prefix[j] - k` as a prefix sum before?"**

If yes → each time we saw it, it corresponds to a valid subarray ending at `j`.

We use a HashMap to store "how many times each prefix sum has been seen so far."

### Visual Trace

```
nums = [1, 2, 3], k = 3

Shifted prefix (with leading 0):
  prefix[0] = 0
  prefix[1] = 1
  prefix[2] = 3
  prefix[3] = 6

HashMap starts with {0: 1}  (the empty prefix, seen once)

Processing each prefix sum:
──────────────────────────────────────────────────────────────────
  j  │ prefix[j] │ need (prefix[j]-k) │ found in map? │ count
─────┼───────────┼────────────────────┼───────────────┼───────
  1  │     1     │      1 - 3 = -2    │   No          │   0
     │           │                    │ add {1:1}     │
─────┼───────────┼────────────────────┼───────────────┼───────
  2  │     3     │      3 - 3 =  0    │   Yes! (1×)   │   1
     │           │                    │ add {3:1}     │
─────┼───────────┼────────────────────┼───────────────┼───────
  3  │     6     │      6 - 3 =  3    │   Yes! (1×)   │   2
     │           │                    │ add {6:1}     │
──────────────────────────────────────────────────────────────────

Answer: 2  ✅
Valid subarrays: [1,2] (sum=3) and [3] (sum=3)
```

### Java Code

```java
// Time: O(n)  Space: O(n)
public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> seen = new HashMap<>();
    seen.put(0, 1);   // empty prefix has sum 0, seen once

    int prefixSum = 0;
    int count = 0;

    for (int num : nums) {
        prefixSum += num;

        // How many times have we seen (prefixSum - k)?
        // Each occurrence = one valid subarray ending here
        count += seen.getOrDefault(prefixSum - k, 0);

        // Record this prefix sum
        seen.put(prefixSum, seen.getOrDefault(prefixSum, 0) + 1);
    }

    return count;
}
```

### Why `seen.put(0, 1)` Matters

```
nums = [3], k = 3

Without {0:1}:
  prefixSum = 3, need 0, not in map → count = 0  ✗  (wrong, subarray [3] should count)

With {0:1}:
  prefixSum = 3, need 0, found! count = 1  ✅
```

The `0` represents "the prefix before the array starts." If the subarray starts at index 0 and sums to `k`, the needed complement is 0 — and it must already be in the map. That's why we seed it.

---

## 10. Prefix Sum + HashMap — Contiguous Array (LC 525)

> **Problem**: Given a binary array (only 0s and 1s), find the length of the longest subarray with an equal number of 0s and 1s.

### The Clever Transformation

Replace every `0` with `-1`. Now "equal 0s and 1s" becomes "subarray sums to 0."

And "longest subarray summing to 0" = "earliest time we saw this prefix sum."

```
nums = [0, 1, 0, 1, 1, 0]

After transform (0 → -1):
transformed = [-1, 1, -1, 1, 1, -1]

Prefix sums (with leading 0):
  index:  0   1   2   3   4   5   6
  prefix: 0  -1   0  -1   0   1   0

HashMap tracks FIRST occurrence of each prefix sum:
  {0: 0}   ← index 0 (the start)

Scan:
  prefix[1] = -1 → not seen → store {-1: 1}
  prefix[2] =  0 → seen at index 0! length = 2 - 0 = 2, maxLen = 2
  prefix[3] = -1 → seen at index 1! length = 3 - 1 = 2, maxLen = 2
  prefix[4] =  0 → seen at index 0! length = 4 - 0 = 4, maxLen = 4   ← new best
  prefix[5] =  1 → not seen → store {1: 5}
  prefix[6] =  0 → seen at index 0! length = 6 - 0 = 6, maxLen = 6   ← new best

Answer: 6  ✅
```

### Java Code

```java
// Time: O(n)  Space: O(n)
public int findMaxLength(int[] nums) {
    Map<Integer, Integer> firstSeen = new HashMap<>();
    firstSeen.put(0, -1);  // prefix sum 0 first seen "before" the array

    int prefixSum = 0;
    int maxLen = 0;

    for (int i = 0; i < nums.length; i++) {
        prefixSum += (nums[i] == 1) ? 1 : -1;  // transform: 0 → -1

        if (firstSeen.containsKey(prefixSum)) {
            // We've seen this sum before — subarray in between sums to 0
            maxLen = Math.max(maxLen, i - firstSeen.get(prefixSum));
        } else {
            // First time seeing this sum — store earliest index
            firstSeen.put(prefixSum, i);
        }
    }

    return maxLen;
}
```

Notice: for **counting** subarrays (LC 560) we use `getOrDefault` and add; for **longest** subarray (LC 525) we store only the first occurrence. This is a pattern worth recognizing.

---

## 11. Pivot Index — Left Sum Equals Right Sum (LC 724)

> **Problem**: Find the index where the sum of elements to the left equals the sum of elements to the right. Return -1 if no such index.

This is a clean, elegant application that requires no extra array at all — just a running left sum and the total sum.

### The Insight

```
At index i:
  leftSum  = sum of nums[0 .. i-1]
  rightSum = totalSum - leftSum - nums[i]

If leftSum == rightSum → i is the pivot!
```

### Java Code

```java
// Time: O(n)  Space: O(1)
public int pivotIndex(int[] nums) {
    int totalSum = 0;
    for (int num : nums) totalSum += num;

    int leftSum = 0;
    for (int i = 0; i < nums.length; i++) {
        int rightSum = totalSum - leftSum - nums[i];

        if (leftSum == rightSum) return i;

        leftSum += nums[i];
    }

    return -1;
}
```

### Trace

```
nums = [1, 7, 3, 6, 5, 6]
totalSum = 28

  i=0: leftSum=0,  rightSum = 28-0-1  = 27 → 0  ≠ 27
  i=1: leftSum=1,  rightSum = 28-1-7  = 20 → 1  ≠ 20
  i=2: leftSum=8,  rightSum = 28-8-3  = 17 → 8  ≠ 17
  i=3: leftSum=11, rightSum = 28-11-6 = 11 → 11 = 11 ✅  PIVOT!

Answer: index 3
```

This is a beautiful example of where you don't even need to build the prefix array — you just think in terms of prefix sums.

---

## 12. Difference Array — A Prefix Sum Cousin

The **difference array** is a related but different technique. It's used when you need to perform **many range update operations** efficiently, then read the final values.

### The Problem It Solves

> You have an array of zeros. You need to add a value `v` to all elements in range `[l, r]`. Repeat for many such operations, then output the final array.

Naive: each operation is O(n). For m operations → O(mn). Too slow.

### How Difference Arrays Work

Instead of updating every element in `[l, r]`, you:
1. Add `v` at `diff[l]`
2. Subtract `v` at `diff[r+1]`

Then take the **prefix sum of diff** to get the final array.

```
DIFFERENCE ARRAY TECHNIQUE
──────────────────────────
1. Start with diff[] = all zeros (size n+1)
2. For each operation "add v to range [l, r]":
       diff[l]   += v
       diff[r+1] -= v
3. Take prefix sum of diff → final array
```

### Example

```
Array size = 6, initially [0, 0, 0, 0, 0, 0]

Operations:
  Add 3 to [1, 4]
  Add 2 to [2, 5]
  Add 1 to [0, 3]

Difference array after all operations:
  diff = [0, 0, 0, 0, 0, 0, 0]  (size 7, indices 0..6)

  Add 3 to [1,4]: diff[1] += 3, diff[5] -= 3
    diff = [0, 3, 0, 0, 0,-3, 0]

  Add 2 to [2,5]: diff[2] += 2, diff[6] -= 2
    diff = [0, 3, 2, 0, 0,-3,-2]

  Add 1 to [0,3]: diff[0] += 1, diff[4] -= 1
    diff = [1, 3, 2, 0,-1,-3,-2]

Prefix sum of diff = final array:
  index: 0  1   2   3   4   5   6
  diff = [1, 3,  2,  0, -1, -3, -2]
  final= [1, 4,  6,  6,  5,  2,  0]
                                  ↑ ignore extra slot

Final array: [1, 4, 6, 6, 5, 2]  ✅
```

### Java Code

```java
// Apply multiple range updates, then get final array
// Time: O(n + m)  Space: O(n)
public int[] applyRangeUpdates(int n, int[][] updates) {
    int[] diff = new int[n + 1];

    for (int[] update : updates) {
        int l = update[0], r = update[1], v = update[2];
        diff[l]     += v;
        diff[r + 1] -= v;
    }

    // Prefix sum to get final array
    int[] result = new int[n];
    result[0] = diff[0];
    for (int i = 1; i < n; i++) {
        result[i] = result[i - 1] + diff[i];
    }
    return result;
}
```

Difference arrays turn O(n) range updates into O(1) updates, then one O(n) prefix sum pass at the end. This is the complement of prefix sums — where prefix sums make queries fast, difference arrays make **updates** fast.

---

## 13. 2D Prefix Sums (Matrix Rectangle Queries)

Once you understand 1D prefix sums, 2D is the same idea extended to a grid.

`prefix[i][j]` = sum of all elements in the rectangle from `(0,0)` to `(i,j)`.

### Building the 2D Prefix

```
FORMULA (Inclusion-Exclusion):
  prefix[i][j] = matrix[i][j]
               + prefix[i-1][j]      ← row above
               + prefix[i][j-1]      ← column left
               - prefix[i-1][j-1]    ← corner was counted twice, subtract once
```

### Why Include-Exclude?

```
When you add the row above and column to the left,
the top-left corner rectangle gets counted twice.
Subtract it once to fix.

Diagram:
  ┌──────────┬────┐
  │          │    │
  │ counted  │    │
  │ twice!   │    │
  ├──────────┼────┤  ← i
  │          │    │
  └──────────┴────┘
              ↑ j
```

### Example

```
Matrix:
  ┌───┬───┬───┐
  │ 1 │ 2 │ 3 │
  ├───┼───┼───┤
  │ 4 │ 5 │ 6 │
  ├───┼───┼───┤
  │ 7 │ 8 │ 9 │
  └───┴───┴───┘

2D Prefix (with +1 padding, so prefix[0][*] = prefix[*][0] = 0):
  ┌────┬────┬────┬────┐
  │  0 │  0 │  0 │  0 │
  ├────┼────┼────┼────┤
  │  0 │  1 │  3 │  6 │
  ├────┼────┼────┼────┤
  │  0 │  5 │ 12 │ 21 │
  ├────┼────┼────┼────┤
  │  0 │ 12 │ 27 │ 45 │
  └────┴────┴────┴────┘

Rectangle sum (r1=1,c1=1) to (r2=2,c2=2)?
  = prefix[3][3] - prefix[1][3] - prefix[3][1] + prefix[1][1]
  = 45 - 6 - 12 + 1
  = 28  ✅  (which is 5+6+8+9)
```

### Java Code

```java
// Build 2D prefix sum — O(m*n)
public int[][] build2DPrefix(int[][] mat) {
    int m = mat.length, n = mat[0].length;
    int[][] p = new int[m + 1][n + 1];  // extra row and col = 0 (sentinel)

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            p[i][j] = mat[i - 1][j - 1]
                    + p[i - 1][j]        // top
                    + p[i][j - 1]        // left
                    - p[i - 1][j - 1];   // remove double-counted corner
        }
    }
    return p;
}

// Rectangle sum query — O(1)
// (r1,c1) top-left corner, (r2,c2) bottom-right, 0-indexed in original matrix
public int rectSum(int[][] p, int r1, int c1, int r2, int c2) {
    return p[r2 + 1][c2 + 1]
         - p[r1][c2 + 1]
         - p[r2 + 1][c1]
         + p[r1][c1];
}
```

---

## 14. When to Use This Pattern — Recognition Signals

Look for these in a problem statement:

```
STRONG signals (almost certain prefix/suffix):
  ✅ "sum of subarray" / "range sum"
  ✅ "for each index, compute using elements to its left/right"
  ✅ "product except itself" + "cannot use division"
  ✅ "water trapped" / "elevation map" / "histogram"
  ✅ "rectangle sum" / "matrix block sum"
  ✅ "prefix" or "suffix" literally in the problem title
  ✅ "equal left and right sum" / "pivot index"

MODERATE signals (prefix + HashMap likely):
  ✅ "number of subarrays with sum = k"
  ✅ "longest subarray with sum = k"
  ✅ "subarray with equal 0s and 1s"
  ✅ "subarray sum divisible by k"

RANGE UPDATE signals (difference array):
  ✅ "add v to all elements in range [l, r]" repeated many times
  ✅ "increment a range, then read final values"
```

Also ask yourself:

```
Q: Am I computing something at every index that depends on
   all elements before it, or all after it?
→ Yes → Prefix or suffix array

Q: Am I looking for a subarray where the sum equals a target,
   and the array may have negatives?
→ Yes → Prefix sum + HashMap

Q: Am I doing many range updates and need the final array once?
→ Yes → Difference array
```

---

## 15. All LeetCode Problems Mapped to This Pattern

### 🟢 Easy

| # | Problem | Technique |
|---|---------|-----------|
| 303 | Range Sum Query — Immutable | Basic prefix sum + query |
| 1480 | Running Sum of 1D Array | Build prefix sum directly |
| 724 | Find Pivot Index | Running leftSum + totalSum |
| 1732 | Find the Highest Altitude | Prefix sum on gain array |
| 2574 | Left and Right Sum Differences | prefixSum vs suffixSum |
| 2485 | Find the Pivot Integer | Prefix sum + math |

### 🟡 Medium

| # | Problem | Technique |
|---|---------|-----------|
| 238 | Product of Array Except Self | Prefix × suffix products |
| 560 | Subarray Sum Equals K | Prefix sum + HashMap (count) |
| 974 | Subarray Sums Divisible by K | Prefix sum + modulo + HashMap |
| 525 | Contiguous Array | Prefix sum + HashMap (0→-1 transform) |
| 1031 | Max Sum of Two Non-Overlapping Subarrays | Prefix max sums |
| 1314 | Matrix Block Sum | 2D prefix sum |
| 1248 | Count Number of Nice Subarrays | Prefix sum (odd count as k) |
| 2348 | Number of Zero-Filled Subarrays | Prefix run length |
| 370 | Range Addition | Difference array |
| 1109 | Corporate Flight Bookings | Difference array |

### 🔴 Hard

| # | Problem | Technique |
|---|---------|-----------|
| 42 | Trapping Rain Water | Prefix max + suffix max |
| 84 | Largest Rectangle in Histogram | Prefix min (stack variant) |
| 363 | Max Sum of Rectangle No Larger Than K | 2D prefix sum + binary search |
| 1074 | Number of Submatrices That Sum to Target | 2D prefix + HashMap |
| 327 | Count of Range Sum | Prefix sum + merge sort |

### Interview Frequency Estimate

```
Most commonly asked in interviews:
  🔥🔥🔥  238 (Product Except Self)   — almost a must-know
  🔥🔥🔥  42  (Trapping Rain Water)   — classic, tests depth
  🔥🔥🔥  560 (Subarray Sum = K)      — tests prefix+HashMap combo
  🔥🔥    724 (Pivot Index)           — clean, tests basic prefix thinking
  🔥🔥    303 (Range Sum Query)       — simplest entry point
```

---

## 16. Common Beginner Mistakes

### ❌ Mistake 1: Off-by-one in range queries

```java
// WRONG — misses nums[l]
int sum = prefix[r] - prefix[l];

// CORRECT
int sum = prefix[r] - (l > 0 ? prefix[l - 1] : 0);

// OR use shifted prefix (cleaner):
int sum = prefix[r + 1] - prefix[l];  // with prefix[0] = 0
```

### ❌ Mistake 2: Forgetting the identity element for products

```java
// WRONG — left[0] should represent "nothing to my left"
left[0] = nums[0];   // wrong! this is the element at 0, not the product before 0

// CORRECT
left[0] = 1;   // product of zero elements = 1 (multiplicative identity)
```

For sum: the identity is `0`. For product: it's `1`. For max: it's `Integer.MIN_VALUE`. For min: it's `Integer.MAX_VALUE`.

### ❌ Mistake 3: Forgetting to seed {0:1} in the HashMap

```java
// In subarray sum problems — always start with:
seen.put(0, 1);

// This handles subarrays starting at index 0.
// Without it, you'll miss many valid subarrays.
```

### ❌ Mistake 4: Using int for large products

```java
// int max is ~2.1 billion. Products explode fast.
int[] prefix = new int[n];   // can overflow!

// Use long for product problems:
long[] prefix = new long[n];
```

### ❌ Mistake 5: Building both arrays when one can be on-the-fly

```java
// Often one of prefix or suffix can be a running variable.
// See the optimized Product Except Self — right product is computed on-the-fly.
// This saves one full O(n) array worth of space.
```

### ❌ Mistake 6: Updating HashMap before checking (in LC 560 style problems)

```java
// WRONG order — counts the current index itself as a previous prefix sum
for (int num : nums) {
    prefixSum += num;
    seen.put(prefixSum, seen.getOrDefault(prefixSum, 0) + 1);  // update first
    count += seen.getOrDefault(prefixSum - k, 0);              // then check
}

// CORRECT order — check first, then update
for (int num : nums) {
    prefixSum += num;
    count += seen.getOrDefault(prefixSum - k, 0);              // check first
    seen.put(prefixSum, seen.getOrDefault(prefixSum, 0) + 1);  // then update
}
```

---

## 17. The Complete Mental Framework

When you see an array problem, run through this decision tree in your head:

```
NEW ARRAY PROBLEM
       │
       ▼
Is the answer for each index dependent on
elements to the left OR right of it?
       │
   YES │
       ▼
   Use prefix/suffix arrays
       │
       ├──▶ Sum needed?       → Prefix/Suffix Sum
       │
       ├──▶ Product needed?   → Prefix/Suffix Product
       │                         (identity = 1 at boundaries)
       │
       └──▶ Max/Min needed?   → Prefix/Suffix Max/Min
                                 (e.g. Rain Water)
       │
       ▼
Is it a "count/find subarrays with sum = k" problem?
(especially with negatives)
       │
   YES │
       ▼
   Prefix sum + HashMap
   seed: map.put(0, 1)
       │
       ├──▶ Counting subarrays → getOrDefault + accumulate
       │
       └──▶ Longest subarray  → store first occurrence only
       │
       ▼
Is it a matrix problem with rectangle sum queries?
       │
   YES │
       ▼
   2D Prefix Sum
   (with (m+1)×(n+1) padding)
       │
       ▼
Are there many range update operations?
       │
   YES │
       ▼
   Difference Array
   (diff[l] += v, diff[r+1] -= v,
    then take prefix sum once at the end)
```

---

## 18. Quick Cheat Sheet

```
╔══════════════════════════════════════════════════════════════════╗
║             PREFIX-SUFFIX TECHNIQUE — CHEAT SHEET               ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  CORE TEMPLATES                                                  ║
║  ──────────────                                                  ║
║  Prefix Sum:                                                     ║
║    prefix[0] = nums[0];                                          ║
║    for (i=1; i<n; i++) prefix[i] = prefix[i-1] + nums[i];       ║
║                                                                  ║
║  Suffix Sum:                                                     ║
║    suffix[n-1] = nums[n-1];                                      ║
║    for (i=n-2; i>=0; i--) suffix[i] = suffix[i+1] + nums[i];   ║
║                                                                  ║
║  Shifted Prefix (cleaner queries):                               ║
║    prefix[0] = 0;                                                ║
║    for (i=1; i<=n; i++) prefix[i] = prefix[i-1] + nums[i-1];   ║
║    query sum(l,r) = prefix[r+1] - prefix[l]                     ║
║                                                                  ║
║  Range Sum (standard):                                           ║
║    sum(l,r) = prefix[r] - (l>0 ? prefix[l-1] : 0)              ║
║                                                                  ║
║  COMPLEXITY                                                      ║
║  ──────────                                                      ║
║  Build: O(n)    Query: O(1)    Space: O(n)                      ║
║                                                                  ║
║  IDENTITY ELEMENTS (boundary values)                            ║
║  ────────────────────────────────────                            ║
║  Sum → 0                                                        ║
║  Product → 1                                                    ║
║  Max → Integer.MIN_VALUE                                        ║
║  Min → Integer.MAX_VALUE                                        ║
║                                                                  ║
║  VARIANTS AND USE CASES                                         ║
║  ──────────────────────                                          ║
║  Prefix Sum          → range queries                            ║
║  Prefix Product      → product except self                      ║
║  Prefix Max/Min      → trapping rain water, stock prices        ║
║  Prefix + HashMap    → subarray sum = k (handles negatives)     ║
║    map.put(0, 1)     → seed for subarrays starting at index 0  ║
║  2D Prefix Sum       → rectangle sum queries on matrix          ║
║  Difference Array    → range updates → prefix sum once          ║
║                                                                  ║
║  KEY FORMULA (2D rectangle query):                              ║
║    rectSum(r1,c1,r2,c2) =                                       ║
║      p[r2+1][c2+1] - p[r1][c2+1] - p[r2+1][c1] + p[r1][c1]   ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 19. Study Path and Practice Plan

Here's the order I'd follow to actually master this. Don't rush to the next step before the current one feels comfortable.

```
WEEK 1 — Foundation
───────────────────
  Day 1-2:  Implement prefix sum + rangeSum from scratch.
            Test with your own examples. Understand WHY the formula works.

  Day 3-4:  LeetCode 303 (Range Sum Query — Immutable)
            LeetCode 1480 (Running Sum of 1D Array)
            LeetCode 724 (Find Pivot Index)

  Day 5-7:  LeetCode 238 (Product Except Self)
            First with two arrays, then optimize to O(1) space.
            Write the trace yourself before running it.

WEEK 2 — Intermediate
─────────────────────
  Day 1-2:  LeetCode 42 (Trapping Rain Water)
            Draw the histogram. Trace maxLeft, maxRight.
            Understand WHY we take the min of the two walls.

  Day 3-4:  LeetCode 560 (Subarray Sum = K)
            This is the key HashMap combo. Understand the seed {0:1}.
            Trace with a small example with negatives.

  Day 5-7:  LeetCode 974 (Subarray Sums Divisible by K)
            LeetCode 525 (Contiguous Array)
            Notice the pattern difference: count vs longest → accumulate vs first-seen.

WEEK 3 — Advanced
──────────────────
  Day 1-2:  LeetCode 1314 (Matrix Block Sum)
            Implement 2D prefix sum from scratch. Trace the inclusion-exclusion step.

  Day 3-4:  LeetCode 370 or 1109 (Difference Array problems)
            Understand range update → prefix sum pipeline.

  Day 5-7:  Go back and recode ALL problems from memory.
            No peeking. Time yourself. Fix what breaks.

AFTER WEEK 3 — Solidify
────────────────────────
  When you can:
    ✅ Code prefix sum + query in 2 minutes from memory
    ✅ Immediately recognize when to add a HashMap and why
    ✅ Derive the 2D prefix formula yourself from scratch
    ✅ Solve LC 238, 42, 560 cleanly in one sitting
  → You've genuinely mastered this pattern.
```

---

Build prefix in O(n), query in O(1). Suffix is the mirror. Combine for "except self" or "both sides" problems. Add a HashMap for subarray-sum with negatives. Extend to 2D for matrix queries. Use a difference array when the updates are the bottleneck, not the reads.

That's really the whole thing. The technique sounds small, but it unlocks a huge family of problems. Most students underestimate it — don't be one of them.

Happy coding. 🚀
