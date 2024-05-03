const GET_ALL = `SELECT id, name, color, created_at FROM groups WHERE owner_user_id = $1`;
const GET_BY_ID = `${GET_ALL} AND id = $2`;
const CREATE = `INSERT INTO groups (owner_user_id, name, color, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, name, color`;
const COUNT_BY_NAME = `SELECT COUNT(*) as count FROM groups WHERE name = $1`;
const DELETE_BY_ID = `DELETE FROM groups WHERE owner_user_id = $1 AND id = $2`;
const COUNT_BY_NAME_NOT_ID = `
    SELECT COUNT(*) FROM groups WHERE name = $1 AND id <> $2
`;
const FULL_UPDATE_BY_ID = `
    UPDATE groups
    SET name = $1, color = $2
    WHERE owner_user_id = $3 AND id = $4
`;

const Repository = (userId, dbClient) => {
  if (!dbClient) {
    throw new Error('Required dbClient');
  }
  const getGroups = async () => {
    const { rows } = await dbClient.query(GET_ALL, [userId]);
    return rows;
  };

  const getGroupById = async (id) => {
    const { rows } = await dbClient.query(GET_BY_ID, [userId, id]);
    return rows[0];
  };

  const createGroup = async ({ name, color }) => {
    const { rows } = await dbClient.query(CREATE, [userId, name, color]);
    return rows[0];
  };

  const countByName = async (name) => {
    const result = await dbClient.query(COUNT_BY_NAME, [name]);
    const count = parseInt(result.rows[0].count);
    if (isNaN(count)) {
      throw 'Invalid countByName result, is NaN!';
    }
    return count;
  };

  const deleteGroup = async (id) => {
    const { rowCount } = await dbClient.query(DELETE_BY_ID, [userId, id]);
    return rowCount > 0;
  };

  const updateById = async ({ id, name, color }) => {
    const result = await dbClient.query(FULL_UPDATE_BY_ID, [name, color, userId, id]);
    return result.rowCount > 0;
  };

  const countByNameNotId = async (name, id) => {
    const result = await dbClient.query(COUNT_BY_NAME_NOT_ID, [name, id]);
    const count = parseInt(result.rows[0].count);
    if (isNaN(count)) {
      throw 'Invalid countByName result, is NaN!';
    }
    return count;
  };

  return {
    getGroups,
    getGroupById,
    createGroup,
    countByName,
    deleteGroup,
    updateById,
    countByNameNotId
  };
};
export default Repository;
