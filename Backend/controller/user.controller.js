import db from "../utils/db.con.js";
export const GetUserData = (req, res) => {
  db.query("SELECT * FROM UserInfo", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
};

export const AddUser = (req, res) => {
  const { username, email, password } = req.body;
  db.query(
    "insert into UserInfo (username,email,password) values(?,?,?)",
    [username, email, password],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res
        .status(201)
        .json({ message: "User added successfully", id: results.insertId });
    }
  );
};

export const UpdateUser = (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  db.query(
    `
    UPDATE UserInfo
    SET 
      username = COALESCE(?, username),
      email = COALESCE(?, email),
      password = COALESCE(?, password)
    WHERE userid = ?
`,
    [username, email, password, id],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully" });
    }
  );
};

export const DeleteUser = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM UserInfo WHERE userid = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
};