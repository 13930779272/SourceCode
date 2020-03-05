class Vue{
  constructor(optinos){
    this.$el = optinos.el
    this.$data = optinos.data
    // console.log(this.$data.obj)
    // 再有this.$el的情况下才进行
    if(this.$el){
      // 先数据劫持，再调用编译器
      new Obsever(this.$data)
      // 调用编译器
      new Complier(this.$el,this)
     
      // this.proxyVm(this.$data)
    }
  }
  // proxyVm(data){
  //   for(let key in data){
  //     Object.defineProperty(this,key,{
  //       get:() => {
  //         return data[key]
  //       }
  //     })
  //   }
  // }
}
// 编译器
class Complier {
  constructor(el,vm){
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    let frag = this.fragmentNode(this.el)
    // 处理文档碎片中的属性
    this.complier(frag)
    // 插入到el里
    this.el.append(frag)
  }
  // 判断传进来的是否为元素节点，如果不是就获取
  isElementNode(ele){
    return ele.nodeType === 1
  }
  // 文档碎片
  fragmentNode(node){
    // 创建文档碎片,我们要把元素放到文档碎片中，一次性插入DOM节省性能
    let frag = document.createDocumentFragment()
    // 因为这里DOM操作都是剪切所以要一直拿第一个
    let firstChild;
    while(firstChild = node.firstChild){
      frag.append(firstChild)
    }
    return frag
  }
  // 在这需要处理文档碎片的属性，做到数据渲染视图
  complier(frag){
    // console.log(frag.childNodes)
    let nodes = [...frag.childNodes]
    // 可以拿到所有的子节点
    // console.log(nodes)
    // 循环子节点
    nodes.forEach(ele =>  {
      if(this.isElementNode(ele)){ // 此处为元素节点
        // console.log(ele)
        // 获取所有的属性
        let attrs = [...ele.attributes]
        attrs.forEach(attr => {
          // 判断是否有v-属性
          if(/^v-/.test(attr.nodeName)){
            // 拿到属性值
            let {nodeValue} = attr
            new Watcher(this.vm,nodeValue,(newVal) => {
              // console.log(1)
              ele.value = newVal
            })
            // 通过属性值在数据里拿到相应的数据
            let val = this.vm.$data[nodeValue]
            
            // 当input框改变的时候数据也变化
            ele.oninput = (ev)=>{
              console.log(this.vm)
              this.vm.$data[nodeValue] = ev.target.value
              console.log(this.vm.$data.val)
            }
            // 给input框的value值赋值
            ele.value = val
          }
        })
      }else{ // 此处为文本节点
        // console.log(ele)
        if(/\{\{\w+\}\}/.test(ele.nodeValue)){
          let str = ele.nodeValue,key;
          let val = str.replace(/\{\{(\w+)\}\}/g,(...arg) => {
            // console.log(arg)
            key = arg[1]
            return this.vm.$data[key]
          });
          new Watcher(this.vm,key,(newVal) => {
            // console.log(1)
            ele.nodeValue = newVal
          })
          // 给文本节点赋值
          ele.nodeValue = val
        }
      }
    })
  }
}
// 发布订阅器
class Dep {
  constructor(){
    this.sub = []
  }
  addSub(watcher){
    this.sub.push(watcher)
    console.log(this.sub)
  }
  notify(){
    this.sub.forEach(watcher => {
      console.log(1)
      watcher.updata()
    })
  }
}
// 观察者模式
class Watcher {
  constructor(vm,key,cb){
    Dep.target = this
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    // 一上来就获取一次老值
    this.oldVal = this.get()
    Dep.target = null
  }
  get(){
    return this.vm.$data[this.key]
  }
  updata(){
    let newVal = this.get()
    if(this.oldVal !== newVal){
      this.cb(newVal)
    }
  }
}
// 数据劫持,此时data的每个数据都应该有个get和set方法
class Obsever {
  constructor(data){
    console.log(data)
    // 调用循环
    this.obsever(data)
  }
  obsever(data){
    // 判断有数据并且为对象就循环
    if(data && Object.prototype.toString.call(data) === '[object Object]'){
      for(let key in data){
        this.defineReactive(data,key,data[key])
      }
    }
  }
  defineReactive(data,key,val){
    // 深度监控数据
    if(typeof val === 'object'){
      this.obsever(val)
    }
    let dep = new Dep
    // console.log(Dep.target)
    // 添加数据劫持
    Object.defineProperty(data,key,{
      get:() => {
        // console.log(Dep.target)
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set:(newVal) => {
        if(val !== newVal){
          this.obsever(newVal)
          val = newVal
          console.log(dep)
          dep.notify()
        }
      }
    })
  }
}