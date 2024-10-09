using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthenticationController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

   [HttpPost("register")]
    public async Task<ActionResult<User>> Register(User user)
    {
        try
        {
            // Validate the input
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Username and Password are required.");
            }

            // Hash the password before saving
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // Save user to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok("User registered successfully");
        }
        catch (Exception ex)
        {
            // Log the error
            Console.WriteLine(ex.Message);
            return StatusCode(500, "An error occurred while registering the user.");
        }
    }



    [HttpPost("login")]
public ActionResult Login(User loginDetails)
{
    var user = _context.Users.SingleOrDefault(u => u.Username == loginDetails.Username);
    if (user == null || !BCrypt.Net.BCrypt.Verify(loginDetails.Password, user.Password))
    {
        return Unauthorized("Invalid credentials");
    }

    // Generate JWT token
    var token = GenerateJwtToken(user);
    return Ok(new { token });
}

    private string GenerateJwtToken(User user)
    {
        // Null check for Jwt:Key, Jwt:Issuer, and Jwt:Audience
        var jwtKey = _configuration["Jwt:Key"]
                     ?? throw new InvalidOperationException("JWT Key not configured in appsettings.");
        var jwtIssuer = _configuration["Jwt:Issuer"]
                        ?? throw new InvalidOperationException("JWT Issuer not configured in appsettings.");
        var jwtAudience = _configuration["Jwt:Audience"]
                          ?? throw new InvalidOperationException("JWT Audience not configured in appsettings.");

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            expires: DateTime.Now.AddMinutes(120),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
