using System.ComponentModel.DataAnnotations;

namespace TabloidFullStack.Models
{
    public class Subscription
    {
        public int Id { get; set; }
        public int SubscriberUserProfileId { get; set; }
        public int ProviderUserProfileId { get; set; }

        [DisplayFormat(DataFormatString = "{0:MMM dd, yyyy}")]
        public DateTime BeginDateTime { get; set; }

        [DisplayFormat(DataFormatString = "{0:MMM dd, yyyy}")]
        public DateTime? EndDateTime { get; set; }

    }
}
