import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Form } from "../components/Form";

test("render form & take snapshot for correct render", () => {
  render(<Form onSubmit={() => console.log("submit click")} />);
  expect(screen.getByTestId("form")).toMatchSnapshot();
  expect(screen.getByTestId("form")).toBeTruthy();
});

test("render Product Title input field", () => {
  render(<Form onSubmit={() => console.log("submit click")} />);
  const titleElement = screen.getByPlaceholderText("Title...");
  expect(titleElement).toHaveValue("");
});

test("render Product Price input field", () => {
  render(<Form onSubmit={() => console.log("submit click")} />);
  const priceElement = screen.getByPlaceholderText("Price...");
  expect(priceElement).toHaveValue(0);
});

test("render Product Description textarea field", () => {
  render(<Form onSubmit={() => console.log("submit click")} />);
  const descriptionElement = screen.getByPlaceholderText(
    "Start typing product description here..."
  );
  expect(descriptionElement).toHaveValue("");
});
