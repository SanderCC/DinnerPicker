using Domain.Core;
using Domain.Identity;

namespace Domain.Picker;

public sealed class PickerSession : Entity
{
    public required PickerSessionState State { get; set; } = PickerSessionState.Draft;

    public required DateTimeOffset Expiry { get; set; } = DateTimeOffset.UtcNow.AddDays(1);
    public required AppUser Creator { get; set; }
}