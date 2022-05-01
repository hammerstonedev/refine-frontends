import { render, screen } from "@testing-library/react";
import { optionCondition } from "refine-core/fixtures";
import { QueryBuilder } from "components";

it("should render a select element", async () => {
  render(
    <QueryBuilder
      blueprint={[
        {
          depth: 1,
          type: "criterion",
          condition_id: "option",
          input: {
            clause: "eq",
          },
        },
      ]}
      conditions={[optionCondition]}
    />
  );

  const inputContainer = await screen.findByTestId("refine-input");
  expect(inputContainer.querySelectorAll("select")).toHaveLength(1);
});
