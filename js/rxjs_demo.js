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
    next(x) {
      console.log('Observer got a next value: ' + x)
    }
  };

  foo.subscribe(observer)

  // subject 主体 既是 observables 也是 observer
  var subject = new Rx.Subject();

  subject.subscribe({
    next: v => {
      console.log(`observerA: ${v}`)
    }
  })

  subject.subscribe({
    next(v) {
      console.log(`observerB: ${v}`)
    }
  })

  subject.next(1) // observerA: 1
                  // observerB: 1

  // const baz = Rx.Observable.from([1, 2, 3])
  // baz.subscribe(subject)
