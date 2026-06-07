namespace TalentFlow.API.Models;

public class Job
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Type { get; set; } = "Full-time";
    public DateTime PostedAt { get; set; } = DateTime.UtcNow;
}
