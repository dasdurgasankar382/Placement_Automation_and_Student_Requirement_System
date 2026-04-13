// after forgot passowrd or reset password, show this success page
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Form } from "../../../components/ui/Form";
import { FormHeader } from "../../../components/ui/FormHeader";

export default function SuccessPage({ message, linkText, linkTo }) {
  const navigate = useNavigate();
  const redirectTo = linkTo || "/";
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft === 0) {
      navigate(redirectTo, { replace: true });
      return undefined;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, navigate, redirectTo]);

  const formattedTime = `00:${String(secondsLeft).padStart(2, "0")}`;

  return (
    // simple centered page with message and a button to go back to login or home
    // theme mode can implement dark mode styles as well

    <Form>
      <FormHeader
        title={message || "Success!"}
        headerText={"Success"}
        pText={message}
      />
      <div className="mt-6">
        <Button
          type="button"
          variant="primary"
          text={linkText || "Go Back"}
          className={"min-w-full"}
          onClick={() => navigate(redirectTo, { replace: true })}
        />
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          You will be redirected automatically in {formattedTime}.
        </p>
      </div>
    </Form>
  );
}
