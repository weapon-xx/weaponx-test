> 函数式编程（functional programming）或称函数程序设计，又称泛函编程，是一种编程范型，比起命令式编程，函数式编程更加强调程序执行的结果而非执行的过程，倡导利用若干简单的执行单元让计算结果不断渐进，逐层推导复杂的运算，而不是设计一个复杂的执行过程。

  函数式编程，近年来一直被炒得火热，国内外的开发者好像都在议论和提倡这种编程范式。在众多的函数式语言中，Javascript 无疑是最亮眼的一个，越来越多的人开始学习和拥抱它，并使用它运用函数式编程来开发实际的大型应用，开源社区也源源不断的诞生函数式风格的框架和类库（Angular / React / Redux）。

  作为 web 平台唯一的标准通用语言，Javascript 在软件历史上掀起了最大的语言热潮，拥有当下最大的开源包管理工具（npm）的 Javascript 也从 Lisp 手中接过了维持数十年的 “最流行的函数式编程语言” 的名号。在 Javascript 的世界中是天然支持函数式编程的，函数式编程的特征有：
- 一等函数
- 闭包
- 高阶函数
- 纯度

本文会以 Javascript 为例子，和大家一起了解和学习函数式编程。

---


### 一等函数(First Class Functions)
一等函数这个术语最早在20世纪60年代，由英国计算机科学家 **Christopher Strachey** 在 **functions as first-class citizens** 一文中提出的。意思是指，函数和一等公民(Number / String...)一样，拥有和它们一样的能力和作用：
- 函数储存为变量
```Javascript
const foo = () => {...}
```

- 函数可以储存为数据的一个元素
```Javascript
const arr = [1, 2, () => {...}]
```

- 函数可以作为对象的属性值
```Javascript
const obj = {name: 'xx', say: () => {}}
```

- 函数可以在使用时直接创建出来
```Javascript
1 + (() => { return 2; })()
```

- 函数可以作为变量传递给另一个函数
```Javascript
bar (name, fun) { fun(name) }
bar('xx', (name) => { console.log(name) })
```

- 函数可以被另一个函数返回
```Javascript
foo() {
    return () => {...}
}
```

在函数式编程中，函数是作为基本单元，并且在函数之上建立代码和数据的封装，以提高应用的重用和灵活性。支持一等函数的作用是显而易见的，我们可以使用函数去完成大部分变量实现的功能。

### 闭包(Closure)
历经了 30年，闭包终于成为了编程语言的主要特点。但是根据一项调查显示，有关 Javascript 闭包的问题占了 23% 左右，对于相当数量的开发者来说闭包仍然模糊而又神秘。对于闭包解释我还是更倾向于 **Kyle Simpson** 的系列书 You Don’t Know JavaScript 中的解释：

> 函数在被定义时是可以访问当前的词法作用域，当函数离开作用域之外被执行时，就形成了闭包。

简而言之，闭包就是一个函数，捕获了作用域内的外部绑定。来看个例子：

```javascript
function student (people) {
  return (name) => { return people[name] }
}
var someone = student({xx: {age: 20}, jackson: {age: 21}})
someone('xx') // {age: 20}
```

在执行完 student 函数后，里面的匿名函数形成了一个闭包，闭包是可以访问到 people 对象。闭包为 Javascript 提供了私有访问，这让给开发者建立数据抽象提供了极大地便利，也可以更好地书写函数式代码，建立更加强大的代码。

来思考一个场景，手头上拥有一个书本的数组，数组里面包含了书本的信息，现在需要做的是找出把书名填充到一个数组中并且返回，我们一般都会这样写：
```javascript
const books = [{title: '人类简史', author: 'zz'}, {title: '禅与摩托车维修艺术', author: 'tt'}]

books.map((item) => { return item.title })
```

我们使用了 Array.prototype.map 方法，传入了一个匿名函数，函数中 return 了一个包含书名 title 的对象。假如需要利用闭包来进一步抽象的话，要怎么写呢？
```javascript
function plucker (key) {
  return  (obj) => {
    return (obj && obj[key])
  }
}

books.map(plucker('title'))
```

我们定义了一个 plucker 函数，它接收一个 key 参数并返回一个匿名函数，匿名函数就是一个闭包并补捕获了 key 参数。在利用了闭包的情况下，我们可以传入任意想要的书本信息（比如：plucker('author')），这样就提高了代码的重用性和灵活性。当我们对于闭包认识足够充分时并合理运用到实际开发中去，将会切身体会到闭包的威力和它给我们带来的便利。

### 高阶函数(Higher Order Functions)
在数学和计算机科学中，高阶函数式至少满足下列一个条件的函数：
- 接受一个或多个函数作为输入
- 输出一个函数

