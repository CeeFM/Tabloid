using Microsoft.Data.SqlClient;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;
using TabloidFullStack.Utils;

public class TagRepository : BaseRepository, ITagRepository
{
    public TagRepository(IConfiguration configuration) : base(configuration) { }
    //view
    public List<Tag> GetAll()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                        SELECT Id, Name
                        FROM Tag
                        ORDER BY Name";
                var reader = cmd.ExecuteReader();
                var tags = new List<Tag>();
                while (reader.Read())
                {
                    tags.Add(new Tag()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        Name = DbUtils.GetString(reader, "Name")
                    });
                }
                reader.Close();
                return tags;
            }
        }
    }
    //add
    public void Add(Tag tag)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO Tag (Name)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name)";
                DbUtils.AddParameter(cmd, "@Name", tag.Name);
                tag.Id = (int)cmd.ExecuteScalar();
            }
        }
    }
    //delete

    public List<Tag> GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "SELECT Id, Name FROM Tag " +
                                  "WHERE Id = @Id";
                DbUtils.AddParameter(cmd, "@Id", id);

                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new List<Tag>() {new Tag()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                        Name = reader.GetString(reader.GetOrdinal("Name")),
                    }};
                    }
                    else
                    {
                        return null;
                    }
                }
            }
        }
    }
    public void Delete(int tagId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "DELETE FROM Tag " +
                                  "WHERE Id = @TagId";
                DbUtils.AddParameter(cmd, "@TagId", tagId);
                cmd.ExecuteNonQuery();
            }
        }
    }
}
