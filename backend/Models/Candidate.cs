namespace TalentFlow.API.Models;

public class Candidate
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int JobId { get; set; }
    public string ResumeUrl { get; set; } = string.Empty;
    public string Status { get; set; } = "Applied";
    public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
}
