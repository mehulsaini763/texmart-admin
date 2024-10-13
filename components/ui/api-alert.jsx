import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

const textMap = {
  public: "Public",
  admin: "Admin",
};

const variantMap = {
  public: "primary",
  admin: "destructive",
};

const ApiAlert = ({ title, description, variant = "public" }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Api Route copied to the clipboard");
  };

  return (
    <Alert className='space-y-4'>
      <AlertTitle className="flex items-center gap-4">
      <Server className="h-4 w-4" />
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className='flex items-center justify-between gap-4'>
        <code className="relative rounded bg-muted font-mono text-sm font-semibold px-2">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
