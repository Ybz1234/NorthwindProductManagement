using Microsoft.AspNetCore.Mvc;
using NorthwindProductManagement.Context;
using NorthwindProductManagement.Queries.Employees;

namespace NorthwindProductManagement.Controllers
{
    public partial class EmployeesController : BaseApiController
    {
        [HttpGet("sales-by-country")]
        public async Task<IActionResult> GetEmployeeSalesByCountry([FromQuery] DateTime beginningDate, [FromQuery] DateTime endingDate)
        {
            return Ok(await Mediator.Send(new EmployeeSalesByCountry.Query { BeginningDate = beginningDate, EndingDate = endingDate }));
        }
    }
}
