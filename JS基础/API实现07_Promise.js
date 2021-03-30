

const PENDING = 'pending';
const RESOLVE = 'resolve';
const REJECT = 'reject';

class Prom {
  constructor (excutor) {
    this.$status = PENDING;
    this.$callBackQueue = [];
    this.$data = "";

    try {
      excutor(this.resolve.bind(this), this.reject.bind(this));
    }catch(e) {
      console.warn(e)
    }
  }

  resolve (value) {
    if (this.$status !== PENDING) {
      return 
    }
    this.$status = RESOLVE;
    this.$data = value;
    this.$callBackQueue.forEach(cb => {
      try{
        cb.onResolve(value);
      }catch(e) {
        cb.onReject(e)
      }
    })
  }

  reject (reason) {
    if (this.$status !== PENDING) {
      return 
    }
    this.$status = REJECT;
    this.$data = reason;
    this.$callBackQueue.forEach(cb => {
      try{
        cb.onReject(reason)
      }catch(e) {
        cb.onReject(e)
      }
    }) 
  }

  then (onResolve, onReject) {
    const self = this;
    // 判单传入参数是否为空
    onResolve = onResolve !== undefined ? onResolve = onResolve : onResolve = value => value;
    onReject = onReject !== undefined ? onReject = onReject : onReject = reason => {throw reason};

    return new Prom((resolve, reject) => {
      // 调用resolve 还是 reject 由onResolve onReject执行结果的返回值决定
      
      function handle (callBack, value) {
        try {
          // 获取执行结果
          const result = callBack(value);
          if (result instanceof Prom) { // 如果返回的是一个Promise对象
            result.then(resolve, reject);
          }else {
            resolve(value)
          }
        }catch(e) {
          reject(e)
        }
      }

      switch (self.$status) {
        case PENDING: 
          this.$callBackQueue.push(
            {
              onResolve: function (value) {
                handle(onResolve, value)
              }, 
              onReject: function (reason) {
                handle(onReject, reason)
              }, 
            }
          )
          break;
        case RESOLVE: 
          handle(onResolve, self.$data)
          break;
        case REJECT: 
          handle(onReject, self.$data)
          break;
      }
    }) 
  }

  catch (onResolve, onReject) {
    return this.then(undefined, onReject);
  }

  finally (onFinally) {
    return this.then(onFinally, onFinally)
  }

  static resolve (value) {
    return new Prom(resolve => {
      resolve(value);
    })
  }

  static reject (reason) {
    return new Prom((undefined, reject) => {
      reject(reason);
    })
  }

  static race (promises) {
    return new Prom((resolve) => {
      promises.forEach(p => {
        p.then(res => {
          resolve(res)
        }, err => {
          resolve(err)
        })
      })
    })
  }

  static all (promises) {
    let result = [];
    let count = 0;
    return new Prom((resolve, reject) => {
      if (!promises.length) resolve()
      promises.forEach((p, index) => {
        // 如果是一个promise对象
        if (p instanceof Prom) {
          p.then(res => {
            result[index] = res;           
            count++
            if (count === promises.length) resolve(result)
          },reason => {
            reject(reason);
          });
        }else {
          // 其他数据类型
          result[index] = p;
          if (result.length === promises.length) resolve(result);
        }
      })
    })
  }

  static any () {

  }
}

const promise = new Prom((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 100)
});
promise
.then((res) => {
  console.log('resolve1');
  return new Prom((resolve) => {
    resolve('data')
  })
})
.then(res => {
  console.log(res, 'resolve2');
  // throw Error ('error')
})
.catch(error => {
  console.log(error, 'catch');
  return new Prom((resolve, reject) => {
    reject('reject')
  })
})
.finally(res => {
  console.log(res, 'finally');
})


Prom.reject('static resolve').catch(res => {
  console.log(res);
})

const p1 = new Prom(resolve => {
  setTimeout(() => {
    resolve(2)
  }, 3000)
})
const p2 = new Prom((resolve, reject) => {
  setTimeout(() => {
      reject(1)
  }, 1000)
})
const p3 = new Prom(resolve => {
  setTimeout(() => {
    resolve(3)
  }, 2000)
})
Prom.all([p1, p2, p3]).then(res => {
  console.log(res, 'all');
});
Prom.race([p1, p2, p3]).then(res => {
  console.log(res, 'race');
});



Promise.resolve(2).then(res => {
  console.log(res);
})
.catch(error => {
  console.log(error);
})