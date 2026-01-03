---
layout: post
title: "Day 3 of DSA: ArrayList"
date: 2026-01-03 00:00:00 +0530
categories: [DSA]
tags: [learning, cs, dsa]
---
Today I learned ArrayList in Java. It is similar to Python lists in that you do not predeclare the size, and you can expand it with `add()` just like `append()` in Python. ArrayList is a dynamic array implementation, so it resizes itself when capacity runs out.

### ArrayList
An `ArrayList` in Java is a resizable array from `java.util` that grows automatically as elements are added or removed. Reads and writes by index are fast (O(1)), while occasional resizes make some `add` operations more expensive.

### Syntax
`ArrayList<Integer> list = new ArrayList<>();`

Breakdown:
- `ArrayList` : class name in `java.util`
- `< >` : generics angle brackets
- `Integer` : wrapper class for `int`
- `list` : reference variable name
- `new` : allocates the object on the heap
- `ArrayList<>()` : constructor invocation

#### What is Generics?
Generics let you write code that works with many data types safely. The actual type is supplied at use time, and the compiler enforces that type throughout the collection.

Example (type-safe for any element type `T`):
```java
public static <T> void printArray(T[] elements) {
    for (T element : elements) {
        System.out.println(element);
    }
}
```

#### What are Wrapper Classes?
Primitive types are not objects, so collections use wrapper classes: `int -> Integer`, `char -> Character`, `double -> Double`, and so on. Autoboxing/unboxing converts between primitives and wrappers automatically.

#### What is a Constructor?
A constructor initializes a new object instance. When you write `new ArrayList<>()`, Java runs the `ArrayList` constructor to set up its internal storage.

#### Minimal Example
```java
import java.util.ArrayList;

class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(3);
        System.out.println(list); // prints [1, 2, 3]
    }
}
```

### How ArrayList is stored internally
- Backed by an `Object[]` array called `elementData`.
- It tracks `size` (number of elements) separately from `capacity` (length of the internal array).
- When `size == capacity` and you add more, it allocates a larger array (roughly 1.5x growth in modern JDKs), copies old elements, then continues.
- Index lookups are O(1); appends are amortized O(1) but an occasional resize costs O(n).

### Commonly used methods
- `add(E e)` and `add(int index, E e)`
- `get(int index)` and `set(int index, E e)`
- `remove(int index)` or `remove(Object o)`
- `contains(Object o)`, `indexOf(Object o)`
- `size()`, `isEmpty()`, `clear()`
- `ensureCapacity(int minCapacity)` to reduce resize costs if you know the needed size up front.

### Why use wrapper classes instead of primitives?
Collections store objects, not primitives. Wrappers make primitives usable in `ArrayList`, enabling features like `null` to indicate “no value.” The trade-off is extra memory and potential boxing/unboxing overhead.

### Why and how size is not fixed
You never set a fixed length. The internal array is replaced with a larger one when needed, so `size()` changes as you `add()` or `remove()`. Capacity growth is automatic and hidden from your code.

### Multidimensional ArrayList
You can build a list of lists for matrix-like data:
```java
ArrayList<ArrayList<Integer>> matrix = new ArrayList<>();
for (int r = 0; r < 3; r++) {
    ArrayList<Integer> row = new ArrayList<>();
    for (int c = 0; c < 3; c++) {
        row.add(r + c);
    }
    matrix.add(row);
}
System.out.println(matrix);
```

### Difference between Array and ArrayList
- Size: arrays are fixed; ArrayLists resize automatically.
- Types: arrays can hold primitives; ArrayLists require wrapper objects.
- Performance: arrays avoid boxing and have no resize cost; ArrayLists offer convenience but add overhead.
- Syntax: arrays use `[ ]` for access and initialization; ArrayLists use methods like `add`, `get`, `set`, `remove`.

### Iteration options
- Index loop when you need positions: `for (int i = 0; i < list.size(); i++) { ... }`
- Enhanced for-loop when you just need values: `for (int value : list) { ... }`
- `forEach` with lambdas for concise actions: `list.forEach(System.out::println);`
- Prefer iterators only when you need to remove while traversing.

### Converting between arrays and ArrayList
- Array to list (mutable):
```java
Integer[] arr = {1, 2, 3};
ArrayList<Integer> list = new ArrayList<>(Arrays.asList(arr));
```
- List to array:
```java
Integer[] copy = list.toArray(new Integer[0]);
```
- For primitives, use streams or loops because `Arrays.asList` needs wrappers.

### Common pitfalls
- Modifying a list while looping with `for-each` throws `ConcurrentModificationException`; use an iterator's `remove` instead.
- `ArrayList` is not thread-safe; wrap with `Collections.synchronizedList` or use `CopyOnWriteArrayList` for concurrent reads-heavy cases.
- `ensureCapacity` before bulk `add` calls to avoid repeated resizes.

### When to pick ArrayList vs alternatives
- Use `ArrayList` for fast indexed access and mostly append operations.
- Use `LinkedList` when frequent inserts/removes occur in the middle (though cache effects often still favor `ArrayList`).
- Use `Stack`/`Deque` implementations (like `ArrayDeque`) for queue/stack semantics instead of `ArrayList`.

### Time complexity cheatsheet
- `get`, `set`: O(1)
- `add` at end: amortized O(1); occasional resize O(n)
- `add`/`remove` at index: O(n) due to shifting
- `contains`, `indexOf`: O(n)
