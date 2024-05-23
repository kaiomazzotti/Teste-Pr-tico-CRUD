using EstabelecimentosAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class EstabelecimentosController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EstabelecimentosController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Estabelecimento>>> GetEstabelecimentos()
    {
        return await _context.Estabelecimentos.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Estabelecimento>> GetEstabelecimento(int id)
    {
        var estabelecimento = await _context.Estabelecimentos.FindAsync(id);

        if (estabelecimento == null)
        {
            return NotFound();
        }

        return estabelecimento;
    }

    [HttpPost]
    public async Task<ActionResult<Estabelecimento>> PostEstabelecimento(Estabelecimento estabelecimento)
    {
        _context.Estabelecimentos.Add(estabelecimento);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEstabelecimento), new { id = estabelecimento.Id }, estabelecimento);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutEstabelecimento(int id, Estabelecimento estabelecimento)
    {
        if (id != estabelecimento.Id)
        {
            return BadRequest();
        }

        _context.Entry(estabelecimento).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Estabelecimentos.Any(e => e.Id == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEstabelecimento(int id)
    {
        var estabelecimento = await _context.Estabelecimentos.FindAsync(id);
        if (estabelecimento == null)
        {
            return NotFound();
        }

        _context.Estabelecimentos.Remove(estabelecimento);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

