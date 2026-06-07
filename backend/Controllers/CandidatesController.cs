using Microsoft.AspNetCore.Mvc;
using TalentFlow.API.Models;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CandidatesController : ControllerBase
{
    private static readonly List<Candidate> _candidates = new();

    [HttpGet]
    public ActionResult<IEnumerable<Candidate>> GetAll() => Ok(_candidates);

    [HttpGet("{id}")]
    public ActionResult<Candidate> GetById(int id)
    {
        var candidate = _candidates.FirstOrDefault(c => c.Id == id);
        return candidate is null ? NotFound() : Ok(candidate);
    }

    [HttpGet("job/{jobId}")]
    public ActionResult<IEnumerable<Candidate>> GetByJob(int jobId) =>
        Ok(_candidates.Where(c => c.JobId == jobId));

    [HttpPost]
    public ActionResult<Candidate> Apply(Candidate candidate)
    {
        candidate.Id = _candidates.Count + 1;
        candidate.AppliedAt = DateTime.UtcNow;
        candidate.Status = "Applied";
        _candidates.Add(candidate);
        return CreatedAtAction(nameof(GetById), new { id = candidate.Id }, candidate);
    }

    [HttpPatch("{id}/status")]
    public IActionResult UpdateStatus(int id, [FromBody] string status)
    {
        var candidate = _candidates.FirstOrDefault(c => c.Id == id);
        if (candidate is null) return NotFound();
        candidate.Status = status;
        return NoContent();
    }
}
