using Microsoft.Data.SqlClient;
using TabloidFullStack.Models;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Repositories
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {

        public SubscriptionRepository(IConfiguration config) : base(config) { }

        public List<Subscription> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime, EndDateTime
                        FROM Subscription";
                    var reader = cmd.ExecuteReader();
                    var subscriptions = new List<Subscription>();
                    while (reader.Read())
                    {
                        subscriptions.Add(new Subscription()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SubscriberUserProfileId = DbUtils.GetInt(reader, "SubscriberUserProfileId"),
                            ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId"),
                            BeginDateTime = DbUtils.GetDateTime(reader, "BeginDateTime"),
                            EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime")
                        });
                    }
                    reader.Close();
                    return subscriptions;
                }
            }
        }
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

        public List<Subscription> GetSubscriptionsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, SubscriberUserProfileId, ProviderUserProfileId, BeginDateTime, EndDateTime 
                       FROM Subscription
                       WHERE SubscriberUserProfileId = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();


                    var subscriptions = new List<Subscription>();

                    while (reader.Read())
                    {
                        subscriptions.Add(NewSubFromReader(reader));
                    }

                    reader.Close();

                    return subscriptions;
                }
            }
        }

        private Subscription NewSubFromReader(SqlDataReader reader)
        {
            return new Subscription()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                SubscriberUserProfileId = DbUtils.GetInt(reader, "SubscriberUserProfileId"),
                ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId"),
                BeginDateTime = DbUtils.GetDateTime(reader, "BeginDateTime"),
                EndDateTime = DbUtils.GetNullableDateTime(reader, "EndDateTime")
            };
        }


    }
}
