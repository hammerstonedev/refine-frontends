const getNextUid = (function() {
  let uid = 0;
  return () => {
    uid = uid + 1;
    return uid;
  };
})();

const criterion = ( id, depth, meta ) => {
  const uid = getNextUid();

  const condition = {
    condition_id: id,
    depth,
    input: { clause: meta.clauses[0].id },
    uid,
  };

  return condition;
}

const or = function(depth) {
  depth = depth === undefined ? 0 : depth;
  return {
    depth,
    type: 'conjunction',
    word: 'or',
  };
};

const and = function(depth) {
  depth = depth === undefined ? 1 : depth;
  return {
    depth,
    type: 'conjunction',
    word: 'and',
  };
};

class Blueprint {
  constructor(initialBlueprint, conditions, onChange) {
    initialBlueprint = initialBlueprint || [];
    conditions = conditions || [];

    this.conditions = conditions;

    this.blueprint = initialBlueprint.map((condition) => {
      return {
          ...condition,
          uid: getNextUid(),
        };
    });

    this.blueprintChanged = () => {
      console.log(JSON.parse(JSON.stringify(this.blueprint)));
      if (onChange) {
        onChange([...this.blueprint]);
      }
    };
  }

  groupedBlueprint() {
    if (this.blueprint.length === 0) {
      return [];
    }

    const groupedBlueprint = [];

    // start with an empty group
    groupedBlueprint.push([]);

    this.blueprint.forEach((piece, index) => {
      if (piece.word === 'or') {
        groupedBlueprint.push([]);
      } else if (piece.word === 'and') {
        return;
      } else {
        groupedBlueprint[groupedBlueprint.length - 1].push({
          ...piece,
          position: index,
        })
      }
    })

    return groupedBlueprint;
  }

  indexOfCondition({ uid }) {
    let index = -1;
    for (let i = 0; i < this.blueprint.length; i++) {
      if (this.blueprint[i].uid === uid) {
        index = i;
        break;
      }
    }
    return index;
  }

  replaceCondition(previousCondition, nextCondition) {
    const previousIndex = this.indexOfCondition(previousCondition);
    const newCriterion = criterion(nextCondition);
    this.blueprint.splice(previousIndex, 1, newCriterion);
    this.blueprintChanged();
  }

  removeCondition(condition) {
    const conditionIndex = this.indexOfCondition(condition);
    this.blueprint.splice(conditionIndex, 1);
    this.blueprintChanged();
  }

  findCondition(uid) {
    const conditionIndex = this.indexOfCondition({ uid });
    return this.blueprint[conditionIndex];
  }

  addCriterion(previousPosition) {
    const { blueprint, conditions } = this;
    const condition = conditions[0];
    const { meta } = condition;

    blueprint.splice(
      previousPosition + 1,
      0,
      and(),
      criterion(condition.id, 1, meta),
    );

    this.blueprintChanged();
    return blueprint[previousPosition + 1];
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
      this.onChange([...this.blueprint]);
    }
    this.blueprintChanged();
  }

}

export default Blueprint;
