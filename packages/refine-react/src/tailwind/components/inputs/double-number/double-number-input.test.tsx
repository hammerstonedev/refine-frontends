import { render, screen } from "@testing-library/react";
import { QueryBuilder } from "../..";
import { numericCondition } from "../../../../../test/fixtures/conditions";

it("should render two number inputs", async () => {
  render(
    <QueryBuilder
      blueprint={[
        {
          depth: 1,
          type: "criterion",
          condition_id: "numeric",
          input: {
            clause: "btwn",
          },
        },
      ]}
      conditions={[numericCondition]}
    />
  );

  const inputContainer = await screen.findByTestId("refine-input");
  expect(inputContainer.querySelectorAll("input[type='number']")).toHaveLength(
    2
  );
});
