using Microsoft.AspNetCore.Mvc;
using TalentFlow.API.Models;

namespace TalentFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    // In-memory store — we'll swap this for a real DB later
    private static readonly List<Job> _jobs = new()
    {
        new Job { Id = 1, Title = "FullStack Engineer", Description = "C# + React role", Location = "Abu Dhabi, UAE" },
        new Job { Id = 2, Title = "DevOps Engineer", Description = "K8s and CI/CD", Location = "Remote" }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Job>> GetAll() => Ok(_jobs);

    [HttpGet("{id}")]
    public ActionResult<Job> GetById(int id)
    {
        var job = _jobs.FirstOrDefault(j => j.Id == id);
        return job is null ? NotFound() : Ok(job);
    }

    [HttpPost]
    public ActionResult<Job> Create(Job job)
    {
        job.Id = _jobs.Count + 1;
        job.PostedAt = DateTime.UtcNow;
        _jobs.Add(job);
        return CreatedAtAction(nameof(GetById), new { id = job.Id }, job);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Job updated)
    {
        var job = _jobs.FirstOrDefault(j => j.Id == id);
        if (job is null) return NotFound();
        job.Title = updated.Title;
        job.Description = updated.Description;
        job.Location = updated.Location;
        job.Type = updated.Type;
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var job = _jobs.FirstOrDefault(j => j.Id == id);
        if (job is null) return NotFound();
        _jobs.Remove(job);
        return NoContent();
    }
}
