import { useLanguage } from "@/hooks/use-language";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          language === "en"
            ? "bg-black text-white"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("fr")}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          language === "fr"
            ? "bg-black text-white"
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        FR
      </button>
    </div>
  );
}
