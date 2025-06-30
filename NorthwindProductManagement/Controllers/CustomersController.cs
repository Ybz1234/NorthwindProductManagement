using Microsoft.AspNetCore.Mvc;
using NorthwindProductManagement.Context;
using NorthwindProductManagement.Queries.Customers;

namespace NorthwindProductManagement.Controllers
{
    public class CustomersController : BaseApiController
    {

        [HttpGet("orders-count")]
        public async Task<IActionResult> GetCustomerOrderCounts()
        {
            return Ok(await Mediator.Send(new OrdersCount.Query()));
        }

        [HttpGet("orders-history")]
        public async Task<IActionResult> GetCustomerOrderHistory([FromQuery] string customerId)
        {
            return Ok(await Mediator.Send(new CustomerOrderHistory.Query { CustomerId = customerId }));
        }
    }
}