
const debounce = (fn: Function, delay: number = 300, imm: boolean = false) => {
  let timeout:NodeJS.Timeout|null
  return function (this:any, ...args:any) {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (imm) {
      fn.apply(this, args)
    } else {
      timeout = setTimeout(function(this: any) {
        fn.apply(this, args)
      }, delay)
    }
    
  }
}

export default debounce