import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import MoviesDashboard from "../MoviesDashboard.vue";

const genres = ["drama", "action", "sci-fi"];

describe("Text Field", () => {
  const wrapper = mount(MoviesDashboard);

  it("value gets added", () => {
    const textField = wrapper.find("#input-filed");
    textField.setValue("Dome");
    expect(textField.element.value).toContain("Dome");
  });

  it("sets the data correctly in the wrapper", () => {
    const textField = wrapper.find("#input-filed");
    textField.setValue("Dome");
    expect(wrapper.vm.movieText).toBe("Dome");
  });
});

describe("Drop Down Menu", async () => {
  const wrapper = mount(MoviesDashboard);

  it("sets the data correctly in the wrapper", async () => {
    await wrapper.setData({ genres: genres });
    const DropDownMenuValue = wrapper.find("#movies-genres");
    const drama = DropDownMenuValue.findAll("option")[0].element.value;
    const action = DropDownMenuValue.findAll("option")[1].element.value;
    const sciFi = DropDownMenuValue.findAll("option")[2].element.value;
    expect(drama).toBe("drama");
    expect(action).toBe("action");
    expect(sciFi).toBe("sci-fi");
  });

  it("sets the selected value", async () => {
    await wrapper.setData({ genres: genres });
    const options = wrapper.find("select").findAll("option");

    await options.at(1).setSelected();

    expect(wrapper.find("option:checked").element.value).toBe("action");
  });
});
