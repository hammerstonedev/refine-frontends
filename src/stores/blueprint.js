const getNextUid = (function() {
  let uid = 0;
  return () => {
    uid = uid + 1;
    return uid;
  };
})();

class Blueprint {
  constructor(initialBlueprint, onChange) {
    initialBlueprint = initialBlueprint || [];

    this.conditions = initialBlueprint.map((condition) => {
      const uid = getNextUid();
      return [
        uid, {
          ...condition,
          uid: getNextUid(),
        }
      ];
    });

    this.blueprintChanged = () => {
      console.log(JSON.parse(JSON.stringify(this.conditions)));
      if (onChange) {
        onChange([...this.conditions]);
      }
    };
  }

  indexOfCondition({ uid }) {
    let index = -1;
    for (let i = 0; i < this.conditions.length; i++) {
      if (this.conditions[i].uid === uid) {
        index = i;
        break;
      }
    }
    return index;
  }

  replaceCondition(previousCondition, nextCondition) {
    const previousIndex = this.indexOfCondition(previousCondition);
    const newCondition = this.generateCondition(nextCondition);
    this.conditions.splice(previousIndex, 1, newCondition);
    this.blueprintChanged();
  }

  removeCondition(condition) {
    const conditionIndex = this.indexOfCondition(condition);
    this.conditions.splice(conditionIndex, 1);
    this.blueprintChanged();
  }

  generateCondition({ id, type, depth }) {
    const uid = getNextUid();

    const condition = {
      id,
      type,
      depth,
      input: {},
      uid,
    };
    return condition;
  }

  findCondition(uid) {
    const conditionIndex = this.indexOfCondition({ uid });
    return this.conditions[conditionIndex];
  }

  addCondition({ id, type, depth }) {
    const condition = this.generateCondition({ id, type, depth });
    this.conditions.push(condition);
    this.blueprintChanged();
    return condition;
  }

  updateInput({ uid }, updates) {
    // Do the update iteratively on the input object to preserve it
    // as an observable to anything that references it. Swapping it out
    // means you can't pass it directly to anything you would always have
    // to reference condition.input everywhere versus just passing input.
    const condition = this.findCondition(uid);
    Object.keys(updates).forEach((key) => {
      condition.input[key] = updates[key];
    });

    if (this.onChange) {
      this.onChange([...this.conditions]);
    }
    this.blueprintChanged();
  }

}

export default Blueprint;
