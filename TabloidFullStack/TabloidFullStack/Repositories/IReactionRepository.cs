using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IReactionRepository
    {
        List<Reaction> GetAll();
        Reaction GetById(int reactionId);
    }
}