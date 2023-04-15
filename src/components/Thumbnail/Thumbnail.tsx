import { Box, Button } from "@mui/material";
import { useState } from "react";
import { PreviewAvatar, PreviewModal, StyledAvatar } from "./styles";
import { ThumbnailProps } from "./types";

const Thumbnail = ({ src }: ThumbnailProps) => {
  const [preview, setPreview] = useState(false);

  const handleOpenPreview = () => {
    setPreview(true);
  };

  const handleClosePreview = () => {
    setPreview(false);
  };

  return (
    <>
      <Button onClick={handleOpenPreview}>
        <StyledAvatar src={src} />
      </Button>
      {preview && (
        <PreviewModal open={preview} onClose={handleClosePreview}>
          <Box>
            <PreviewAvatar src={src} />
          </Box>
        </PreviewModal>
      )}
    </>
  );
};

export default Thumbnail;
