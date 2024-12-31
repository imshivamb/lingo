type ToastProps = {
  message: string;
  type: "info" | "error";
};

export const Toast = ({ message, type = "info" }: ToastProps) => (
  <div
    className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
      type === "error" ? "bg-red-500" : "bg-green-500"
    } text-white`}
  >
    {message}
  </div>
);
