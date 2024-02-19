using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostReactionController : ControllerBase
    {
        private readonly IPostReactionRepository _postReactionRepository;
        public PostReactionController(IPostReactionRepository postReactionRepository)
        {
            _postReactionRepository = postReactionRepository;
        }
        // GET: api/<ReactionController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postReactionRepository.GetAll());
        }

        // GET api/<ReactionController>/5
        [HttpGet("{PostId}")]
        public IActionResult GetByPostId(int PostId)
        {
            return Ok(_postReactionRepository.GetByPostId(PostId));
        }

        [HttpPost]
        public IActionResult Post(PostReaction? postReaction)
        {
            _postReactionRepository.Add(postReaction);
            return NoContent();
        }

        //// GET: api/<PostReactionController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/<PostReactionController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<PostReactionController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<PostReactionController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<PostReactionController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
