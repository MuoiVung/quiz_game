import { ReactComponent as HandsGraduate } from "../../assets/imgs/hands-graduate.svg";
import { ReactComponent as Brand } from "../../assets/imgs/quiz-grad.svg";

type IconSvgProps = {
  name: string;
  color?: string;
  width?: number;
  height?: number;
};

const IconSvg = ({ name, color, width, height }: IconSvgProps) => {
  const getIcon = (
    Icon: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & { title?: string }
    >
  ): JSX.Element => {
    if (width && height) {
      return <Icon fill={color} width={width} height={height} />;
    }
    return <Icon fill={color} />;
  };

  const icons: { [key: string]: JSX.Element } = {
    brand: getIcon(Brand),
    hands_graduate: getIcon(HandsGraduate),
  };

  return icons[name];
};

export default IconSvg;
