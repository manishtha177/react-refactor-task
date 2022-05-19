import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ShopApp from "../ShopApp";

test('render header', () => {
  render(<ShopApp />);
  expect(screen.getByTestId('header')).toBeTruthy()
})

test('render image 1', () => {
  render(<ShopApp />);
  expect(screen.getByTestId('img-1')).toBeTruthy()
})

test('render image 2', () => {
  render(<ShopApp />);
  expect(screen.getByTestId('img-2')).toBeTruthy()
})

test('render Send product proposal button', () => {
  render(<ShopApp />);
  expect(screen.getByTestId('send-product-button')).toBeTruthy()
})