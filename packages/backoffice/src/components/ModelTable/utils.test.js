import { getFields, getItemIdentifier, getFilterFields } from "./utils";

const header = {
  options: {
    primaryKey: "concept",
  },
  sections: [
    {
      fields: [{ name: "Concepto", property: "concept" }],
    },
    {
      fields: [{ name: "Horas", property: "hours" }],
    },
  ],
};

describe("regarding the getFields function", () => {
  it("should be able to get all the fields of all the sections of the header", () => {
    expect(getFields({ header, t: (text) => text })).toEqual([
      {
        field: "concept",
        flex: 1,
        headerName: "pages.undefined.model.concept",
        name: "pages.undefined.model.concept",
        property: "concept",
      },
      {
        field: "hours",
        flex: 1,
        headerName: "pages.undefined.model.hours",
        name: "pages.undefined.model.hours",
        property: "hours",
      },
    ]);
  });
});

describe("regarding the getItemIdentifier function", () => {
  it("should return id field if it exists", () => {
    expect(getItemIdentifier({ id: 1 })).toEqual(1);
  });

  it("should be able to get identifier for item based on header config", () => {
    expect(getItemIdentifier({ concept: "sample" }, header)).toEqual("sample");
  });

  it("cannot get identifier if header config not permit and item not hace id property", () => {
    expect(getItemIdentifier({ hours: "sample" }, header)).toBeUndefined();
  });
});

describe("regarding the getFilterFields function", () => {
  describe("given a header with the fields' sections without filters", () => {
    it("should return an empty array", () => {
      const emptyHeader = {
        sections: [
          {
            title: "Principal",
            fields: [
              {
                property: "customerId",
              },
              {
                property: "name",
              },
              {
                property: "city",
                tableOptions: {},
              },
              {
                property: "postalCode",
              },
              {
                property: "phone",
                tableOptions: {},
              },
            ],
          },
        ],
      };
      expect(getFilterFields(emptyHeader)).toEqual([]);
    });
  });

  describe("given a header with the fields sections with filters", () => {
    it("should return an array with the fields that contain filters", () => {
      const filtersHeader = {
        sections: [
          {
            title: "Principal",
            fields: [
              {
                property: "customerId",
                relation: true,
              },
              {
                property: "name",
                relation: true,
              },
              {
                property: "city",
                tableOptions: {
                  filter: true,
                },
              },
              {
                property: "postalCode",
              },
              {
                property: "phone",
                tableOptions: {
                  isSearchable: true,
                },
              },
            ],
          },
        ],
      };
      expect(getFilterFields(filtersHeader)).toStrictEqual([
        { property: "customerId", relation: true },
        { property: "name", relation: true },
        { property: "city", tableOptions: { filter: true } },
        { property: "phone", tableOptions: { isSearchable: true } },
      ]);
    });
  });
});
