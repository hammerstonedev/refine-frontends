import { render, screen } from "@testing-library/react";
import { textCondition } from "refine-core/fixtures";
import { QueryBuilder } from "../..";

it("should render a text input", async () => {
  render(
    <QueryBuilder
      blueprint={[
        {
          depth: 1,
          type: "criterion",
          condition_id: "text",
          input: {
            clause: "eq",
          },
        },
      ]}
      conditions={[textCondition]}
    />
  );

  const criterion = await screen.findByTestId("refine-criterion");
  expect(criterion.querySelectorAll("input[type='text']")).toHaveLength(1);
});
