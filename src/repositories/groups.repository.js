const GET_ALL = `SELECT id, name, color, created_at FROM groups`;
const GET_BY_ID = `${GET_ALL} WHERE id = $1`;
const CREATE = `INSERT INTO groups (name, color, created_at) VALUES ($1, $2, NOW()) RETURNING id, name, color`;
const Repository = (dbClient) => {
  const getGroups = async () => {
    const { rows } = await dbClient.query(GET_ALL);
    return rows;
  };

  const getGroupById = async (id) => {
    const { rows } = await dbClient.query(GET_BY_ID, [id]);
    return rows[0];
  };

  const createGroup = async (group) => {
    const { rows } = await dbClient.query(CREATE, [group.name, group.color]);
    return rows[0];
  };

  return {
    getGroups,
    getGroupById,
    createGroup
  };
};
export default Repository;
