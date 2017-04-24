> 函数式编程（英语：functional programming）或称函数程序设计，又称泛函编程，是一种编程范型，比起命令式编程，函数式编程更加强调程序执行的结果而非执行的过程，倡导利用若干简单的执行单元让计算结果不断渐进，逐层推导复杂的运算，而不是设计一个复杂的执行过程。

函数式编程，近年来一直被炒得火热，国内外的开发者好像都在议论和提倡这种编程范式。在众多的函数式语言中，Javascript 无疑是最亮眼的一个，越来越多的人开始学习和拥抱它，使用它运用函数式编程来开发实际的大型应用（Angular/react/redux），而 Javascript 从 Lisp 手中接过了维持数十年的 “最流行的函数式编程语言” 的名号，所以本文将会以 Javascript 为例，和大家一起来了解和学习函数式编程。

> Apps ate the world, the web ate apps, and JavaScript ate the web.

### 一等函数
### 闭包
### 高阶函数
### 纯度
### 递归



Javascript 是天然支持函数式编程的，举个例子：
```js
[1, 2, 3].forEach(function(val) {
  alert(val);
})
```
Array 的 forEach 接受一个匿名函数并且遍历数组每个元素传递给它。在 Javascript 中提供大量的能够以其他函数作为参数的方法或者函数。
