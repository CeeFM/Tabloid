using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Models;
using TabloidFullStack.Repositories;
using TabloidFullStack.Utils;

namespace TabloidFullStack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.Add(category);
            return CreatedAtAction(
                "Get", new { id = category.Id }, category);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _categoryRepository.GetById(id);

                if (_categoryRepository == null)
                {
                    return NotFound($"Category with ID {id} not found");
                }

                _categoryRepository.Delete(id);

                //No Content
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(404, $"Server Error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCategory(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _categoryRepository.UpdateCategory(category);

            return NoContent();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetCategoryById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }
    }
}
