import React from "react";
import { useContext } from "react";
import { UserContext } from "../../js/UserContext";

export default function MyForms() {
  const { userId } = useContext(UserContext);
  return (
    <div>
      MyForms: <br />
    </div>
  );
}
