const countryList = {
  AED: "AE",
  AFN: "AF",
  ALL: "AL",
  AMD: "AM",
  ANG: "NL",
  AOA: "AO",
  ARS: "AR",
  AUD: "AU",
  AWG: "AW",
  AZN: "AZ",

  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  BTN: "BT",
  BWP: "BW",
  BYN: "BY",
  BZD: "BZ",

  CAD: "CA",
  CDF: "CD",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CZK: "CZ",

  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",

  EGP: "EG",
  ERN: "ER",
  ETB: "ET",
  EUR: "FR",

  FJD: "FJ",
  FKP: "FK",

  GBP: "GB",
  GEL: "GE",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",

  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",

  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",

  JMD: "JM",
  JOD: "JO",
  JPY: "JP",

  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",

  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LYD: "LY",

  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRU: "MR",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",

  NAD: "NA",
  NGN: "NG",
  NIO: "NI",
  NOK: "NO",
  NPR: "NP",
  NZD: "NZ",

  OMR: "OM",

  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",

  QAR: "QA",

  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",

  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SHP: "SH",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  SSP: "SS",
  STN: "ST",
  SYP: "SY",
  SZL: "SZ",

  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",

  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",

  VES: "VE",
  VND: "VN",
  VUV: "VU",

  WST: "WS",

  XAF: "CM",
  XCD: "AG",
  XOF: "BJ",
  XPF: "PF",

  YER: "YE",

  ZAR: "ZA",
  ZMW: "ZM",
  ZWL: "ZW"
};

// 🌐 Base API
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".select-container select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;
    select.append(option);
  }

  if (select.name === "from") select.value = "USD";
  else select.value = "INR";

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// Update flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Button click
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  getExchangeRate();
});

// Currency conversion
const getExchangeRate = async () => {
  let amount = document.querySelector("input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal <= 0) {
    amtVal = 1;
    amount.value = "1";
  }

  const fromCurr = document.querySelector(".from select").value;
  const toCurr = document.querySelector(".to select").value;

  const URL = `${BASE_URL}/${fromCurr.toLowerCase()}.json`;
  const res = await fetch(URL);
  const data = await res.json();

  const rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
  const finalAmount = (amtVal * rate).toFixed(2);

  msg.innerText = `${amtVal} ${fromCurr} = ${finalAmount} ${toCurr}`;
};
