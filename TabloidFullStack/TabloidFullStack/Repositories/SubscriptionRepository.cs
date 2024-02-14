using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {

        public SubscriptionRepository(IConfiguration config) : base(config) { }

        public void Add(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Subscription (
                            SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime, EndDateTime)
                        OUTPUT INSERTED.ID
                        VALUES(
                            @SubscriberUserProfileId, @ProviderUserProfileId, @BeginDateTime, @EndDateTime )";
                    cmd.Parameters.AddWithValue("@SubscriberUserProfileId", subscription.SubscriberUserProfileId);
                    cmd.Parameters.AddWithValue("@ProviderUserProfileId", subscription.ProviderUserProfileId);
                    cmd.Parameters.AddWithValue("@BeginDateTime", subscription.BeginDateTime);
                    cmd.Parameters.AddWithValue("@EndDateTime", DbUtils.ValueOrDBNull(subscription.EndDateTime));

                    subscription.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

    }
}
