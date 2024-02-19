using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ISubscriptionRepository
    {
        void Add(Subscription subscription);
        List<Subscription> GetAll();
        List<Subscription> GetSubscriptionsByUserId(int id);
    }
}