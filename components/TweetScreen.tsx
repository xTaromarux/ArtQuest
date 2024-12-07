import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";
import Template3 from "@/components/templates/Template3";
import Template4 from "@/components/templates/Template4";
import TemplateEnd from "@/components/templates/TemplateEnd";
import {
    Text,
  } from "react-native";

  const templateMap: Record<number, React.FC<any>> = {
  1: Template1,
  2: Template2,
  3: Template3,
  4: Template4,
  5: TemplateEnd,
};

export const renderTemplate = (template: number, exerciseData: any) => {
  const TemplateComponent = templateMap[template];
  if (!TemplateComponent) return <Text>Template not found</Text>;
  return <TemplateComponent {...exerciseData} />;
};
