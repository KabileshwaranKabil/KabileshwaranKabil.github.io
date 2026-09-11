---
layout: post
title: "Linked Lists — Concepts and Implementation"
date: 2026-01-06 00:00:00 +0530
categories: [DSA]
tags: [linked-list, data-structures, cs]
---

### Why linked lists matter

Linked lists teach pointer manipulation, memory layout, and trade-offs versus arrays (random access vs cheap inserts/deletes). Analogy: train cars connected by couplers — insert/remove a car without moving others.

Core ideas

- Node: a small object holding a value and reference(s) to other nodes.
- Singly linked list: each node holds a `next` reference.
- Doubly linked list: nodes have `prev` and `next` for O(1) bidirectional removal.
- Circular lists: tail's `next` points to head.

Java implementation (singly, with tail and size):

```java
public class SinglyLinkedList<E> {
    private static class Node<E> {
        E val;
        Node<E> next;
        Node(E v){ 
            val = v; 
        }
    }

    private Node<E> head;
    private Node<E> tail;
    private int size = 0;

    public void addLast(E v) {
        Node<E> n = new Node<>(v);
        if (head == null) head = tail = n;
        else { tail.next = n; tail = n; }
        size++;
    }

    public void addFirst(E v) {
        Node<E> n = new Node<>(v);
        if (head == null) head = tail = n;
        else { n.next = head; head = n; }
        size++;
    }

    public boolean remove(E v) {
        Node<E> cur = head, prev = null;
        while (cur != null) {
            if (cur.val.equals(v)) {
                if (prev == null) head = cur.next;
                else prev.next = cur.next;
                if (cur == tail) tail = prev;
                size--;
                return true;
            }
            prev = cur; cur = cur.next;
        }
        return false;
    }

    public int size() { return size; }
}
```

Key operations and complexity

- Insert at head: O(1)
- Insert at tail: O(1) if tail pointer maintained, else O(n)
- Search by value: O(n)
- Remove by node (if doubly linked): O(1); otherwise O(n) to find predecessor

Important implementation details

- Keep `tail` and `size` fields for O(1) tail insert and quick size checks.
- Handle `equals` carefully — use generics and null checks in production code.
- For thread-safety, use synchronization or concurrent collections.

Testing and edge cases

- Test empty list operations, single-element list, remove head/tail, repeated values.

Exercises

- Implement `insertAt(int index, E val)` and `removeAt(int index)` and write JUnit tests for edge cases.
- Implement a `reverse()` method that reverses the list in-place (O(n) time, O(1) extra space).

Diagram suggestion: include images showing node links for singly, doubly, and circular lists.

Further reading

- CLRS, visual algorithm simulators, and Java Collections source for `LinkedList` implementation details.
