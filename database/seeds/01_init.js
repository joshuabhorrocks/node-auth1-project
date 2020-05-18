exports.seed = function (knex) {
  // no need to add delete function, knex-cleaner in cleanup.js handles that
  const roles = [
    {
      name: "admin", // will get id 1
    },
    {
      name: "user", // will get id 2
    },
  ];

  return knex("roles").insert(roles);
};
