<p align="center">
<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&duration=3000&color=9B59B6&center=true&vCenter=true&width=500&lines=GitHub+Issue+Tracker">
</p>

---

## Assignment : 5 – Questions & Answers

**Answers to Questions**

### 1️. What is the difference between var, let, and const? ###


**Ans.** : 
**i. `var`** – Old-style variable

- Function scoped (block ignore kore bahire access kora jay)
- Can be reassigned and redeclared

**Example:**

```
var x=10;
x=20;// allowed
varx=30;// allowed
```

---

**ii. `let`** – Modern variable

- Block scoped (only accessible in the block)
- Can be reassigned, cannot be redeclared in the same scope

**Example:**

```
let y=15;
y=25;// allowed
// let y = 30; // not allowed in same scope
```

---

**iii. `const`** – Constant variable

- Block scoped
- Cannot be reassigned or redeclared
- If it holds an object or array, the content can be modified

**Example:**

```
const z=50;
// z = 60; // not allowed

const arr= [1,2,3];
arr.push(4);// allowed
```

---

### Quick Comparison Table

| Feature | var | let | const |
| --- | --- | --- | --- |
| Scope | Function | Block | Block |
| Reassignable | Yes | Yes | No |
| Redeclarable | Yes | No | No |
| Objects/Arrays | Can change | Can change | Content can change |

---
---
### 2️. What is the spread operator (...)? ###

**Ans.** : 
**Definition:**

The spread operator `...` allows an iterable (like an array or object) to **expand** in places where zero or more elements (for arrays) or key-value pairs (for objects) are expected.

---

**Examples:**

**i. With Arrays**

```
const arr1= [1,2,3];
const arr2= [...arr1,4,5];// [1, 2, 3, 4, 5]
```

**ii. With Objects**

```
const obj1= { a:1, b:2 };
const obj2= { ...obj1, c:3 };// { a: 1, b: 2, c: 3 }
```

**iii. Copying an Array**

```
const original= [10,20];
const copy= [...original];// [10, 20]
```

---
---

### 3️. What is the difference between map(), filter(), and forEach()? ###

**Ans.** : 
### Difference between `map()`, `filter()`, and `forEach()` in JavaScript

**i. `map()`** – Used to create a **new array** by applying a function to each element of the original array.

The length of the new array remains the same as the original array.

**Example:**

```
const numbers= [1,2,3];
const result=numbers.map(num => num*2);
console.log(result);// [2, 4, 6]
```

---

**ii. `filter()`** – Used to create a **new array with elements that match a condition**.

Only the elements that return `true` from the condition are included.

**Example:**

```
const numbers= [1,2,3,4];
const result=numbers.filter(num => num>2);
console.log(result);// [3, 4]
```

---

**iii. `forEach()`** – Used to **loop through an array** and perform an action for each element.

It **does not return a new array**.

**Example:**

```
const numbers= [1,2,3];
numbers.forEach(num => {
console.log(num);
});
```

---

### Quick Comparison Table

| Feature | map() | filter() | forEach() |
| --- | --- | --- | --- |
| Purpose | Transform each element | Select elements by condition | Execute a function for each element |
| Returns | New array | New array | No return (undefined) |
| Array length | Same as original | May be smaller | No new array created |
| Use case | Modify data | Find specific data | Just loop through elements |
---
---

### 4️. What is an arrow function? ###
**Definition:**

**Ans.** : 
**Arrow function** is a shorter syntax for writing functions in JavaScript.

It was introduced in **ES6** and makes function writing simpler and cleaner.

---

**Example:**

Normal Function

```
function add(a,b) {
return a+b;
}
```

Arrow Function

```
const add= (a,b) => {
return a+b;
};
```

Shorter Arrow Function

```
const add= (a,b) =>a+b;
```
---
---

### 5️. What are template literals? ###
**Definition:**

**Ans.** : 
**Template literals** are a way to write strings in JavaScript using **backticks ( ``)** instead of single (`' '`) or double (`" "`) quotes.

They allow **embedding variables and expressions inside a string** using `${}`.

---

**Example:**

Normal String

```
constname="John";
constmessage="Hello "+name;
```

Template Literal

```
constname="John";
constmessage=`Hello${name}`;
```

Multi-line String
```
const text=`This is
a multi-line
string`;
```
---
---

