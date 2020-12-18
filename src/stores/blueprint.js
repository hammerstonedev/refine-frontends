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

  findCondition(conditionId) {
    const conditionIds = this.conditions.map(({ conditionId }) => conditionId);
    const conditionIndex = conditionIds.indexOf(conditionId);
    return this.conditions[conditionIndex];
  }

  addCondition({ conditionId, type, depth }) {
    const condition = this.findCondition(conditionId);

    if (!condition) {
      this.conditions.push({
        conditionId,
        type,
        depth,
        input: {},
      });
    }
    this.blueprintChanged();
    return this.findCondition(conditionId);
  }

  updateInput(conditionId, updates) {
    const condition = this.findCondition(conditionId);

    if (!condition) {
      throw new Error(`Can't find the condition with conditionId: ${conditionId} in the blueprint`);
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
