let currentEffects;

class Dep {
  constructor(value) {
    this.effects = new Set();
    this._value = value;
  }

  get value() {
    this.depend();
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
    this.notice();
  }

  depend() {
    if (currentEffects) {
      this.effects.add(currentEffects);
    }
  }

  notice() {
    this.effects.forEach((effect) => effect());
  }
}

function effectWatch(effect) {
  currentEffects = effect;
  effect();
  currentEffects = null;
}

debugger;
const dep = new Dep(10);

let b;
effectWatch(() => {
  b = dep.value + 10;
  console.log(b);
});

dep.value = 100;
dep.value = 200;
dep.value = 300;
dep.value = 400;
