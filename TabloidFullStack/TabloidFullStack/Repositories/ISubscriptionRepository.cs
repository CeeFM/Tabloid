using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface ISubscriptionRepository
    {
        void Add(Subscription subscription);
        void Delete(int subscriberUserProfileId, int providerUserProfileId);
        List<Subscription> GetAll();
        List<Subscription> GetSubscriptionsByUserId(int id);
    }
}