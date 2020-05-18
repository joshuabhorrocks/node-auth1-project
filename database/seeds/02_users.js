exports.seed = function (knex) {
  const users = [
    {
      username: "JeanLucPicard",
      password: "TeaEarlGreyHot",
      role: 1,
    },
    {
      username: "WilliamRiker",
      password: "DeannaIsHot",
      role: 1,
    },
    {
      username: "GeordiLaForge",
      password: "ReadinRainbow",
      role: 2,
    },
    {
      username: "Data",
      password: "Pinocchio",
      role: 2,
    },
    {
      username: "BeverlyCrusher",
      password: "JeanAndBev",
      role: 2,
    },
  ];

  return knex("users").insert(users);
};

