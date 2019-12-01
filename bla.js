// const bar1 = () => {
//   for (let i = 0; i < 2000; i++) {
//     for (let i = 0; i < 1000; i++) {
//       for (let i = 0; i < 1000; i++) {
//       }
//     }
//   }
//   console.log('bar1');
// };
// const bar2 = () => { 
//   for (let i = 0; i < 2000; i++) {
//     for (let i = 0; i < 1000; i++) {
//       for (let i = 0; i < 1000; i++) {
//       }
//     }
//   } 
//   console.log('bar2');
// };
// const bazz2 = () => console.log('bazz2');
// const bazz1 = () => console.log('bazz1');

// const foo1 = () => {
//   console.log('foo1')
//   for (let i = 0; i < 2000; i++) {
//     for (let i = 0; i < 1000; i++) {
//       for (let i = 0; i < 1000; i++) {
//       }
//     }
//   }
//   setTimeout(bar1)
//   bazz1()
// }

// const foo2 = () => {
//   console.log('foo2')
//   setTimeout(bar2)
//   for (let i = 0; i < 3000; i++) {
//     for (let i = 0; i < 1000; i++) {
//       for (let i = 0; i < 1000; i++) {
//       }
//     }
//   }
//   bazz2()
//   for (let i = 0; i < 2000; i++) {
//     for (let i = 0; i < 1000; i++) {
//       for (let i = 0; i < 1000; i++) {
//       }
//     }
//   }
// }

// foo1()
// foo2()



// // function solution(N) {
// //   const arr = [];
// //   1 2 -3 
// //   1 2 -3 5 -5
// //   for (let i = 0; i < N / 2; i++) {
// //     arr.push(0 - i);
// //     arr.push(i);
// //   }
// //   if (N % 2 > 0) {
// //     arr.splice(0, 1)
// //   }
// //   return arr;
// // }
// // console.log(solution(5));

// function droidProducer(kind) {
//   if (kind === 'battle') return battleDroidFactory;
//   return pilotDroidFactory;
// }

// function battleDroidFactory() {
//    return new B1();
// }

// function pilotDroidFactory() {
//    return new Rx24();
// }


// class B1 {
//    info() {
//        return "B1, Battle Droid";
//    }
// }

// class Rx24 {
//    info() {
//        return "Rx24, Pilot Droid";
//    }
// }


// const a = new droidProducer('battle')
// console.log(a.info());


class Person {
  constructor() {
      if (typeof Person.instance === 'object') {
          return Person.instance;
      }
      Person.instance = this;
      return this;
  }
}

const a = new Person();
const b = new Person();
console.log(Person.instance)
console.log(a === Person.instance)

function Person1(name) {
  var _name = name
  return ({
  setName: function(name) { _name = name; },
  getName: function() { return _name; }
  });
}
const p = Person1('q')
console.log(p)
p.setName('e')
console.log(p.getName())

/*
  Creational:
    abstract factory - return class (not instance) from group of classes from same theme.
    builder - seperation construction
    factory - return instance by condition
    prototype - clone object 
*/