import { useState, useEffect } from "react";
import Loading from "./Loading";
import ErrorView from "./ErrorView";

interface AsyncActionProps {
  action: Function;
  // action: Promise<any>;
  children: Function;
  onLoading?: Function;
  onError?: Function;
}

const AsyncAction = ({action,children,onLoading,onError}: AsyncActionProps) => {
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setStatus("loading");
    setError(null);

    action()
      .then((responseData: any) => {
        setData(responseData);
        setStatus("done");
      })
      .catch((err: any) => {
        setStatus("error");
        setError(err);
      });
  }, []); 

  if (status === "loading") return onLoading ? onLoading() : <Loading />;
  if (status === "error")
    return onError ? onError(error) : <ErrorView error={error} />;
  if (status === "done") return children(data);

  return "unexpected";
};

export default AsyncAction;
