> 函数式编程（functional programming）或称函数程序设计，又称泛函编程，是一种编程范型，比起命令式编程，函数式编程更加强调程序执行的结果而非执行的过程，倡导利用若干简单的执行单元让计算结果不断渐进，逐层推导复杂的运算，而不是设计一个复杂的执行过程。

  函数式编程，近年来一直被炒得火热，国内外的开发者好像都在议论和提倡这种编程范式。在众多的函数式语言中，Javascript 无疑是最亮眼的一个，越来越多的人开始学习和拥抱它，并使用它运用函数式编程来开发实际的大型应用，开源社区也源源不断的诞生函数式风格的框架和类库（Angular / React / Redux）。

  作为 web 平台唯一的标准通用语言，Javascript 在软件历史上掀起了最大的语言热潮，拥有当下最大的开源包管理工具（npm）的 Javascript 也从 Lisp 手中接过了维持数十年的 “最流行的函数式编程语言” 的名号。在 Javascript 的世界中是天然支持函数式编程的，函数式编程的特征有：
- 一等函数
- 闭包
- 高阶函数
- 递归
- 纯度
- 基于流的编程方式

本文会以 Javascript 为例子，和大家一起了解和学习函数式编程。

> Apps ate the world, the web ate apps, and JavaScript ate the web.


### 一等函数(first class function)
一等函数这个术语最早在20世界60年代，由英国计算机科学家 **Christopher Strachey** 在 **functions as first-class citizens** 一文中提出的。意思是指，函数和一等公民(Number / String...)一样，拥有和它们一样的能力和作用：
- 函数储存为变量
```Javascript
const foo = function () {...}
```

- 函数可以储存为数据的一个元素
```Javascript
const arr = [1, 2, function () {...}]
```

- 函数可以作为对象的属性值
```Javascript
const obj = {name: 'xx', say: function () {}}
```

- 函数可以在使用时直接创建出来
```Javascript
1 + (function () {return 2})()
```

- 函数可以作为变量传递给另一个函数
```Javascript
function bar (name, fun) { fun(name) }
bar('xx', function (name) { console.log(name) })
```

- 函数可以被另一个函数返回
```Javascript
function foo() {
    return function () {...}
}
```

在函数式编程中，函数是作为基本单元，并且在函数之上建立代码和数据的封装，以提高应用的重用和灵活性。支持一等函数的作用是显而易见的，我们可以使用函数去完成大部分变量实现的功能。

### 闭包(closure)
历经了 30年，闭包终于成为了编程语言的主要特点。但是根据一项调查显示，有关 Javascript 闭包的问题占了 23% 左右，对于相当数量的开发者来说闭包仍然模糊而又神秘。对于闭包解释我还是更倾向于 **Kyle Simpson** 的系列书 You Don’t Know JavaScript 中的解释：

> 函数在被定义时是可以访问当前的词法作用域，当函数离开作用域之外被执行时，就形成了闭包。

简而言之，闭包就是一个函数，捕获了作用域内的外部绑定。来看个例子：

```javascript
function student (people) {
  return function (name) {
    return people[name]
  }
}
var someone = student(xx: {age: 20}, jackson: {age: 21})
someon('xx') // {age: 20}
```

在执行完 student 函数后，里面的匿名函数（someone）就形成了一个闭包，闭包是可以访问到 people 对象。闭包为 Javascript 提供了私有访问，这让给开发者建立数据抽象提供了极大地遍历，也可以更好地书写函数式代码，建立更加强大的代码。

来思考一个场景，手头上拥有一个书本的数组，数组里面包含了书本的信息，现在需要做的是找出把书名填充到一个数组中并且返回，我们一般都会这样写：
```javascript
const books = [{title: '人类简史', author: 'zz'}, {title: '禅与摩托车维修艺术', author: 'tt'}]

let arr = [];
books.map((item) => { return {title: item.title} })
```

我们新建了一个空数组，遍历书本数组，将 title 值再 push 到数组 arr 中。如果利用闭包的话，会怎么样呢？
```javascript
function plucker (key) {
  return function (obj) {
    return (obj && obj[key])
  }
}

books.map(plucker('title'))
```

可以看到，在利用了闭包的情况下，提高了代码的重用性和灵活性。当我们对于闭包认识足够充分时并运用到实际开发中去，将会充分体会到闭包带来的威力。









Javascript 是天然支持函数式编程的，举个例子：
```js
[1, 2, 3].forEach(function(val) {
  alert(val);
})
```
Array 的 forEach 接受一个匿名函数并且遍历数组每个元素传递给它。在 Javascript 中提供大量的能够以其他函数作为参数的方法或者函数。
