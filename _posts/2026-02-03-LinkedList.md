---
layout: post
title: "Day 10 of DSA: LinkedList"
date: 2026-02-03 00:00:00 +0530
categories: [DSA]
tags: [learning, cs, dsa, linkedlist]
---
A **Linked List** is a **linear data structure**, just like an array, but instead of storing elements in contiguous memory locations, it stores **elements (nodes) connected using pointers**.

Think of it like a **train of compartments**:

* Each compartment (node) has **passengers (data)**.
* And a **connector (pointer)** to the next compartment.

Unlike arrays, linked lists:

* **Do not have fixed size.** You can add/remove nodes anytime.
* **Insertion and deletion are faster** (O(1)) if you have a reference to the node.
* But **accessing an element by index is slower** (O(n)) because you have to traverse from the head.

---

## **2. Structure of a Node**

A **Node** is the building block of a linked list.
It has two parts:

1. `data` → The value stored in the node.
2. `next` → Pointer to the next node.

```java
class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;
        this.next = null;
    }
}
```

---

## **3. Types of Linked Lists**

1. **Singly Linked List** → Each node points to the next node.
2. **Doubly Linked List** → Each node points to both next and previous nodes.
3. **Circular Linked List** → Last node points back to the first node.

We’ll start with **Singly Linked List**.

---

## **4. Singly Linked List – Basic Operations**

Let’s visualize the list:

```
head -> 10 -> 20 -> 30 -> null
```

### **a) Creating a Linked List**

```java
class LinkedList {
    Node head;

    // Add a new node at the end
    public void add(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = newNode;
    }

    // Print the linked list
    public void printList() {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("null");
    }
}

public class Main {
    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        list.add(10);
        list.add(20);
        list.add(30);
        list.printList(); // Output: 10 -> 20 -> 30 -> null
    }
}
```

---

### **b) Insert at the Beginning**

```java
public void addFirst(int data) {
    Node newNode = new Node(data);
    newNode.next = head;
    head = newNode;
}
```

---

### **c) Delete a Node**

Delete a node with value `key`:

```java
public void delete(int key) {
    if (head == null) return;

    if (head.data == key) {
        head = head.next;
        return;
    }

    Node temp = head;
    while (temp.next != null && temp.next.data != key) {
        temp = temp.next;
    }

    if (temp.next == null) return; // Key not found
    temp.next = temp.next.next; // Skip the node
}
```

---

### **d) Search a Node**

```java
public boolean search(int key) {
    Node temp = head;
    while (temp != null) {
        if (temp.data == key) return true;
        temp = temp.next;
    }
    return false;
}
```

---

## **5. Analogy to Understand Better**

Think of **linked list** like a chain of **paper notes connected by strings**:

* Each note has **info** (data) + a **string to next note** (next).
* Adding a note in the middle → just tie a new string between two notes.
* Removing a note → just cut the string connecting it.
* Accessing 5th note → you need to start from the first and follow each string (slow).

---

## **6. Big O Complexity**

| Operation         | Singly Linked List |
| ----------------- | ------------------ |
| Access (by index) | O(n)               |
| Search            | O(n)               |
| Insert at head    | O(1)               |
| Insert at tail    | O(n)               |
| Delete (by value) | O(n)               |

---

## **7. Common LeetCode Problems**

Start with these **basic linked list problems**:

1. **Reverse a Linked List** → [LeetCode 206](https://leetcode.com/problems/reverse-linked-list/)
2. **Merge Two Sorted Lists** → [LeetCode 21](https://leetcode.com/problems/merge-two-sorted-lists/)
3. **Remove Nth Node from End** → [LeetCode 19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
4. **Linked List Cycle** → [LeetCode 141](https://leetcode.com/problems/linked-list-cycle/)
5. **Palindrome Linked List** → [LeetCode 234](https://leetcode.com/problems/palindrome-linked-list/)

---

## ✅ **8. Tips to Practice**

* Draw nodes on paper and simulate insert/delete operations.
* Start with **Singly**, then try **Doubly** and **Circular**.
* Implement **all basic operations** without looking at code.
* Then solve LeetCode problems gradually, first “easy” ones.

---

If you want, I can **make a visual roadmap for Linked List** showing **day-by-day exercises and LeetCode problems** for the next 3 weeks to fully master it in a practical way.

Do you want me to do that?
