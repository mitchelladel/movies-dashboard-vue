import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import MovieCard from "../MovieCard.vue";

const genres = ["drama", "action", "sci-fi"];

describe("MovieCard", () => {
  it("renders rating properly", () => {
    const wrapper = mount(MovieCard, { props: { rating: 6 } });
    expect(wrapper.text()).toContain(6);
  });
});

describe("MovieCard", () => {
  it("renders genres properly", () => {
    const wrapper = mount(MovieCard, { props: { genres: genres } });
    expect(wrapper.text()).toContain("drama");
    expect(wrapper.text()).toContain("action");
    expect(wrapper.text()).toContain("sci-fi");
  });
});
