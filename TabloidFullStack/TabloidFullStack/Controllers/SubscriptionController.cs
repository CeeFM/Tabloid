using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {

        private readonly IPostRepository _postRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;
        public SubscriptionController(IPostRepository postRepository, ISubscriptionRepository subscriptionRepository)
        {
            _postRepository = postRepository;
            _subscriptionRepository = subscriptionRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_subscriptionRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Subscription? subscription)
        {
            _subscriptionRepository.Add(subscription);
            return NoContent();
        }


        [HttpGet("{userId}")]
        public IActionResult GetSubscriptionsByUserId(int userId)
        {

            return Ok(_subscriptionRepository.GetSubscriptionsByUserId(userId));
        }


        [HttpDelete("{subscriberUserProfileId}/{providerUserProfileId}")]
        public IActionResult Delete(int subscriberUserProfileId, int providerUserProfileId)
        {
            _subscriptionRepository.Delete(subscriberUserProfileId, providerUserProfileId);
            return NoContent();
        }

    }
}
