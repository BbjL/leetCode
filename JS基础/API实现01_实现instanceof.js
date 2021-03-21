class SuperType {}

class SubType extends SuperType {}

const sub = new SubType();
console.log(sub instanceof SuperType);


// instanceof 实现
function myInstanceof (target, superType) {
    let proto = Object.getPrototypeOf(target),
        protoType = superType.prototype;
    
    while (proto) {
        if (proto === protoType) return true
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}

console.log(
    myInstanceof(sub, SuperType)
);
