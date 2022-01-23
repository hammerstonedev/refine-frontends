import { render, screen, fireEvent } from "@testing-library/react";
import { booleanCondition } from "refine-fixtures";
import { QueryBuilder } from "..";

it("can add criterion groups", () => {
  render(<QueryBuilder blueprint={[]} conditions={[booleanCondition]} />);

  expect(screen.queryAllByTestId("refine-criterion-group")).toHaveLength(0);

  const addAnOrButton = screen.getByTestId("refine-add-criterion-group");
  fireEvent.click(addAnOrButton);

  expect(screen.queryAllByTestId("refine-criterion-group")).toHaveLength(1);

  fireEvent.click(addAnOrButton);

  expect(screen.queryAllByTestId("refine-criterion-group")).toHaveLength(2);
});

it("can add and remove criterion groups", () => {
  render(
    <QueryBuilder
      blueprint={[
        {
          type: "criterion",
          depth: 1,
          condition_id: "bool",
          input: {
            clause: "true",
          },
        },
      ]}
      conditions={[booleanCondition]}
    />
  );

  /**
   * This blueprint should render one group with one criterion.
   */
  expect(screen.queryAllByTestId("refine-criterion-group")).toHaveLength(1);
  expect(screen.queryAllByTestId("refine-criterion")).toHaveLength(1);

  /**
   * Adding a criterion should add a second criterion to the group.
   */
  fireEvent.click(screen.getByTestId("refine-add-criterion"));
  expect(screen.queryAllByTestId("refine-criterion")).toHaveLength(2);

  /**
   * Removing the first criterion should remove that criterion, leaving just one.
   */
  fireEvent.click(screen.getAllByTestId("refine-remove-criterion")[0]);
  expect(screen.queryAllByTestId("refine-criterion")).toHaveLength(1);

  /**
   * Removing the only remaining criterion should remove not only the criterion but the
   * group as you cannot have a group without any criteria.
   */
  fireEvent.click(screen.getByTestId("refine-remove-criterion"));
  expect(screen.queryAllByTestId("refine-criterion")).toHaveLength(0);
  expect(screen.queryAllByTestId("refine-criterion-group")).toHaveLength(0);
});
