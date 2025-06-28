using Microsoft.AspNetCore.Mvc;
using NorthwindProductManagement.Context;
using NorthwindProductManagement.Queries.Categories;

namespace NorthwindProductManagement.Controllers
{
    public class CategoriesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await Mediator.Send(new List.Query()));
        }
    }
}