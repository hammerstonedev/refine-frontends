class Blueprint {
  constructor(initialBlueprint, onChange) {
    this.conditions = initialBlueprint || [];
    this.blueprintChanged = () => {
      console.log(JSON.parse(JSON.stringify(this.conditions)));
      if (onChange) {
        onChange([...this.conditions]);
      }
    };
  }

  removeCondition(condition) {
    const conditionIndex = this.conditions.indexOf(condition);
    this.conditions.splice(conditionIndex, 1);
    this.blueprintChanged();
  }

  addCondition({ conditionId, type, depth }) {
    const condition = {
      conditionId,
      type,
      depth,
      input: {},
    };

    this.conditions.push(condition);
    this.blueprintChanged();
    return condition;
  }

  updateInput(condition, updates) {
    if (!condition) {
      throw new Error(`Can't find the condition with conditionId: ${condition.id} in the blueprint`);
    }

    // Do the update iteratively on the input object to preserve it
    // as an observable to anything that references it. Swapping it out
    // means you can't pass it directly to anything you would always have
    // to reference condition.input everywhere versus just passing input.
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
