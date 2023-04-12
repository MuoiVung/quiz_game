import IconSvg from "../IconSvg/IconSvg";
import { BrandContainer } from "./styles";

const Brand = () => {
  return (
    <BrandContainer item display={{ xs: "none", md: "flex" }} md={6}>
      <IconSvg name="hands_graduate" />
    </BrandContainer>
  );
};

export default Brand;
