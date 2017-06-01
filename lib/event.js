
import { Subject } from 'rxjs/Subject'

export function createEvent() {
  const subject = new Subject()

  const fun = function(data) {
    subject.next(data)
  }

  fun.subscribe = (...args) => {
    subject.subscribe(...args)
  }

  return fun
}
