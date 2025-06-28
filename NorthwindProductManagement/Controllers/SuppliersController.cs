using Microsoft.AspNetCore.Mvc;
using NorthwindProductManagement.Context;
using NorthwindProductManagement.Queries.Suppliers;

namespace NorthwindProductManagement.Controllers
{
    public class SuppliersController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await Mediator.Send(new List.Query()));
        }
    }
}