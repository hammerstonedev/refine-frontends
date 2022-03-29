import { render, screen } from "@testing-library/react";
import { numericCondition } from "refine-core/fixtures";
import { QueryBuilder } from "../..";

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
