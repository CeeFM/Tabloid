using Microsoft.Data.SqlClient;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }

        public List<Comment> GetAllCommentsByPostId(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime, p.Id as ArticleId, p.Title, p.Content, p.ImageLocation, p.CreateDateTime as PostCreateDate, p.IsApproved, p.CategoryId, p.UserProfileId as PostAuthorProfileId, up.Id AS UserId, up.DisplayName, up.FirstName, up.LastName, up.Email, up.CreateDateTime AS UserCreateDate, up.ImageLocation AS UserImage, up.UserTypeId
                       FROM Comment c
                       LEFT JOIN Post p ON p.Id = c.PostId
                       LEFT JOIN UserProfile up ON up.Id = c.UserProfileId
                       LEFT JOIN UserType ut ON up.UserTypeId = ut.Id
                       WHERE p.Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", postId);

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(NewCommentFromReader(reader));
                    }

                    reader.Close();

                    return comments;
                }
            }
        }

        private Comment NewCommentFromReader(SqlDataReader reader)
        {
            return new Comment()
            {
                /*                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                Content = reader.GetString(reader.GetOrdinal("Content")),
                                ImageLocation = DbUtils.GetString(reader, "HeaderImage"),
                                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                                PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                                Category = new Category()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                                },
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                UserProfile = new UserProfile()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                                    Email = reader.GetString(reader.GetOrdinal("Email")),
                                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                    ImageLocation = DbUtils.GetString(reader, "AvatarImage"),
                                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                    UserType = new UserType()
                                    {
                                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                                    }*/
            };
        }
    }


}   

