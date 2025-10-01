using AddressApp.Api.Data;
using AddressApp.Api.Models;
using AddressApp.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AddressApp.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AddressesController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly AddressParsingService _parsingService;
    public AddressesController(ApplicationDbContext context, AddressParsingService parsingService)
    {
        _context = context;
        _parsingService = parsingService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Address>>> GetAddresses()
    {
        return await _context.Addresses.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Address>> PostAddress(Address address)
    {
        _context.Addresses.Add(address);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAddresses), new { id = address.Id }, address);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutAddress(int id, Address address)
    {
        if (id != address.Id) return BadRequest();
        _context.Entry(address).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAddress(int id)
    {
        var address = await _context.Addresses.FindAsync(id);
        if (address == null) return NotFound();
        _context.Addresses.Remove(address);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost("bulk-import")]
    public async Task<IActionResult> BulkImport([FromBody] List<string> rawAddresses)
    {
        if (rawAddresses == null || !rawAddresses.Any())
        {
            return BadRequest("Adres listesi boş olamaz.");
        }

        var successfullyParsed = new List<Address>();
        var failedToParse = new List<string>();

        foreach (var rawAddress in rawAddresses)
        {
            var parsedAddress = _parsingService.Parse(rawAddress);
            if (parsedAddress != null)
            {
                successfullyParsed.Add(parsedAddress);
            }
            else
            {
                failedToParse.Add(rawAddress);
            }
        }

        if (successfullyParsed.Any())
        {
            await _context.Addresses.AddRangeAsync(successfullyParsed);
            await _context.SaveChangesAsync();
        }

        if (failedToParse.Any())
        {
            return Ok(new
            {
                message = $"{successfullyParsed.Count} adet adres başarıyla eklendi.",
                failedEntries = failedToParse
            });
        }

        return Ok(new { message = "Tüm adresler başarıyla eklendi." });
    }
}
