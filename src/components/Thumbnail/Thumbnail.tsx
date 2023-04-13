import { useState } from "react";
import {
  PreviewAvatar,
  PreviewModal,
  StyledAvatar,
  ThumbnailContainer,
} from "./styles";
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
      <ThumbnailContainer onClick={handleOpenPreview}>
        <StyledAvatar src={src} />
        {preview && (
          <PreviewModal open={preview} onClose={handleClosePreview}>
            <PreviewAvatar src={src} />
          </PreviewModal>
        )}
      </ThumbnailContainer>
    </>
  );
};

export default Thumbnail;
