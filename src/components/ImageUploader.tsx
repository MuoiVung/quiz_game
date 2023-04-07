import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";

function ImageUploader() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const { register, handleSubmit } = useForm();

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setSelectedImageUrl(URL.createObjectURL(event.target.files[0])); // create temporary URL for the selected file
    }
  };

  const onSubmit = (data: any) => {
    if (data.imageUrl) {
      // handle image upload from URL
      console.log("Uploading image from URL:", data.imageUrl);
      // code to upload image from URL
    } else if (data.imageFile) {
      // handle image upload from file
      console.log("Uploading image from file:", data.imageFile[0]);
      // code to upload image from file
    } else {
      console.log("Please select an image to upload");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Image URL"
        variant="outlined"
        {...register("imageUrl")}
        value={imageUrl}
        onChange={handleImageUrlChange}
      />
      <input
        type="file"
        id="image-file"
        {...register("imageFile")}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <label htmlFor="image-file">
        <Button
          variant="contained"
          component="span"
          sx={{ marginLeft: "10px" }}
        >
          Upload Image
        </Button>
      </label>
      {selectedImageUrl && (
        <img
          src={selectedImageUrl}
          alt="Selected file"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            marginTop: "10px",
          }}
        />
      )}
      <Button variant="contained" type="submit" sx={{ marginLeft: "10px" }}>
        Submit
      </Button>
    </form>
  );
}

export default ImageUploader;
