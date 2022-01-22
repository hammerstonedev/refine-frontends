import { render, screen } from "@testing-library/react";
import { QueryBuilder } from "../..";
import { numericCondition } from "../../../../../test/fixtures/conditions";

it("should render a number input", async () => {
  render(
    <QueryBuilder
      blueprint={[
        {
          depth: 1,
          type: "criterion",
          condition_id: "numeric",
          input: {
            clause: "eq",
          },
        },
      ]}
      conditions={[numericCondition]}
    />
  );

  const inputContainer = await screen.findByTestId("refine-input");
  expect(inputContainer.querySelectorAll("input[type='number']")).toHaveLength(
    1
  );
});