在上述的 plucker 函数就是一个例子，还有我们熟知的 Array.prototype 相关的方法，比如 .map、.sort 等等都是高阶函数，因为它们满足接受一个函数作为参数的条件。
那么先来看一个一阶函数的例子，定义一个函数，它会将数组中4个字母的单词给过滤掉：
```javascript
const words = ['foo', 'bar', 'test', 'some'];
const filter = words => {
  let arr = [];
  for(let i = 0, { length } = words; i < length; i++) {
    const word = word[i];
    if(word.length !== 4) {
      arr.push(word);
    }
  }
  return arr;
}

filter(words); // ['foo', 'bar']
```
假如现在又需要过滤数组中，以 ‘b’ 字母开头的单词？那么再定义一个函数：
```javascript
const startWith = words => {
  let arr = [];
  for(let i = 0, { length } = words; i < length; i++) {
    const word = word[i];
    if(word.indexOf('b') !== 0) {
      arr.push(word);
    }
  }
  return arr;
}
filter(words); // ['foo', 'test', 'some']
```
根据上面两个函数的对比来看，其实主要代码的逻辑都是相似的，先遍历数组再进行条件判断，最后 push 到数组中。其实，遍历和过滤都可以抽象出来，可以方便其他的类似函数去调用，毕竟在数组中根据条件过滤是很常见的需求。
```javascript
const reduce = (reducer, init, arr) => {
  let acc = init;
  for(let i = 0,{ length } = arr; i < length; i++) {
    acc = reducer(acc, arr[i]);
  }
  return acc;
}
reduce((acc, curr) => acc + curr, 0, [1, 2, 3]);	// 6
```

如果使用过 Underscore 库的话，就会发现 reduce 和 Underscore.reduce 作用是一样的，实现的是累计的功能。reduce 接受了 3 个参数：ruducer 函数、累计的初始值和一个数组，遍历时将每个数组元素作为 reducer 的参数传入，返回值又赋值给累计变量 init，遍历完成时也就完成了累计的功能。

现在如果将 rudece 应用到第一个需求上（过滤四个字母的单词）：
```javascript
const func = (fn ,arr) => {
  return reduce((acc, curr) => fn(curr) ? acc.concat([curr]) : acc, [], arr)
}
console.log(func(word => word.length !== 4, words)); // ["foo", "bar"]
```

可以发现，将公共代码抽象出来之后，filter 的函数实现非常简洁，只需传入不同的条件函数，就能为我们去处理符合各种条件的数据。高阶函数可以用来实现函数的多态性，并且相对于一阶函数，高阶函数的复用性和灵活性更好。


### 纯度(Purity)
函数式编程不仅仅只关心函数，也是思考如何尽量地降低软件复杂性的一种方式。在一些函数式编程语言中，纯度是被强制执行的，不允许使用有副作用的表达式。但是在 Javascript 中，纯度必须通过管理区实现，并且非常容易在偶然间创建和使用非纯函数。

一个纯函数需要满足以下三个条件：
- 函数结果只能通过参数来计算得出
- 不能依赖于能被外部操作改变的数据
- 不能改变外部状态

根据这上述条件来看，在 Javascript 的世界中去维持绝对纯净是不可能的，因为缺少了大多数函数式语言中使用的高效、不变的数据结构。我们知道在 Javascript 拥有能力去```freeze()```对象，但是只能对接对象的顶级属性，这就意味着一个嵌套对象下的属性是仍然能够被更改的。
```javascript
var obj = Object.freeze({
	foo: 'hello',
	bar: {
		text: 'world'
	}
})

obj.foo = 'goodbye';
console.log(obj.foo); // hello

obj.bar.text = 'goobye';
console.log(obj.bar.text); // goodbye
```
在 ES6 中新增的 const 关键字，使用 const 可以定义一个不能够被重新赋值为不同的值，但是一个 const 对象的属性还是可变的。
```javascript
const obj = 'hello';
obj = 'goodbye';	// Uncaught TypeError: Assignment to constant variable.

const obj = {
	foo: 'hello',
	bar: 'world'
}

obj.foo = 'goodbye';
console.log(obj); 	// {foo: 'goodbye', bar: 'world'}
```
在 Javascrpt 中实现综合不变性还有很长的路要走。换句话来说，虽然不能够保证绝对的纯净，但是我们可以将纯净的部分抽离出来，将变化的影响降到最低，使得代码变得更加通用和容易测试。


> 参考文献：
- [维基百科](https://zh.wikipedia.org/wiki/Wikipedia:%E9%A6%96%E9%A1%B5)
- [Why Learn Functional Programming in JavaScript?](https://medium.com/javascript-scene/why-learn-functional-programming-in-javascript-composing-software-ea13afc7a257) -- Eric Elliott
- [Higher Order Functions](https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99) -- Eric Elliott
- [Javascript 函数式编程](https://www.amazon.cn/%E5%9B%BE%E4%B9%A6/dp/B01264FOY4/ref=sr_1_1?ie=UTF8&qid=1493183410&sr=8-1&keywords=javascript+%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B) -- Micbael Fogus
