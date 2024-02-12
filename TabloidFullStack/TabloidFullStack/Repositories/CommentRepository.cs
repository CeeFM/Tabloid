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
                       SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime, p.Id as ArticleId, p.Title, p.Content AS PostContent, p.ImageLocation, p.CreateDateTime as PostCreateDate, p.IsApproved, p.PublishDateTime, p.CategoryId, p.UserProfileId as PostAuthorProfileId, up.Id AS UserId, up.DisplayName, up.FirstName, up.LastName, up.Email, up.CreateDateTime AS UserCreateDate, up.ImageLocation AS UserImage, up.UserTypeId, ca.[Name] AS CategoryName, ut.[Name] AS UserTypeName
                       FROM Comment c
                       LEFT JOIN Post p ON p.Id = c.PostId
                       LEFT JOIN UserProfile up ON up.Id = c.UserProfileId
                       LEFT JOIN UserType ut ON up.UserTypeId = ut.Id
                       LEFT JOIN Category ca ON p.CategoryId = ca.Id
                       WHERE p.Id = @Id
                       ORDER BY c.CreateDateTime DESC";

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

        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment (
                            Subject, Content, UserProfileId, CreateDateTime, PostId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Subject, @Content, @UserProfileId, @CreateDateTime, @PostId )";
                    cmd.Parameters.AddWithValue("@Subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", comment.CreateDateTime);
                    cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@PostId", comment.PostId);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        private Comment NewCommentFromReader(SqlDataReader reader)
        {
            return new Comment()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Subject = reader.GetString(reader.GetOrdinal("Subject")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                Post = new Post()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("ArticleId")),
                    Title = reader.GetString(reader.GetOrdinal("Title")),
                    Content = reader.GetString(reader.GetOrdinal("PostContent")),
                    ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("PostCreateDate")),
                    PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                    CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                    Category = new Category()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                        Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                    }
                },
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("UserCreateDate")),
                    ImageLocation = DbUtils.GetString(reader, "UserImage"),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                }
            };
        }

    }
}
