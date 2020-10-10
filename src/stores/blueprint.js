class Blueprint {
  constructor(initialBlueprint, onChange) {
    this.conditions = initialBlueprint || [];
    this.blueprintChanged = () => {
      console.log(JSON.parse(JSON.stringify([...this.conditions])));
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
      });
    }
    this.blueprintChanged();
  }

  updateInput(conditionId, updates) {
    const condition = this.findCondition(conditionId);
    const { input } = condition;

    if (!condition) {
      throw new Error(`Can't find the condition with conditionId: ${conditionId} in the blueprint`);
    }

    condition.input = { ...input, ...updates };

    if (this.onChange) {
      this.onChange([...this.conditions]);
    }
    this.blueprintChanged();
  }

}

export default Blueprint;
