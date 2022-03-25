import type {
  Blueprint,
  Condition,
  Conjunction,
  Criterion,
  GroupedBlueprint,
  Refinement,
} from "types";
import { isConjunction, isCriterion } from "types";

let uid = 0;
const getNextUid = function () {
  return uid++;
};

const criterion = (
  id: Criterion["condition_id"],
  depth: number,
  meta?: Condition["meta"],
  refinements?: Refinement[]
): InternalCriterion => {
  const uid = getNextUid();
  const [firstRefinement] = refinements || [];

  return {
    id,
    condition_id: id,
    depth,
    type: "criterion",
    input: {
      clause: meta?.clauses[0].id,
      ...(firstRefinement && {
        [firstRefinement.id]: {
          clause: firstRefinement?.meta?.clauses[0]?.id,
        },
      }),
    },
    uid,
  };
};

const or = function (depth: number = 0): InternalConjunction & { word: "or" } {
  return {
    id: undefined,
    depth,
    type: "conjunction",
    word: "or",
    uid: getNextUid(),
  };
};

const and = function (
  depth: number = 1
): InternalConjunction & { word: "and" } {
  return {
    id: undefined,
    depth,
    type: "conjunction",
    word: "and",
    uid: getNextUid(),
  };
};

type InternalCriterion = Criterion & {
  id: Criterion["condition_id"];
  uid: number;
};

type InternalConjunction = Conjunction & {
  id: undefined;
  uid: number;
};

type InternalBlueprint = Array<InternalCriterion | InternalConjunction>;

export class BlueprintStore {
  private conditions: Condition[];
  private blueprint: InternalBlueprint;

  public blueprintChanged: () => void;

  public constructor(
    initialBlueprint?: Blueprint,
    conditions?: Condition[],
    onChange?: (blueprint: Blueprint) => void
  ) {
    uid = 0;

    initialBlueprint = initialBlueprint || [];
    conditions = conditions || [];

    this.conditions = conditions;

    this.blueprint = this.mapBlueprint(initialBlueprint);

    this.blueprintChanged = () => {
      // console.log(JSON.parse(JSON.stringify(this.blueprint)));
      if (onChange) {
        onChange([...this.blueprint]);
      }
    };
  }

  public mapBlueprint(blueprint: Blueprint): InternalBlueprint {
    return blueprint.map((item) => {
      if (isCriterion(item)) {
        return {
          ...item,
          id: item.condition_id,
          uid: getNextUid(),
        };
      }

      return {
        ...item,
        id: undefined,
        uid: getNextUid(),
      };
    });
  }

  public getBlueprint(): Blueprint {
    return this.blueprint.map(({ id, uid, ...item }) => item);
  }

  public updateBlueprint(newBlueprint: Blueprint) {
    uid = 0;

    this.blueprint = this.mapBlueprint(newBlueprint);
  }

  public groupedBlueprint() {
    if (this.blueprint.length === 0) {
      return [];
    }

    const groupedBlueprint: GroupedBlueprint = [];

    // start with an empty group
    groupedBlueprint.push([]);

    this.blueprint.forEach((piece, index) => {
      if (isConjunction(piece)) {
        if (piece.word === "or") {
          groupedBlueprint.push([]);
        }

        return;
      }

      groupedBlueprint[groupedBlueprint.length - 1].push({
        ...piece,
        position: index,
      });
    });

    return groupedBlueprint;
  }

  public indexOfCriterion({ uid }: Pick<InternalCriterion, "uid">) {
    let index = -1;
    for (let i = 0; i < this.blueprint.length; i++) {
      if (this.blueprint[i].uid === uid) {
        index = i;
        break;
      }
    }
    return index;
  }

  public replaceCriterion(
    previousIndex: number,
    nextCriterion: Pick<InternalCriterion, "id">
  ) {
    const { meta, id, refinements } = this.findCondition(nextCriterion.id);
    const newCriterion = criterion(id, 1, meta, refinements);
    this.blueprint.splice(previousIndex, 1, newCriterion);
    this.blueprintChanged();
  }

