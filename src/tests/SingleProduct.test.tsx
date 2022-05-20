import * as React from "react";
import { render, screen } from "@testing-library/react";
import SingleProduct from "../components/SingleProduct";

const dummyProduct = {
  id: 21,
  title: "Dummy Product",
  description: "Product Description",
  price: 123,
  isFavorite: false,
  rating: { rate: 2, count: 123 },
};

test("render Single Product Card & take snapshot", () => {
  render(
    <SingleProduct
      key={dummyProduct.id}
      index={dummyProduct.id}
      product={dummyProduct}
      onFav={() => console.log("fav click")}
    />
  );
  expect(screen.getByTestId("single-product")).toMatchSnapshot();
  expect(screen.getByTestId("single-product")).toBeTruthy();
});

test("render Single Product details", () => {
  render(
    <SingleProduct
      key={dummyProduct.id}
      index={dummyProduct.id}
      product={dummyProduct}
      onFav={() => console.log("fav click")}
    />
  );
  expect(screen.getByText("Dummy Product")).toBeTruthy();
  expect(screen.getByText("Product Description")).toBeTruthy();
});

test("check Product is not Favorite", () => {
  render(
    <SingleProduct
      key={dummyProduct.id}
      index={dummyProduct.id}
      product={dummyProduct}
      onFav={() => console.log("fav click")}
    />
  );
  expect(screen.queryAllByDisplayValue("Add To Favorite's")).toBeTruthy();
});
