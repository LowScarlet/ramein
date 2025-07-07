import i18n from "i18next";
import Backend from "i18next-fs-backend";
import { LanguageDetector } from "i18next-http-middleware";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

i18n
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: "id_ID",
    backend: {
      loadPath: path.join(__dirname, "../../locales/{{lng}}/{{ns}}.json"),
    },
  });

export default i18n;
