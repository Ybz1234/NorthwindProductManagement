using AutoMapper;
using FluentValidation;
using MediatR;
using NorthwindProductManagement.Context;
using NorthwindProductManagement.DomainEntities;
using NorthwindProductManagement.Queries.DTOs;

namespace NorthwindProductManagement.Queries.Products
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public UpdateProductDto Product { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly ILogger<Handler> _logger;
            private readonly IValidator<UpdateProductDto> _validator;

            public Handler(DataContext context, IMapper mapper, ILogger<Handler> logger, IValidator<UpdateProductDto> validator)
            {
                _context = context;
                _mapper = mapper;
                _logger = logger;
                _validator = validator;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                LogStart(request.Product);
                await Validate(request.Product, cancellationToken);

                var product = await GetProduct(request.Id, cancellationToken);
                UpdateEntity(request.Product, product);
                await Save(product, cancellationToken);

                LogSuccess(product.ProductName);
                return Unit.Value;
            }

            private void LogStart(UpdateProductDto dto)
            {
                _logger.LogInformation("Validating product update request: {Name}", dto.ProductName);
            }

            private async Task Validate(UpdateProductDto dto, CancellationToken cancellationToken)
            {
                var validationResult = await _validator.ValidateAsync(dto, cancellationToken);
                if (!validationResult.IsValid)
                {
                    _logger.LogWarning("Validation failed for product: {Name}", dto.ProductName);
                    throw new ValidationException(validationResult.Errors);
                }
            }

            private async Task<Product> GetProduct(int id, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(new object[] { id }, cancellationToken);
                if (product == null)
                {
                    _logger.LogWarning("Product with ID {Id} not found", id);
                    throw new Exception("Product not found");
                }
                return product;
            }

            private void UpdateEntity(UpdateProductDto dto, Product product)
            {
                _logger.LogInformation("Updating product: {Name}", dto.ProductName);
                _mapper.Map(dto, product);
            }

            private async Task Save(Product product, CancellationToken cancellationToken)
            {
                var result = await _context.SaveChangesAsync(cancellationToken);
                if (result <= 0)
                {
                    _logger.LogWarning("Product update failed for: {Name}", product.ProductName);
                    throw new Exception("Problem updating product");
                }
            }

            private void LogSuccess(string productName)
            {
                _logger.LogInformation("Product {Name} updated successfully", productName);
            }
        }
    }
}