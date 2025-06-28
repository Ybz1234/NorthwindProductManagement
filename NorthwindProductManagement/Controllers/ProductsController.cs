using Microsoft.AspNetCore.Mvc;
using NorthwindProductManagement.Context;
using NorthwindProductManagement.Queries.DTOs;
using NorthwindProductManagement.Queries.Products;

namespace NorthwindProductManagement.Controllers
{
    public class ProductsController : BaseApiController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            return Ok(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await Mediator.Send(new List.Query()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(CreateProductDto dto)
        {
            return Ok(await Mediator.Send(new Create.Command { Product = dto }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, UpdateProductDto dto)
        {
            return Ok(await Mediator.Send(new Edit.Command { Id = id, Product = dto }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}