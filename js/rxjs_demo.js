import Rx from 'rxjs/Rx'

const button = document.querySelector('button')

  Rx.Observable.fromEvent(button, 'click')
    .scan(count => count + 1, 0)
    .subscribe(count => console.log(`click ${count} time!`))


  const foo = Rx.Observable.create(observer => {
      setTimeout(() => {
        observer.next('async function foo end')
      }, 1000)
  });

  const bar = Rx.Observable.create(observer => {
    setTimeout(() => {
      observer.next('async function bar end')
    }, 500)
  });

  var observer = {
    next: x => console.log('Observer got a next value: ' + x),
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };

  
  foo.subscribe(observer)
