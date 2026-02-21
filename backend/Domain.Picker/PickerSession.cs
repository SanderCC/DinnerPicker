using Domain.Core;
using Domain.Identity;

namespace Domain.Picker;

public sealed class PickerSession : Entity
{
    public required PickerSessionState State { get; set; } = PickerSessionState.Draft;

    public required DateTimeOffset Expiry { get; init; } = DateTimeOffset.UtcNow.AddDays(1);
    public required AppUser Creator { get; init; }

    public ICollection<PickerUserSession> Users { get; set; } = new List<PickerUserSession>();
}