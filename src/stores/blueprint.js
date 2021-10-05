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
    id,
    condition_id: id,
    depth,
    input: { clause: meta?.clauses[0].id },
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
          id: condition.condition_id,
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

  indexOfCriterion({ uid }) {
    let index = -1;
    for (let i = 0; i < this.blueprint.length; i++) {
      if (this.blueprint[i].uid === uid) {
        index = i;
        break;
      }
    }
    return index;
  }

  replaceCriterion(previousIndex, nextCriterion) {
    const { meta, id } = this.findCondition(nextCriterion.id);
    const newCriterion = criterion(id, 1, meta)
    this.blueprint.splice(previousIndex, 1, newCriterion);
    this.blueprintChanged();
  }

  removeCriterion(position) {
    /**
       To support 'groups' there is some complicated logic for deleting criterion.

       Imagine this simplified blueprint: [eq, and, sw, or, eq]

       User clicks to delete the last eq. We also have to delete the preceding or
       otherwise we're left with a hanging empty group

       What if the user deletes the sw? We have to clean up the preceding and.

       Imagine another scenario: [eq or sw and ew]
       Now we delete the first eq but this time we need to clean up the or.

       These conditionals cover these cases.
    **/
      const { blueprint } = this;
      const previous = blueprint[position - 1];
      const next = blueprint[position + 1];
  
      const nextIsOr = next && next.word === 'or';
      const previousIsOr = previous && previous.word === 'or';
  
      const nextIsRightParen = nextIsOr || !next;
      const previousIsLeftParen = previousIsOr || !previous;
  
      const isFirstInGroup = previousIsLeftParen && !nextIsRightParen;
      const isLastInGroup = previousIsLeftParen && nextIsRightParen;
      const isLastCriterion = !previous && !next;
  
      if (isLastCriterion) {
        this.blueprint = [];
  
      } else if (isLastInGroup && previousIsOr) {
        blueprint.splice(position - 1, 2);
  
      } else if (isLastInGroup && !previous) {
        blueprint.splice(position, 2);
  
      } else if (isFirstInGroup) {
        blueprint.splice(position, 2);
  
      } else {
        blueprint.splice(position - 1, 2);
      }
      this.blueprintChanged();
  }

  findCriterion(uid) {
    const conditionIndex = this.indexOfCriterion({ uid });
    return this.blueprint[conditionIndex];
  }

  addGroup() {
    const { blueprint, conditions } = this;
    const condition = conditions[0];
    const { meta } = condition;

    if(blueprint.length > 0) {
      blueprint.push(or());
    }
    blueprint.push(
      criterion(condition.id, 1, meta)
    );    
    
    this.blueprintChanged();
  }

  addCriterion(newCriterion) {
    const { id, depth } = newCriterion;
    const { blueprint } = this;
    const generatedCriterion = criterion(id, depth);
    if (blueprint.length === 0) {
      blueprint.push(generatedCriterion)
    } else {
      blueprint.splice(
        blueprint.length,
        0,
        and(),
        generatedCriterion,
      );
    }
    
    return generatedCriterion;
  }

  insertCriterion(previousPosition) {
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

  findCondition(conditionId) {
    let foundCondition = this.conditions[0];

    this.conditions.forEach((condition) => {
      if (condition.id === conditionId) {
        foundCondition = condition; 
      }
    });

    return foundCondition;
  }

  updateInput({ uid }, updates) {
    // Do the update iteratively on the input object to preserve it
    // as an observable to anything that references it. Swapping it out
    // means you can't pass it directly to anything you would always have
    // to reference condition.input everywhere versus just passing input.
    const condition = this.findCriterion(uid);
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
