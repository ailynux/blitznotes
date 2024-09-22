//NotesController.cs

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public NotesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Note>>> GetNotes()
    {
        // Return the list of notes
        return await _context.Notes.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Note>> CreateNote(Note note)
    {
        // Save note to the database
        _context.Notes.Add(note);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Note>> GetNote(int id)
    {
        // Get note by id
        var note = await _context.Notes.FindAsync(id);
        if (note == null) return NotFound();
        return note;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNote(int id, Note updatedNote)
    {
        if (id != updatedNote.Id)
        {
            return BadRequest();
        }

        _context.Entry(updatedNote).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(int id)
    {
        var note = await _context.Notes.FindAsync(id);
        if (note == null) return NotFound();

        _context.Notes.Remove(note);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
