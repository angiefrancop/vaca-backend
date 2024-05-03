import bcrypt from 'bcrypt';

const GET_ALL = `SELECT id, name, email, created_at , password FROM users`;
const GET_BY_ID = `${GET_ALL} WHERE id = $1`;
const GET_BY_EMAIL = `${GET_ALL} WHERE email = $1`;
const CREATE = `INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, name, email, created_at`;
const DELETE_BY_ID = `DELETE FROM users WHERE id = $1`;
const FULL_UPDATE_BY_ID = `
    UPDATE users
    SET name = $1, email = $2, password = $3
    WHERE id = $4
`;

const Repository = (dbClient) => {
  if (!dbClient) {
    throw new Error('Required dbClient');
  }
  const getUsers = async () => {
    const { rows } = await dbClient.query(GET_ALL);
    return rows;
  };

  const getUserById = async (id) => {
    const { rows } = await dbClient.query(GET_BY_ID, [id]);
    return rows[0];
  };

  const getUserByEmail = async (email) => {
    const { rows } = await dbClient.query(GET_BY_EMAIL, [email]);
    return rows[0];
  };

  const createUser = async ({ name, email, password }) => {
    const userPassword = await bcrypt.hash(password, 10);
    const { rows } = await dbClient.query(CREATE, [name, email, userPassword]);
    return rows[0];
  };

  const deleteUser = async (id) => {
    const { rowCount } = await dbClient.query(DELETE_BY_ID, [id]);
    return rowCount > 0;
  };

  const updateById = async ({ id, name, email, password }) => {
    const result = await dbClient.query(FULL_UPDATE_BY_ID, [name, email, password, id]);
    return result.rowCount > 0;
  };

  return {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    deleteUser,
    updateById
  };
};
export default Repository;