  public removeCriterion(position: number) {
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

    const nextIsOr = isConjunction(next) && next.word === "or";
    const previousIsOr = isConjunction(previous) && previous.word === "or";

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

  public findCriterion(uid: number): InternalCriterion | undefined {
    const conditionIndex = this.indexOfCriterion({ uid });
    return this.blueprint[conditionIndex] as InternalCriterion;
  }

  public addGroup() {
    const { blueprint, conditions } = this;
    const condition = conditions[0];
    const { meta, refinements } = condition;

    if (blueprint.length > 0) {
      blueprint.push(or());
    }
    blueprint.push(criterion(condition.id, 1, meta, refinements));

    this.blueprintChanged();
  }

  public addCriterion(newCriterion: Pick<InternalCriterion, "id" | "depth">) {
    const { id, depth } = newCriterion;
    const { blueprint } = this;
    const generatedCriterion = criterion(id, depth);
    if (blueprint.length === 0) {
      blueprint.push(generatedCriterion);
    } else {
      blueprint.splice(blueprint.length, 0, and(), generatedCriterion);
    }

    this.blueprintChanged();
    return generatedCriterion;
  }

  public insertCriterion(previousPosition: number) {
    const { blueprint, conditions } = this;
    const condition = conditions[0];
    const { meta, refinements } = condition;

    blueprint.splice(
      previousPosition + 1,
      0,
      and(),
      criterion(condition.id, 1, meta, refinements)
    );

    this.blueprintChanged();
    return blueprint[previousPosition + 1];
  }

  public findRefinement(
    conditionId: InternalCriterion["condition_id"],
    findId: Refinement["id"]
  ): Refinement | undefined {
    const { refinements } = this.findCondition(conditionId);

    let result: Refinement | undefined;
    refinements.forEach((refinement) => {
      if (refinement.id === findId) {
        result = refinement;
      }
    });
    return result;
  }

  public findCondition(conditionId: InternalCriterion["condition_id"]) {
    let foundCondition = this.conditions[0];

    this.conditions.forEach((condition) => {
      if (condition.id === conditionId) {
        foundCondition = condition;
      }
    });

    return foundCondition;
  }

  public switchClause(
    { uid, id }: InternalCriterion,
    clause: string,
    refinementId: Refinement["id"]
  ) {
    const { meta } = this.findCondition(id);
    const criterion = this.findCriterion(uid);

    if (Array.isArray(meta.options)) {
      criterion.input = {
        clause,
      };
    } else {
      this.updateInput({ uid }, { clause }, refinementId);
    }
  }

  public switchRefinement(
    { uid, id }: InternalCriterion,
    oldRefinementId: Refinement["id"],
    newRefinementId: Refinement["id"]
  ) {
    const nextRefinement = this.findRefinement(id, newRefinementId);
    const criterion = this.findCriterion(uid);
    const input = { ...criterion.input };

    // Have to copy and swap out the input
    // because deleting and adding properties is
    // not observable by vue's reactivity system.
    // https://vuejs.org/v2/guide/reactivity.html#For-Objects
    delete input[oldRefinementId];
    input[newRefinementId] = {
      clause: nextRefinement.meta.clauses[0].id,
    };
    criterion.input = input;
  }

  public updateInput(
    { uid }: Pick<InternalCriterion, "uid">,
    updates: Partial<InternalCriterion["input"]>,
    refinementId?: Refinement["id"]
  ) {
    // Do the update iteratively on the input object to preserve it
    // as an observable to anything that references it. Swapping it out
    // means you can't pass it directly to anything you would always have
    // to reference condition.input everywhere versus just passing input.
    const condition = this.findCriterion(uid);
    Object.keys(updates).forEach((key) => {
      if (refinementId) {
        condition.input[refinementId][key] = updates[key];
      } else {
        condition.input[key] = updates[key];
      }
    });
    this.blueprintChanged();
  }
}
