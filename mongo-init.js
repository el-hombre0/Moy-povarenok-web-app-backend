db.createUser({
  user: "user",
  pwd: "1q2w3e4r",
  roles: [{ role: "readWrite", db: "moy-povorenok" }],
});
