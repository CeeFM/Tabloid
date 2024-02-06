using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllPublishedPosts());
        }

        [HttpGet("post/{postId}")]
        public IActionResult GetPostById(int postId)
        {
            var post = _postRepository.GetPublishedPostById(postId);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("{userId}")]
        public IActionResult GetPostsByUser(int userId)
        {

            return Ok(_postRepository.GetAllPublishedPostsByUser(userId));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.DeletePost(id);
            return NoContent();
        }

        //private int GetCurrentUserProfileId()
        //{
        //    string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //    return int.Parse(id);
        //}

    }
}

