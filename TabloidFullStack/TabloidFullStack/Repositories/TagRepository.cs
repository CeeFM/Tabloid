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

    public void UpdateTag(Tag tag)
    {
        using (SqlConnection conn = Connection)
        {
            conn.Open();
            using (SqlCommand cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
                 UPDATE Tag
                 SET [Name] = @name
                 WHERE id = @id";
                cmd.Parameters.AddWithValue("@name", tag.Name);
                cmd.Parameters.AddWithValue("@id", tag.Id);
                cmd.ExecuteNonQuery();
            }
        }
    }
    public Tag GetTagById(int id)
    {
        using (SqlConnection conn = Connection)
        {
            conn.Open();
            using (SqlCommand cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"
            SELECT Id, [Name] FROM Tag
            WHERE Id = @id
            ";
                cmd.Parameters.AddWithValue("@id", id);
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    Tag tag = new Tag()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
                        Name = reader.GetString(reader.GetOrdinal("Name")),
                    };
                    reader.Close();
                    return tag;
                }
                reader.Close();
                return null;
            }
        }
    }
}
