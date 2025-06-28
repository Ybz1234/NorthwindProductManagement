using AutoMapper;
using FluentValidation;
using MediatR;
using NorthwindProductManagement.Context;
using NorthwindProductManagement.DomainEntities;
using NorthwindProductManagement.Queries.DTOs;

namespace NorthwindProductManagement.Queries.Products
{
    public class Create
    {
        public class Command : IRequest
        {
            public CreateProductDto Product { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly ILogger<Handler> _logger;
            private readonly IValidator<CreateProductDto> _validator;

            public Handler(DataContext context, IMapper mapper, ILogger<Handler> logger, IValidator<CreateProductDto> validator)
            {
                _context = context;
                _mapper = mapper;
                _logger = logger;
                _validator = validator;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _logger.LogInformation("Validating product creation request: {Name}", request.Product.ProductName);

                var validationResult = await _validator.ValidateAsync(request.Product, cancellationToken);

                if (!validationResult.IsValid)
                {
                    _logger.LogWarning("Validation failed for product: {Name}", request.Product.ProductName);
                    throw new ValidationException(validationResult.Errors);
                }

                _logger.LogInformation("Creating new product: {Name}", request.Product.ProductName);

                var product = _mapper.Map<Product>(request.Product);

                _context.Products.Add(product);
                var result = await _context.SaveChangesAsync(cancellationToken);

                if (result <= 0)
                {
                    _logger.LogWarning("Product creation failed for: {Name}", request.Product.ProductName);
                    throw new Exception("Problem saving new product");
                }

                _logger.LogInformation("Product {Name} created successfully", request.Product.ProductName);
                return Unit.Value;
            }
        }
    }
}