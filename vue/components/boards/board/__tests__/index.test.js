import { describe, expect, it } from "@jest/globals";
import MOCK_BOARD from "./mockBoard";
import TestBoardWrapper from "./TestBoardWrapper";
import { mount } from "@vue/test-utils";

// eslint-disable-next-line max-lines-per-function
describe("Board Component", () => {
  it("All Columns rendered", () => {
    const wrapper = mount(TestBoardWrapper, {
      propsData: {
        columns: MOCK_BOARD.columns,
        cards: MOCK_BOARD.cards,
      },
    });

    expect(
      wrapper.findAll(".board__column").length ===
        wrapper.props().columns.length
    ).toBe(true);
  });

  it("2 cards in each list", () => {
    const wrapper = mount(TestBoardWrapper, {
      propsData: {
        columns: MOCK_BOARD.columns,
        cards: MOCK_BOARD.cards,
      },
    });

    expect(
      wrapper.findAll('[data-status="Not Resolved"] li').length === 2
    ).toBe(true);
    expect(wrapper.findAll('[data-status="In Progress"] li').length === 2).toBe(
      true
    );
    expect(
      wrapper.findAll('[data-status="Awaiting Parts"] li').length === 2
    ).toBe(true);
    expect(wrapper.findAll('[data-status="Resolved"] li').length === 2).toBe(
      true
    );
  });

  it("Each card in the correct column", () => {
    const wrapper = mount(TestBoardWrapper, {
      propsData: {
        columns: MOCK_BOARD.columns,
        cards: MOCK_BOARD.cards,
      },
    });

    const PATH_TO_ID = ".board__card .board-card__head .text-uppercase";

    expect(
      wrapper
        .findAll(`[data-status="Not Resolved"] ${PATH_TO_ID}`)
        .at(0)
        .text() === "T02125-SI-01-1"
    ).toBe(true);

    expect(
      wrapper
        .findAll(`[data-status="Not Resolved"] ${PATH_TO_ID}`)
        .at(1)
        .text() === "T02125-SI-01-2"
    ).toBe(true);

    expect(
      wrapper
        .findAll(`[data-status="In Progress"] ${PATH_TO_ID}`)
        .at(0)
        .text() === "T02125-SI-02-1"
    ).toBe(true);

    expect(
      wrapper
        .findAll(`[data-status="In Progress"] ${PATH_TO_ID}`)
        .at(1)
        .text() === "T02125-SI-02-2"
    ).toBe(true);

    expect(
      wrapper
        .findAll(`[data-status="Awaiting Parts"] ${PATH_TO_ID}`)
        .at(0)
        .text() === "T02125-SI-03-1"
    ).toBe(true);

    expect(
      wrapper
        .findAll(`[data-status="Awaiting Parts"] ${PATH_TO_ID}`)
        .at(1)
        .text() === "T02125-SI-03-2"
    ).toBe(true);

    expect(
      wrapper.findAll(`[data-status="Resolved"] ${PATH_TO_ID}`).at(0).text() ===
        "T02125-SI-04-1"
    ).toBe(true);

    expect(
      wrapper.findAll(`[data-status="Resolved"] ${PATH_TO_ID}`).at(1).text() ===
        "T02125-SI-04-2"
    ).toBe(true);
  });
});
