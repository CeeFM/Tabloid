using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        void DeletePost(int postId);
        List<Post> GetAllPublishedPosts();
        List<Post> GetAllPublishedPostsByUser(int id);
    }
}