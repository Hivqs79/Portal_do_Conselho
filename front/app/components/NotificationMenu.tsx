import Popover from "@mui/material/Popover";

interface NotificationMenuProps {
    open: boolean,
    close: () => void,
    anchorEl: null | HTMLElement,
}
export default function NotificationMenu({
    open,
    close,
    anchorEl
}: NotificationMenuProps) {
  return (
    <Popover
      id="notification-popover"
      anchorEl={anchorEl}
      open={open}
      onClose={() => close()}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      The content of the Popover.
    </Popover>
  );
}
