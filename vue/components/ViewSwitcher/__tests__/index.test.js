import { describe, expect, it } from "@jest/globals";
import { ERRORS } from "../errors";
import ViewSwitcher from "../ViewSwitcher";
import { shallowMount } from "@vue/test-utils";

describe("ViewSwitcher Component", () => {
  it("Should throw exception when one parameter passed", () => {
    const OPTIONS = {
      propsData: {
        views: [
          {
            name: "table",
            iconName: "table",
          },
        ],
      },
    };

    try {
      shallowMount(ViewSwitcher, OPTIONS);
    } catch (error) {
      expect(error.message).toBe(ERRORS.COUNT);
    }
  });
  it("Should throw exception when wrong structure of view passed", () => {
    const OPTIONS = {
      propsData: {
        views: [
          {
            name1: "table",
            iconName: "table",
          },
          {
            name: "card",
            iconName: "card",
          },
        ],
      },
    };

    try {
      shallowMount(ViewSwitcher, OPTIONS);
    } catch (error) {
      expect(error.message).toBe(ERRORS.STRUCTURE);
    }
  });
  it("Component is rendered when valid data passed", () => {
    const OPTIONS = {
      propsData: {
        views: [
          {
            name: "table",
            iconName: "table",
          },
          {
            name: "card",
            iconName: "card",
          },
        ],
      },
    };

    const wrapper = shallowMount(ViewSwitcher, OPTIONS);

    expect(wrapper.exists()).toBe(true);
  });
  it("Inputs are rendered when valid data passed", () => {
    const OPTIONS = {
      propsData: {
        views: [
          {
            name: "table",
            iconName: "table",
          },
          {
            name: "card",
            iconName: "card",
          },
        ],
      },
    };

    const wrapper = shallowMount(ViewSwitcher, OPTIONS);

    expect(
      wrapper.findAll(".ui-view-switcher__input").length ===
        wrapper.vm.views.length
    ).toBe(true);
  });
  it("Input is rendered with disabled attribute when view has disabled property as true", () => {
    const OPTIONS = {
      propsData: {
        views: [
          {
            name: "table",
            iconName: "table",
            disabled: true,
          },
          {
            name: "card",
            iconName: "card",
          },
        ],
      },
    };

    const wrapper = shallowMount(ViewSwitcher, OPTIONS);
    const disabledViews = wrapper.vm.views.filter((view) => view.disabled);

    expect(
      wrapper.findAll('.ui-view-switcher__input[disabled="disabled"]')
        .length === disabledViews.length
    ).toBe(true);
  });
  it('Should set active view when passed "activeView" includes in views array', () => {
    const ACTIVE_VIEW = "card";
    const OPTIONS = {
      propsData: {
        value: ACTIVE_VIEW,
        views: [
          {
            name: "table",
            iconName: "table",
          },
          {
            name: "card",
            iconName: "card",
          },
        ],
      },
    };

    const wrapper = shallowMount(ViewSwitcher, OPTIONS);

    expect(wrapper.vm.activeView === ACTIVE_VIEW).toBe(true);
  });
});
