import { describe, expect, it } from "vitest";
import { messages, t } from "./i18n";

describe("i18n", () => {
  it("falls back to English for unknown languages", () => {
    expect(t("tab_flights", "fr")).toBe(messages.en.tab_flights);
  });
  it("returns German for de", () => {
    expect(t("tab_flights", "de")).toBe("Flüge");
  });
  it("has every key in both languages, none empty", () => {
    expect(Object.keys(messages.de).sort()).toEqual(Object.keys(messages.en).sort());
    for (const lang of ["de", "en"] as const) {
      for (const value of Object.values(messages[lang])) expect(value.trim()).not.toBe("");
    }
  });
  it("treats de-AT like de", () => {
    expect(t("tab_flights", "de-AT")).toBe("Flüge");
  });
});
