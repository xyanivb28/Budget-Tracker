export const Currencies = [
  { value: "USD", label: "$ Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "GBP", label: "£ British Pound", locale: "en-GB" },
  { value: "ILS", label: "₪ Israeli Shekel", locale: "he-IL" },
  { value: "JPY", label: "¥ Japanese Yen", locale: "ja-JP" },
  { value: "CAD", label: "$ Canadian Dollar", locale: "en-CA" },
  { value: "AUD", label: "$ Australian Dollar", locale: "en-AU" },
  { value: "CHF", label: "CHF Swiss Franc", locale: "de-CH" },
  { value: "CNY", label: "¥ Chinese Yuan", locale: "zh-CN" },
  { value: "INR", label: "₹ Indian Rupee", locale: "hi-IN" },
  { value: "BRL", label: "R$ Brazilian Real", locale: "pt-BR" },
  { value: "SEK", label: "kr Swedish Krona", locale: "sv-SE" },
  { value: "NOK", label: "kr Norwegian Krone", locale: "nb-NO" },
  { value: "MXN", label: "$ Mexican Peso", locale: "es-MX" },
  { value: "ZAR", label: "R South African Rand", locale: "en-ZA" },
];

export type Currency = (typeof Currencies)[0];
