import { Box, CircularProgress, Modal } from "@mui/material";

export default function LoadingModal() {
  return (
    <Modal
      open
      sx={{
        display: "flex",
        p: 1,
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        outline: "none",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </Modal>
  );
}
