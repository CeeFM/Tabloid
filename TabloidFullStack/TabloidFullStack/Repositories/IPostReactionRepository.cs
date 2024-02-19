using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IPostReactionRepository
    {
        List<PostReaction> GetAll();
        List<PostReaction> GetByPostId(int postId);
        void Add(PostReaction postreaction);
        void Delete(int reactionId);
    }
}