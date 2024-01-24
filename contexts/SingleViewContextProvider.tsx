import { View, Text } from "react-native";
import React, {
  ReactElement,
  createContext,
  useContext,
  useState,
} from "react";

interface MyContextType {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const SingleViewContext = createContext<MyContextType | undefined>(undefined);

const SingleViewContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [description, setDescription] = useState("");

  return (
    <SingleViewContext.Provider value={{ description, setDescription }}>
      {children}
    </SingleViewContext.Provider>
  );
};

export default SingleViewContextProvider;

export const useSingleViewContext = (): MyContextType => {
  const context = useContext(SingleViewContext);

  if (!context) {
    throw new Error(
      "useSingleViewContext must be used within a SingleViewContextProvider"
    );
  }

  return context;
};
