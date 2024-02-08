using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetAllCommentsByPostId(int postId);
    }
}