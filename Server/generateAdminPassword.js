const bcrypt = require('bcrypt');

(async () => {
  const plainPassword = 'Admin@123';  // Your admin password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  console.log('Hashed Password:', hashedPassword);

  // Optionally, if you need the hashed password for inserting into the DB manually:
  // Copy and paste the output of this hashed password to use in your SQL query
})();
