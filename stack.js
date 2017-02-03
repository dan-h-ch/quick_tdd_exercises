'use strict';

var expect = require('expect')

// Implement a Stack that, in addition to the standard stack operations,
// has an additional operation: getMin. GetMin should return the smallest
// element pushed to the stack so far and should run in constant
// time. Implement your stack using a TDD approach.

var Stack = function() {
  this.min = null
  this.minIdx = 0
  this.length = 0
  this.storage = []
}

Stack.prototype.push = function(value) {
  this.storage.push(value)
  this.length++
  if (!this.min || this.min > value) {
    this.min = value
    this.minIdx = this.length - 1
  }
}

Stack.prototype.pop = function() {
  this.storage.pop()
  this.length--
  if (this.length <= this.minIdx) {
    this.min = null
    this.minIdx = 0
    for (var i = 0; i < this.length; i++) {
      if (!this.min || this.storage[i] < this.min) {
        this.min = this.storage[i]
        this.minIdx = i
      }
    }
  }
}

Stack.prototype.getMin = function() {
  return this.min
}


var stack1 = new Stack()
expect(stack1).toBeA(Stack, 'stack1 is not instance of Stack')
stack1.push(1)
expect(stack1.storage[0]).toBe(1, 'push should properly add something into storage')
expect(stack1.getMin()).toBe(1, 'getMin does not update when stack is empty')
stack1.push(2)
expect(stack1.storage[1]).toBe(2, 'push should properly add something into storage')
expect(stack1.getMin()).toBe(1, 'getMin does not when larger value is pushed onto stack')
stack1.pop()
expect(stack1.storage[1]).toBe(undefined, 'push should remove something into storage')
stack1.pop()
expect(stack1.getMin()).toBe(null, 'getMin does not work when all values deleted')
stack1.push(4)
stack1.push(5)
stack1.push(2)
stack1.push(1)
expect(stack1.getMin()).toBe(1, 'getMin does not work when smaller value is pushed onto stack')
stack1.pop()
expect(stack1.getMin()).toBe(2, 'getMin does not work when min is what was popped out')
stack1.pop()
expect(stack1.getMin()).toBe(4, 'getMin does not work when min is what was popped out and new min is futher down the stack')

console.log('all test pass')