function Promise(executor) {

  // 添加属性
  this.PromiseState = 'pedding';
  this.PromiseResult = null;
  self = this; // 保存实例对象的 this 值

  function resolve(data) {
    // 判断状态 状态只能修改一次
    if (self.PromiseState !== 'pedding') return;

    // 修改对象的状态 (PromiseState)
    self.PromiseState = 'fulfilled'; // resolved
    // 设置对象的值 (PromiseResult)
    self.PromiseResult = data;
  };

  function reject(data) {
    // 判断状态 状态只能修改一次
    if (self.PromiseState !== 'pedding') return;

    // 修改对象的状态 (PromiseState)
    self.PromiseState = 'rejected';
    // 设置对象的值 (PromiseResult)
    self.PromiseResult = data;
  };

  try { // 捕获异常
    // 同步调用 [executor函数]
    executor(resolve, reject);
  } catch (err) {
    // 将 Promise 对象状态设置为失败
    reject(err)
  }

}

// 添加 then 方法
Promise.prototype.then = function (onResolved, onRejected) {

  // 调用回调函数 PromiseState
  if (this.PromiseState === 'fulfilled') {
    onResolved(this.PromiseResult);
  }

  if (this.PromiseState === 'rejected') {
    onRejected(this.PromiseResult);
  }


}