using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

/*        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllPublishedPosts());
        }*/

        [HttpGet("{postId}")]
        public IActionResult GetPostById(int postId)
        {
            return Ok(_commentRepository.GetAllCommentsByPostId(postId));
        }

        [HttpPost]
        public IActionResult Post(Comment? comment)
        {
            _commentRepository.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        /*        [HttpGet("{userId}")]
                public IActionResult GetPostsByUser(int userId)
                {

                    return Ok(_postRepository.GetAllPublishedPostsByUser(userId));
                }

                [HttpDelete("{id}")]
                public IActionResult Delete(int id)
                {
                    _postRepository.DeletePost(id);
                    return NoContent();
                }*/

        //private int GetCurrentUserProfileId()
        //{
        //    string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //    return int.Parse(id);
        //}

    }
}
