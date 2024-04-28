const sites = [
  {
    name: "vbet",
    money: 500,
  },
  {
    name: "SpreadEx",
    money: 1000,
  },
  {
    name: "888sport",
    money: 500,
  },
  {
    name: "Unibet",
    money: 2000,
  },
  {
    name: "Bet365",
    money: 1000,
  },
  {
    name: "Leo vegas",
    money: 1000,
  },
  {
    name: "ComeOn",
    money: 1000,
  },
  {
    name: "Bwin",
    money: 1000,
  },
  {
    name: "NordicBet",
    money: 500,
  },
  {
    name: "Betsson",
    money: 500,
  },
  {
    name: "Bet25",
    money: 500,
  },
  {
    name: "Tipwin",
    money: 1600,
  },
  {
    name: "Expekt",
    money: 1000,
  },
  {
    name: "CashPoint",
    money: 500,
  },
  {
    name: "campobet",
    money: 500,
  },
  {
    name: "betina",
    money: 500,
  },
];

export function findMoney(site) {
  var siteName = site.toLowerCase();

  const site1 = sites.find((site) => site.name.toLowerCase() === siteName);
  if (site1) return site1.money;
  return 1000;
}
