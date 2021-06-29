import React from "react";
import { render as rtlRender, screen } from "@testing-library/react";

import renderWithReduxAndRouter from "../../../testingUtilities/costomRender";

import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  test("should recieve every prop", () => {
    renderWithReduxAndRouter(<LoginForm />, {initialState: {}})
    //.debug()
    expect(screen.queryByText("Member Login")).toBeInTheDocument();
  });
});
