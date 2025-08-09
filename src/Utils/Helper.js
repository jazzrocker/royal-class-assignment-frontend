import toast from "react-hot-toast";

export const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      if (item.startsWith("{") || item.startsWith("[")) {
        return JSON.parse(item);
      }
      return item;
    } catch (error) {
      return item;
    }
  }
  return null;
};

export const setLocalStorageItem = (key, value) => {
  try {
    const valueToStore =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, valueToStore);
  } catch (error) {
    console.log("error in setLocalStorageItem", error);
  }
};

export const removeLocalStorageItem = (key) => localStorage.removeItem(key);

export const notifySuccess = (message) => {
  toast.success(message, {
    duration: 2500,
    position: "top-center",
  });
};

export const notifyError = (message) => {
  toast.error(message, {
    duration: 2500,
    position: "top-center",
  });
};

export const notificationToast = (message) => {
  toast(message, {
    icon: "📣",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
    duration: 2500,
    position: "top-center",
  });
};

export const notifyPromise = (promise, message) => {
  return toast.promise(
    promise.then((res) => {
      console.log("res", res);
      if (res?.data?.meta?.code === 200) {
        return res;
      } else {
        throw { response: res };
      }
    }),
    {
      loading: message || "Loading...",
      success: (res) => `${res?.data?.meta?.message || "Success."}`,
      error: (err) => `${err?.response?.data?.meta?.message || "Failed"}`,
    }
  );
};

export const notifyErrorWithButton = (message, buttonText, passedFunction) => {
  const toastId = toast.error(
    <div className="notifyErrorWithButton">
      <span>{message}</span>
      <button
        onClick={() => {
          passedFunction();
          toast.dismiss(toastId);
        }}
        style={{
          marginLeft: "10px",
          padding: "0.5em 1em",
          background: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        {buttonText}
      </button>
    </div>,
    {
      duration: 2500,
      position: "top-center",
      closeOnClick: false,
    }
  );
};

export const getUserIP = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    console.log("User IP:", data.ip);
    return data.ip;
  } catch (error) {
    console.error("Failed to get IP:", error);
    return null;
  }
};

export const formatDateTime = (isoString) => {
  const date = new Date(isoString);

  const options = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    month: "long",
    day: "numeric",
  };

  return date.toLocaleString("en-US", options);
};
