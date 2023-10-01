import enTranslation from "./locales/en.json";
import svTranslation from "./locales/sv.json";
import lvTranslation from "./locales/lv.json";
import { z } from "zod";

const translation = {
  en: enTranslation,
  sv: svTranslation,
  lv: lvTranslation,
};

type LocalizationValue = Record<string, string | object>;

const inferSchema = (object: LocalizationValue): z.AnyZodObject => {
  let schema = z.object({});
  for (const key in object) {
    const valueType = typeof object[key];
    if (valueType === "string") {
      schema = schema.extend({ [key]: z.string() });
    } else if (valueType === "object") {
      schema = schema.extend({
        [key]: inferSchema(object[key] as LocalizationValue),
      });
    } else {
      throw new Error(
        `Localization values must be of type string or object. Got ${valueType}`
      );
    }
  }

  return schema;
};

const masterSchema = inferSchema(translation.en);

[translation.sv, translation.lv].forEach((document) => {
  const result = masterSchema.parse(document);
});
