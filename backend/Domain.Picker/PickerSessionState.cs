namespace Domain.Picker;

public enum PickerSessionState
{
    Draft = 0,
    Active = 1,
    Expired = 2,
    Cancelled = -1,
}