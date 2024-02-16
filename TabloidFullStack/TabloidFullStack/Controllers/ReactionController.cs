using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReactionController : ControllerBase
    {
        private readonly IReactionRepository _reactionRepository;
        public ReactionController(IReactionRepository reactionRepository)
        {
            _reactionRepository = reactionRepository;
        }
        // GET: api/<ReactionController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_reactionRepository.GetAll());
        }

        // GET api/<ReactionController>/5
        [HttpGet("{reactionId}")]
        public IActionResult GetReactionById(int reactionId)
        {
            return Ok(_reactionRepository.GetById(reactionId));
        }

        //// POST api/<ReactionController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<ReactionController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<ReactionController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
