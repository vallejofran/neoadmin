import { getIndexInArray } from "./arrays";
import { removeIfNotVisible } from "./common";

describe("reagarding the utils", () => {
  describe("regarding the getIndexInArray function", () => {
    it("should return the correct index", () => {
      const currentSection = { fields: [{ property: "c" }, { property: "d" }] };

      const sections = [
        { fields: [{ property: "a" }, { property: "b" }] },
        { fields: [{ property: "aa" }, { property: "bb" }] },
        { fields: [{ property: "aaa" }, { property: "bbb" }] },
        { fields: [{ property: "c" }, { property: "d" }] },
      ];

      expect(getIndexInArray(sections, currentSection)).toEqual(3);
    });
  });

  describe("regarding the removeIfNotVisible function", () => {
    it("should return true by default", () => {
      expect(removeIfNotVisible()()).toEqual(true);
    });

    describe("given a show: false value", () => {
      it("should return false", () => {
        expect(
          removeIfNotVisible()({
            upsertOptions: { show: false },
          })
        ).toEqual(false);
      });
    });

    describe("given an empty object as upsertOptions", () => {
      it("should return true", () => {
        expect(
          removeIfNotVisible()({
            upsertOptions: {},
          })
        ).toEqual(true);
      });
    });

    describe("given a show: false value through the result of a function", () => {
      it("should receive the current item and return false", () => {
        const item = { id: 1 };
        expect(
          removeIfNotVisible(item)({
            upsertOptions: {
              show: (receivedItem) => {
                expect(receivedItem).toEqual(item);
                return false;
              },
            },
          })
        ).toEqual(false);
      });
    });
  });
});
