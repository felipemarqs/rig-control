import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface MenuCardProps {
  title: string;
  Icon: React.ElementType;
  description?: string;
  navigateTo: string;
}

export const MenuCard = ({
  Icon,
  navigateTo,
  title,
  description,
}: MenuCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="w-[350px] min-h-[224px]">
      <CardHeader className="flex flex-row gap-6  justify-start h-36 ">
        <div className="">
          <Icon size={30} />
        </div>
        <div className="flex flex-col gap-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="w-full"
          variant="secondary"
          onClick={() => navigate(`/${navigateTo}`)}
        >
          Abrir
        </Button>
      </CardFooter>
    </Card>
  );
};
